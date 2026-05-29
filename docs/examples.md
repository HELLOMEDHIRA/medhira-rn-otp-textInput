# Examples

## Basic OTP Input

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const BasicExample = () => {
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      <Text>Enter your OTP:</Text>
      <OTPTextView inputCount={6} handleTextChange={setOtp} />
      <Text>Entered: {otp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});
```

## Custom Styled OTP Input

```tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const StyledExample = () => {
  const [otp, setOtp] = useState('');

  return (
    <OTPTextView
      defaultValue=""
      inputCount={6}
      tintColor="#2563EB"
      offTintColor="#E5E7EB"
      containerStyle={styles.container}
      textInputStyle={styles.input}
      handleTextChange={setOtp}
      autoFocus
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    borderRadius: 12,
    borderWidth: 2,
    width: 48,
    height: 56,
    fontSize: 24,
  },
});
```

## With Alpha-Numeric Input

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const AlphaNumericExample = () => {
  const [code, setCode] = useState('');

  return (
    <View>
      <Text>Enter Code:</Text>
      <OTPTextView
        inputCount={8}
        inputCellLength={1}
        keyboardType="default"
        handleTextChange={setCode}
      />
    </View>
  );
};
```

## With Ref (Using Hooks)

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { OTPTextView, type OTPTextViewRef } from 'medhira-rn-otp-textinput';

const RefExample = () => {
  const inputRef = useRef<OTPTextViewRef>(null);

  return (
    <View>
      <OTPTextView ref={inputRef} inputCount={6} handleTextChange={() => {}} />
      <Button title="Clear" onPress={() => inputRef.current?.clear()} />
      <Button
        title="Set demo OTP"
        onPress={() => inputRef.current?.setValue('123456')}
      />
    </View>
  );
};
```

## With Auto-Focus

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const AutoFocusExample = () => {
  const [otp, setOtp] = useState('');

  return (
    <View>
      <Text>Auto-focus enabled:</Text>
      <OTPTextView
        inputCount={6}
        autoFocus
        handleTextChange={setOtp}
      />
    </View>
  );
};
```

## With Multiple Colors

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const MultiColorExample = () => {
  const [otp, setOtp] = useState('');

  const tintColors = ['#FF5722', '#4CAF50', '#2196F3', '#9C27B0'];
  const offTintColors = ['#FFCCBC', '#C8E6C9', '#BBDEFB', '#E1BEE7'];

  return (
    <View>
      <OTPTextView
        inputCount={4}
        tintColor={tintColors}
        offTintColor={offTintColors}
        handleTextChange={setOtp}
      />
    </View>
  );
};
```

## Secure PIN Entry

```tsx
import React, { useState } from 'react';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const PinExample = () => {
  const [pin, setPin] = useState('');

  return (
    <OTPTextView
      inputCount={4}
      keyboardType="number-pad"
      secureTextEntry
      handleTextChange={setPin}
      accessibilityLabel="PIN digit"
    />
  );
};
```
