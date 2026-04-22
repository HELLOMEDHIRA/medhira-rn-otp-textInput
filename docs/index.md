# Getting Started

Welcome to **medhira-rn-otp-textInput** - OTP/PIN text input component for React Native.

## Installation

### Expo

```sh
npx expo install medhira-rn-otp-textinput
```

### React Native

```sh
npm install --save medhira-rn-otp-textinput
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const App = () => {
  const [otp, setOtp] = useState('');

  return (
    <View>
      <OTPTextView
        inputCount={4}
        handleTextChange={setOtp}
      />
      <Text>Entered OTP: {otp}</Text>
    </View>
  );
};

export default App;
```

## Features

- Customizable OTP input count
- Individual cell focus handling
- Custom tint colors for focused/unfocused states
- Keyboard type configuration
- Test ID prefix support
- Auto-focus option

## Requirements

- React Native 0.60+
- React 16+
- TypeScript (optional, but recommended)

## License

[MIT](./LICENSE)