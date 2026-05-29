import { type ViewStyle, type KeyboardType, type TextInputProps } from 'react-native';
type OTPTextInputProps = Pick<TextInputProps, 'editable' | 'accessibilityLabel' | 'accessibilityHint' | 'autoComplete' | 'importantForAutofill' | 'textContentType' | 'secureTextEntry' | 'placeholder' | 'placeholderTextColor'>;
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
declare const OTPTextView: import("react").ForwardRefExoticComponent<OTPTextViewProps & import("react").RefAttributes<OTPTextViewRef>>;
export { OTPTextView };