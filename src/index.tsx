import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type KeyboardType,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';

const DEFAULT_TINT_COLOR: string = '#3CB371';
const DEFAULT_OFF_TINT_COLOR: string = '#DCDCDC';
const DEFAULT_TEST_ID_PREFIX: string = 'otp_input_';
const DEFAULT_KEYBOARD_TYPE: KeyboardType = 'numeric';

interface OTPTextViewProps {
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

const OTPTextView: React.FC<OTPTextViewProps> = ({
  defaultValue = '',
  inputCount = 4,
  tintColor = DEFAULT_TINT_COLOR,
  offTintColor = DEFAULT_OFF_TINT_COLOR,
  inputCellLength = 1,
  containerStyle = {},
  textInputStyle = {},
  handleTextChange = () => {},
  handleCellTextChange = undefined,
  keyboardType = DEFAULT_KEYBOARD_TYPE,
  testIDPrefix = DEFAULT_TEST_ID_PREFIX,
  autoFocus = false,
}) => {
  const getOTPTextChunks = (
    inputCount: number,
    inputCellLength: number,
    text: string
  ): string[] => {
    const matches =
      text.match(new RegExp(`.{1,${inputCellLength}}`, 'g')) || [];
    return matches.slice(0, inputCount);
  };
  const [focusedInput, setFocusedInput] = useState<number>(0);
  const [otpText, setOtpText] = useState<string[]>(
    getOTPTextChunks(inputCount, inputCellLength, defaultValue)
  );
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    checkTintColorCount();
  }, []);

  const checkTintColorCount = () => {
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

  const basicValidation = (text: string) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  const onTextChange = (text: string, i: number) => {
    if (text && !basicValidation(text)) {
      return;
    }

    const updatedOtpText = [...otpText];
    updatedOtpText[i] = text;
    setOtpText(updatedOtpText);

    handleTextChange(updatedOtpText.join(''));

    if (handleCellTextChange) {
      handleCellTextChange(text, i);
    }

    if (text.length === inputCellLength && i !== inputCount - 1) {
      inputs.current[i + 1]?.focus();
    }
  };

  const onInputFocus = (i: number) => {
    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      inputs.current[prevIndex]?.focus();
      return;
    }

    setFocusedInput(i);
  };

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    i: number
  ) => {
    const val = otpText[i] || '';

    if (e.nativeEvent.key !== 'Backspace' && val && i !== inputCount - 1) {
      inputs.current[i + 1]?.focus();
      return;
    }

    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      const prevOtpText = [...otpText];
      if (!val.length && prevOtpText[i - 1]?.length === inputCellLength) {
        prevOtpText[i - 1] = prevOtpText[i - 1]!.slice(0, -1);
        setOtpText(prevOtpText);
        handleTextChange(prevOtpText.join(''));
        inputs.current[i - 1]?.focus();
      }
    }
  };

  // const clear = () => {
  //   setOtpText(Array(inputCount).fill(''));
  //   handleTextChange('');
  //   inputs.current[0]?.focus();
  // };
  
  // const setValue = (value: string, isPaste = false) => {
  //   const updatedOtpText = getOTPTextChunks(inputCount, inputCellLength, value);
  //   setOtpText(updatedOtpText);

  //   const updatedFocusInput = isPaste ? inputCount - 1 : value.length - 1;
  //   if (inputs.current[updatedFocusInput]) {
  //     inputs.current[updatedFocusInput]?.focus();
  //   }

  //   handleTextChange(value);
  // };

  const TextInputs = [];

  for (let i = 0; i < inputCount; i += 1) {
    const _tintColor = Array.isArray(tintColor) ? tintColor[i] : tintColor;
    const _offTintColor = Array.isArray(offTintColor)
      ? offTintColor[i]
      : offTintColor;

    const inputStyle = [
      styles.textInput,
      textInputStyle,
      {
        borderColor: _offTintColor,
      },
    ];

    if (focusedInput === i) {
      inputStyle.push({
        borderColor: _tintColor,
      });
    }

    TextInputs.push(
      <TextInput
        ref={(inputRef) => {
          if (inputRef) {
            inputs.current[i] = inputRef;
          }
        }}
        key={i}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoFocus={autoFocus && i === 0}
        value={otpText[i] || ''}
        style={inputStyle}
        maxLength={inputCellLength}
        onFocus={() => onInputFocus(i)}
        onChangeText={(text) => onTextChange(text, i)}
        multiline={false}
        onKeyPress={(e) => onKeyPress(e, i)}
        selectionColor={_tintColor}
        testID={`${testIDPrefix}${i}`}
      />
    );
  }

  return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
};
const OTPTextViewType = typeof OTPTextView;
export { OTPTextView, OTPTextViewType };
