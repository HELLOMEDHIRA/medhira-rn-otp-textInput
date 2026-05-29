import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type KeyboardType,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
  type TextInputProps,
} from 'react-native';

const DEFAULT_TINT_COLOR = '#3CB371';
const DEFAULT_OFF_TINT_COLOR = '#DCDCDC';
const DEFAULT_TEST_ID_PREFIX = 'otp_input_';
const DEFAULT_KEYBOARD_TYPE: KeyboardType = 'numeric';

const NUMERIC_KEYBOARD_TYPES: KeyboardType[] = [
  'numeric',
  'number-pad',
  'phone-pad',
  'decimal-pad',
];

type OTPTextInputProps = Pick<
  TextInputProps,
  | 'editable'
  | 'accessibilityLabel'
  | 'accessibilityHint'
  | 'autoComplete'
  | 'importantForAutofill'
  | 'textContentType'
  | 'secureTextEntry'
  | 'placeholder'
  | 'placeholderTextColor'
>;

export interface OTPTextViewProps extends OTPTextInputProps {
  defaultValue?: string;
  inputCount?: number;
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  inputCellLength?: number;
  tintColor?: string | string[];
  offTintColor?: string | string[];
  handleTextChange?(text: string): void;
  handleCellTextChange?(text: string, cellIndex: number): void;
  keyboardType?: KeyboardType;
  testIDPrefix?: string;
  autoFocus?: boolean;
}

export interface OTPTextViewRef {
  clear: () => void;
  setValue: (value: string, isPaste?: boolean) => void;
  focus: () => void;
}

/** @deprecated Use {@link OTPTextViewRef} instead */
export type OTPTextViewType = OTPTextViewRef;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 50,
    width: 50,
    borderBottomWidth: 4,
    margin: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#000000',
  },
});

const getOTPTextChunks = (
  count: number,
  cellLength: number,
  text: string
): string[] => {
  const sanitized = sanitizeText(text, 'default');
  const matches = sanitized.match(new RegExp(`.{1,${cellLength}}`, 'g')) || [];
  const chunks = matches.slice(0, count);
  while (chunks.length < count) {
    chunks.push('');
  }
  return chunks;
};

const isNumericKeyboard = (keyboardType: KeyboardType): boolean =>
  NUMERIC_KEYBOARD_TYPES.includes(keyboardType);

const sanitizeText = (text: string, keyboardType: KeyboardType): string => {
  const pattern = isNumericKeyboard(keyboardType) ? /[^0-9]/g : /[^0-9a-zA-Z]/g;
  return text.replace(pattern, '');
};

const isValidText = (text: string, keyboardType: KeyboardType): boolean => {
  if (!text) {
    return true;
  }
  const pattern = isNumericKeyboard(keyboardType)
    ? /^[0-9]+$/
    : /^[0-9a-zA-Z]+$/;
  return pattern.test(text);
};

const validateTintColors = (
  tintColor: string | string[],
  offTintColor: string | string[],
  inputCount: number
): void => {
  if (Array.isArray(tintColor) && tintColor.length !== inputCount) {
    throw new Error(
      'If tint color is an array, its length should be equal to input count'
    );
  }

  if (Array.isArray(offTintColor) && offTintColor.length !== inputCount) {
    throw new Error(
      'If off tint color is an array, its length should be equal to input count'
    );
  }
};

