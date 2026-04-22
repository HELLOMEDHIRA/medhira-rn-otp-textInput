# medhira-rn-otp-textInput

MEDHIRA - OTP/PIN text input component for React Native

![medhira](https://raw.githubusercontent.com/HELLOMEDHIRA/medhira/main/assets/medhira-logo.png)

**Engineering Intelligence Across Everything**

[![npm package](https://img.shields.io/npm/v/medhira-rn-otp-textinput.svg)](https://www.npmjs.com/package/medhira-rn-otp-textinput)
[![npm downloads](https://img.shields.io/npm/dm/medhira-rn-otp-textinput.svg)](https://www.npmjs.com/package/medhira-rn-otp-textinput)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```sh
# Expo
npx expo install medhira-rn-otp-textinput

# React Native
npm install --save medhira-rn-otp-textinput
```

## Props

The Following Props are applicable for the component along with **props supported by react native `TextInput` component**

| Prop                 | Type   | Optional | Default      | Description                                                                            |
| -------------------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------- |
| defaultValue         | string | Yes      | ''           | Default Value that can be set based on OTP / Pin received from parent container.       |
| handleTextChange     | func   | No       | n/a          | callback with concated string of all cells as argument.                                |
| handleCellTextChange | func   | Yes      | n/a          | callback for text change in individual cell with cell text and cell index as arguments |
| inputCount           | number | Yes      | 4            | Number of Text Input Cells to be present.                                              |
| tintColor            | string | Yes      | #3CB371      | Color for Cell Border on being focused.                                                |
| offTintColor         | string | Yes      | #DCDCDC      | Color for Cell Border Border not focused.                                              |
| inputCellLength      | number | Yes      | 1            | Number of character that can be entered inside a single cell.                          |
| containerStyle       | object | Yes      | {}           | style for overall container.                                                           |
| textInputStyle       | object | Yes      | {}           | style for text input.                                                                  |
| testIDPrefix         | string | Yes      | 'otp_input_' | testID prefix, the result will be `otp_input_0` until inputCount                       |
| autoFocus            | bool   | Yes      | false        | Input should automatically get focus when the components loads                         |

## Helper Functions

Clearing and Setting values to component

```js
// using traditional ref
clearText = () => {
    this.otpInput.clear();
}

setText = () => {
    this.otpInput.setValue("1234");
}

render() {
    return (
        <View>
            <OTPTextInput ref={e => (this.otpInput = e)} >
            <Button title="clear" onClick={this.clearText}>
        </View>
    );
}


```

```js
// hooks
import React, { useRef } from 'react';

const ParentComponent = () => {
    let otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }

    return (
        <View>
            <OTPTextView ref={e => (otpInput = e)} >
            <Button title="clear" onClick={clearText}>
        </View>
    );
}

```

## Example

```js

import React, { useRef, useState } from 'react'
import { OtpTextInput, StyleSheet } from '@/imports';
import { useTheme } from '@/hooks';
import { heightPercent, widthPercent } from '@/helpers/functions/responsive';
import { debugLog } from '@/config/logsConfig';
import {OTPTextView, OTPTextViewType} from 'medhira-rn-otp-textinput';

const OtpInput = () => {

  const theme = useTheme();
  const { colors, fontSizes, iconSizes } = theme

  const styles = StyleSheet.create({
    textInputContainer: {
      marginVertical: 15,
      justifyContent:'center',
      padding:widthPercent(0.3)
    },
    roundedTextInput: {
      borderRadius: 10,
      borderWidth: 1,
      width:widthPercent(6),
      height:heightPercent(6),
      margin:widthPercent(0.2)
    },
  })

  const [otpInput, setOtpInput] = useState<string>("");
  const input = useRef<OTPTextViewType>(null);
  const handleCellTextChange = async (text: string, i: number) => {
    debugLog('handleCellTextChange')
  };
  return (
    <OTPTextView
      handleCellTextChange={handleCellTextChange}
      handleTextChange={setOtpInput}
      inputCount={6}
      keyboardType="numeric"
      containerStyle={styles.textInputContainer}
      textInputStyle={styles.roundedTextInput}
      tintColor={colors.text}
    />
  );

}

export default OtpInput

```

And we're done

## Contributing

Contribution are always welcome, no matter how large or small !

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

Please feel free to drop us an email at [MEDHIRA](mailto:hello.medhira@gmail.com?subject=[GitHub])

## Acknowledgements

Thanks to the authors of these libraries for inspiration

## Note

Inspired by [react-native-otp-textinput](https://github.com/naveenvignesh5/react-native-otp-textinput#readme)

## Sponsor & Support

To keep this library maintained and up-to-date please consider [sponsoring it on GitHub](https://github.com/sponsors/medhira). Or if you are looking for a private support or help in customizing the experience, then reach out to us on LinkedIn [https://www.linkedin.com/in/smuniharish](https://www.linkedin.com/company/medhira).

## License

[MIT](./LICENSE)

---

Made with love by [MEDHIRA](https://medhira.readthedocs.io/en/latest/)