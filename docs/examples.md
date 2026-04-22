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
      <OTPTextView
        inputCount={4}
        handleTextChange={setOtp}
      />
      <Text>Entered: {otp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
```

## Custom Styled OTP Input

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { OTPTextView } from 'medhira-rn-otp-textinput';

const StyledExample = () => {
  const [otp, setOtp] = useState('');

  return (
    <OTPTextView
      defaultValue="1234"
      inputCount={6}
      tintColor="#3CB371"
      offTintColor="#DCDCDC"
      containerStyle={styles.container}
      textInputStyle={styles.input}
      handleTextChange={setOtp}
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
    borderRadius: 10,
    borderWidth: 1,
    width: 45,
    height: 45,
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
        inputCellLength={2}
        keyboardType="default"
        handleTextChange={setCode}
      />
    </View>
  );
};
```

## With Ref (Using Hooks)

```tsx
import React, { useRef, useState } from 'react';
import { View, Button } from 'react-native';
import { OTPTextView, OTPTextViewType } from 'medhira-rn-otp-textinput';

const RefExample = () => {
  const inputRef = useRef<OTPTextViewType>(null);

  const clearText = () => {
    inputRef.current?.clear();
  };

  return (
    <View>
      <OTPTextView ref={inputRef} inputCount={4} />
      <Button title="Clear" onPress={clearText} />
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
        inputCount={4}
        autoFocus={true}
        handleTextChange={setOtp}
      />
    </View>
  );
};
```

## With Multiple Colors

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
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