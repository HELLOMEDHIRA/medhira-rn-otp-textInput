# API Reference

## OTPTextView

The main component for creating OTP/PIN input fields.

```tsx
import {
  OTPTextView,
  type OTPTextViewProps,
  type OTPTextViewRef,
} from 'medhira-rn-otp-textinput';
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultValue` | `string` | No | `''` | Initial OTP value |
| `inputCount` | `number` | No | `4` | Number of OTP input cells |
| `inputCellLength` | `number` | No | `1` | Characters allowed per cell |
| `containerStyle` | `ViewStyle` | No | `{}` | Style for the container |
| `textInputStyle` | `ViewStyle` | No | `{}` | Style for each text input |
| `tintColor` | `string \| string[]` | No | `#3CB371` | Border color when focused |
| `offTintColor` | `string \| string[]` | No | `#DCDCDC` | Border color when unfocused |
| `handleTextChange` | `(text: string) => void` | No | — | Callback with the full OTP string |
| `handleCellTextChange` | `(text: string, index: number) => void` | No | — | Callback for individual cell change |
| `keyboardType` | `KeyboardType` | No | `numeric` | React Native keyboard type |
| `testIDPrefix` | `string` | No | `otp_input_` | Test ID prefix (`otp_input_0`, …) |
| `autoFocus` | `boolean` | No | `false` | Auto-focus the first input |
| `editable` | `boolean` | No | — | Forwarded to each `TextInput` |
| `secureTextEntry` | `boolean` | No | — | Mask cell values |
| `accessibilityLabel` | `string` | No | — | Base accessibility label |
| `accessibilityHint` | `string` | No | — | Accessibility hint |
| `autoComplete` | `TextInputProps['autoComplete']` | No | — | Autocomplete hint |
| `textContentType` | `TextInputProps['textContentType']` | No | — | iOS text content type |
| `placeholder` | `string` | No | — | Placeholder text |
| `placeholderTextColor` | `string` | No | — | Placeholder color |

!!! note "Keyboard validation"
    When `keyboardType` is `numeric`, `number-pad`, `phone-pad`, or `decimal-pad`, only digits are accepted. For other keyboard types, alphanumeric input is allowed.

!!! note "Tint color arrays"
    If `tintColor` or `offTintColor` is an array, its length must equal `inputCount`.

### Ref Methods

Attach a ref to access imperative methods:

| Method | Signature | Description |
|--------|-----------|-------------|
| `clear` | `() => void` | Clears all cells and focuses the first |
| `setValue` | `(value: string, isPaste?: boolean) => void` | Sets the OTP from a string |
| `focus` | `() => void` | Focuses the first cell |

```tsx
import React, { useRef } from 'react';
import { OTPTextView, type OTPTextViewRef } from 'medhira-rn-otp-textinput';

const ref = useRef<OTPTextViewRef>(null);

ref.current?.setValue('123456');
ref.current?.clear();
ref.current?.focus();
```

### TypeScript Types

```typescript
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
  editable?: boolean;
  secureTextEntry?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

interface OTPTextViewRef {
  clear: () => void;
  setValue: (value: string, isPaste?: boolean) => void;
  focus: () => void;
}
```

### Usage

```tsx
<OTPTextView
  defaultValue="1234"
  inputCount={6}
  tintColor="#3CB371"
  offTintColor="#DCDCDC"
  handleTextChange={(text) => console.log(text)}
  handleCellTextChange={(text, index) => console.log(text, index)}
  secureTextEntry
/>
```

## Exported Types

| Export | Description |
|--------|-------------|
| `OTPTextView` | Main component |
| `OTPTextViewProps` | Props interface |
| `OTPTextViewRef` | Ref handle interface |
| `OTPTextViewType` | **Deprecated** — use `OTPTextViewRef` instead |
