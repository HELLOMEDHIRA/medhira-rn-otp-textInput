"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPTextViewType = exports.OTPTextView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DEFAULT_TINT_COLOR = '#3CB371';
const DEFAULT_OFF_TINT_COLOR = '#DCDCDC';
const DEFAULT_TEST_ID_PREFIX = 'otp_input_';
const DEFAULT_KEYBOARD_TYPE = 'numeric';
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    height: 50,
    width: 50,
    borderBottomWidth: 4,
    margin: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#000000'
  }
});
const OTPTextView = ({
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
  autoFocus = false
}) => {
  const getOTPTextChunks = (inputCount, inputCellLength, text) => {
    const matches = text.match(new RegExp(`.{1,${inputCellLength}}`, 'g')) || [];
    return matches.slice(0, inputCount);
  };
  const [focusedInput, setFocusedInput] = (0, _react.useState)(0);
  const [otpText, setOtpText] = (0, _react.useState)(getOTPTextChunks(inputCount, inputCellLength, defaultValue));
  const inputs = (0, _react.useRef)([]);
  (0, _react.useEffect)(() => {
    checkTintColorCount();
  }, []);
  const checkTintColorCount = () => {
    if (Array.isArray(tintColor) && tintColor.length !== inputCount) {
      throw new Error('If tint color is an array, its length should be equal to input count');
    }
    if (Array.isArray(offTintColor) && offTintColor.length !== inputCount) {
      throw new Error('If off tint color is an array, its length should be equal to input count');
    }
  };
  const basicValidation = text => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };
  const onTextChange = (text, i) => {
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
  const onInputFocus = i => {
    const prevIndex = i - 1;
    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      inputs.current[prevIndex]?.focus();
      return;
    }
    setFocusedInput(i);
  };
  const onKeyPress = (e, i) => {
    const val = otpText[i] || '';
    if (e.nativeEvent.key !== 'Backspace' && val && i !== inputCount - 1) {
      inputs.current[i + 1]?.focus();
      return;
    }
    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      const prevOtpText = [...otpText];
      if (!val.length && prevOtpText[i - 1]?.length === inputCellLength) {
        prevOtpText[i - 1] = prevOtpText[i - 1].slice(0, -1);
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
    const _offTintColor = Array.isArray(offTintColor) ? offTintColor[i] : offTintColor;
    const inputStyle = [styles.textInput, textInputStyle, {
      borderColor: _offTintColor
    }];
    if (focusedInput === i) {
      inputStyle.push({
        borderColor: _tintColor
      });
    }
    TextInputs.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      ref: inputRef => {
        if (inputRef) {
          inputs.current[i] = inputRef;
        }
      },
      autoCorrect: false,
      keyboardType: keyboardType,
      autoFocus: autoFocus && i === 0,
      value: otpText[i] || '',
      style: inputStyle,
      maxLength: inputCellLength,
      onFocus: () => onInputFocus(i),
      onChangeText: text => onTextChange(text, i),
      multiline: false,
      onKeyPress: e => onKeyPress(e, i),
      selectionColor: _tintColor,
      testID: `${testIDPrefix}${i}`
    }, i));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.container, containerStyle],
    children: TextInputs
  });
};
exports.OTPTextView = OTPTextView;
const OTPTextViewType = exports.OTPTextViewType = typeof OTPTextView;
//# sourceMappingURL=index.js.map