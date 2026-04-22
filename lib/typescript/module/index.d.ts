import React from 'react';
import { type ViewStyle, type KeyboardType } from 'react-native';
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
declare const OTPTextView: React.FC<OTPTextViewProps>;
declare const OTPTextViewType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export { OTPTextView, OTPTextViewType };
//# sourceMappingURL=index.d.ts.map