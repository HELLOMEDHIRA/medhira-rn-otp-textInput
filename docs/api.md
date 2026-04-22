# API Reference

## OTPTextView Component

OTPTextView is the main component for creating OTP/PIN input fields.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| defaultValue | string | No | '' | Default value for the OTP input |
| inputCount | number | No | 4 | Number of OTP input cells |
| containerStyle | ViewStyle | No | {} | Style for the container |
| textInputStyle | ViewStyle | No | {} | Style for each text input |
| inputCellLength | number | No | 1 | Number of characters per cell |
| tintColor | string \| string[] | No | #3CB371 | Border color when focused |
| offTintColor | string \| string[] | No | #DCDCDC | Border color when not focused |
| handleTextChange | (text: string) => void | No | - | Callback for text change |
| handleCellTextChange | (text: string, index: number) => void | No | - | Callback for individual cell change |
| keyboardType | KeyboardType | No | numeric | Keyboard type |
| testIDPrefix | string | No | 'otp_input_' | Test ID prefix |
| autoFocus | boolean | No | false | Auto-focus first input |

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
  handleTextChange?: (text: string) => void;
  handleCellTextChange?: (text: string, cellIndex: number) => void;
  keyboardType?: KeyboardType;
  testIDPrefix?: string;
  autoFocus?: boolean;
}
```

### Usage

```tsx
import { OTPTextView } from 'medhira-rn-otp-textinput';

<OTPTextView
  defaultValue="1234"
  inputCount={6}
  tintColor="#3CB371"
  offTintColor="#DCDCDC"
  handleTextChange={(text) => console.log(text)}
  handleCellTextChange={(text, index) => console.log(text, index)}
/>
```

## Exported Types

### OTPTextViewType

Type for referencing the OTPTextView component with refs.

```typescript
import { OTPTextViewType } from 'medhira-rn-otp-textinput';
```