const OTPTextView = forwardRef<OTPTextViewRef, OTPTextViewProps>(
  (
    {
      defaultValue = '',
      inputCount = 4,
      tintColor = DEFAULT_TINT_COLOR,
      offTintColor = DEFAULT_OFF_TINT_COLOR,
      inputCellLength = 1,
      containerStyle = {},
      textInputStyle = {},
      handleTextChange = () => {},
      handleCellTextChange,
      keyboardType = DEFAULT_KEYBOARD_TYPE,
      testIDPrefix = DEFAULT_TEST_ID_PREFIX,
      autoFocus = false,
      editable,
      accessibilityLabel,
      accessibilityHint,
      autoComplete,
      importantForAutofill,
      textContentType,
      secureTextEntry,
      placeholder,
      placeholderTextColor,
    },
    ref
  ) => {
    const [focusedInput, setFocusedInput] = useState(0);
    const [otpText, setOtpText] = useState<string[]>(() =>
      getOTPTextChunks(inputCount, inputCellLength, defaultValue)
    );
    const inputs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
      validateTintColors(tintColor, offTintColor, inputCount);
    }, [tintColor, offTintColor, inputCount]);

    useEffect(() => {
      setOtpText(getOTPTextChunks(inputCount, inputCellLength, defaultValue));
    }, [defaultValue, inputCount, inputCellLength]);

    const applyValue = useCallback(
      (value: string, isPaste = false) => {
        const sanitized = sanitizeText(value, keyboardType);
        const updatedOtpText = getOTPTextChunks(
          inputCount,
          inputCellLength,
          sanitized
        );
        setOtpText(updatedOtpText);
        handleTextChange(updatedOtpText.join(''));

        const filledCells = updatedOtpText.filter(Boolean).length;
        const focusIndex = isPaste
          ? Math.min(filledCells, inputCount) - 1
          : Math.min(sanitized.length, inputCount * inputCellLength) - 1;

        const targetIndex = Math.max(0, focusIndex);
        inputs.current[targetIndex]?.focus();
        setFocusedInput(targetIndex);
      },
      [handleTextChange, inputCellLength, inputCount, keyboardType]
    );

    const clear = useCallback(() => {
      setOtpText(Array(inputCount).fill(''));
      handleTextChange('');
      inputs.current[0]?.focus();
      setFocusedInput(0);
    }, [handleTextChange, inputCount]);

    const focusFirst = useCallback(() => {
      inputs.current[0]?.focus();
      setFocusedInput(0);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        clear,
        setValue: applyValue,
        focus: focusFirst,
      }),
      [applyValue, clear, focusFirst]
    );

    const onTextChange = (text: string, index: number) => {
      if (text.length > inputCellLength) {
        applyValue(text, true);
        return;
      }

      if (text && !isValidText(text, keyboardType)) {
        return;
      }

      const updatedOtpText = [...otpText];
      updatedOtpText[index] = text;
      setOtpText(updatedOtpText);
      handleTextChange(updatedOtpText.join(''));

      if (handleCellTextChange) {
        handleCellTextChange(text, index);
      }

      if (text.length === inputCellLength && index !== inputCount - 1) {
        inputs.current[index + 1]?.focus();
      }
    };

    const onInputFocus = (index: number) => {
      const prevIndex = index - 1;

      if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
        inputs.current[prevIndex]?.focus();
        return;
      }

      setFocusedInput(index);
    };

    const onKeyPress = (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number
    ) => {
      const value = otpText[index] || '';

      if (
        event.nativeEvent.key !== 'Backspace' &&
        value &&
        index !== inputCount - 1
      ) {
        inputs.current[index + 1]?.focus();
        return;
      }

      if (event.nativeEvent.key === 'Backspace' && index !== 0) {
        const prevOtpText = [...otpText];
        if (
          !value.length &&
          prevOtpText[index - 1]?.length === inputCellLength
        ) {
          prevOtpText[index - 1] = prevOtpText[index - 1]!.slice(0, -1);
          setOtpText(prevOtpText);
          handleTextChange(prevOtpText.join(''));
          inputs.current[index - 1]?.focus();
        }
      }
    };

    const textInputs = Array.from({ length: inputCount }, (_, index) => {
      const cellTintColor = Array.isArray(tintColor)
        ? tintColor[index]
        : tintColor;
      const cellOffTintColor = Array.isArray(offTintColor)
        ? offTintColor[index]
        : offTintColor;

      const inputStyle = [
        styles.textInput,
        textInputStyle,
        { borderColor: cellOffTintColor },
      ];

      if (focusedInput === index) {
        inputStyle.push({ borderColor: cellTintColor });
      }

      return (
        <TextInput
          ref={(inputRef) => {
            inputs.current[index] = inputRef;
          }}
          key={index}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={autoFocus && index === 0}
          value={otpText[index] || ''}
          style={inputStyle}
          maxLength={inputCellLength}
          onFocus={() => onInputFocus(index)}
          onChangeText={(text) => onTextChange(text, index)}
          multiline={false}
          onKeyPress={(event) => onKeyPress(event, index)}
          selectionColor={cellTintColor}
          testID={`${testIDPrefix}${index}`}
          editable={editable}
          accessibilityLabel={
            accessibilityLabel
              ? `${accessibilityLabel} ${index + 1}`
              : undefined
          }
          accessibilityHint={accessibilityHint}
          autoComplete={autoComplete}
          importantForAutofill={importantForAutofill}
          textContentType={textContentType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
      );
    });

    return <View style={[styles.container, containerStyle]}>{textInputs}</View>;
  }
);

OTPTextView.displayName = 'OTPTextView';

export { OTPTextView };
