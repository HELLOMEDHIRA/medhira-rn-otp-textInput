import { createRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { OTPTextView, type OTPTextViewRef } from '../index';

describe('OTPTextView', () => {
  it('renders the configured number of input cells', () => {
    const { getByTestId } = render(
      <OTPTextView inputCount={6} handleTextChange={() => {}} />
    );

    for (let index = 0; index < 6; index += 1) {
      expect(getByTestId(`otp_input_${index}`)).toBeTruthy();
    }
  });

  it('calls handleTextChange with the joined OTP value', () => {
    const handleTextChange = jest.fn();
    const { getByTestId } = render(
      <OTPTextView inputCount={4} handleTextChange={handleTextChange} />
    );

    fireEvent.changeText(getByTestId('otp_input_0'), '1');
    fireEvent.changeText(getByTestId('otp_input_1'), '2');

    expect(handleTextChange).toHaveBeenLastCalledWith('12');
  });

  it('calls handleCellTextChange for individual cells', () => {
    const handleCellTextChange = jest.fn();
    const { getByTestId } = render(
      <OTPTextView
        inputCount={4}
        handleTextChange={() => {}}
        handleCellTextChange={handleCellTextChange}
      />
    );

    fireEvent.changeText(getByTestId('otp_input_0'), '7');

    expect(handleCellTextChange).toHaveBeenCalledWith('7', 0);
  });

  it('rejects non-numeric input when keyboardType is numeric', () => {
    const handleTextChange = jest.fn();
    const { getByTestId } = render(
      <OTPTextView
        inputCount={4}
        keyboardType="numeric"
        handleTextChange={handleTextChange}
      />
    );

    fireEvent.changeText(getByTestId('otp_input_0'), 'a');

    expect(handleTextChange).not.toHaveBeenCalled();
  });

  it('accepts alphanumeric input when keyboardType is default', () => {
    const handleTextChange = jest.fn();
    const { getByTestId } = render(
      <OTPTextView
        inputCount={4}
        keyboardType="default"
        handleTextChange={handleTextChange}
      />
    );

    fireEvent.changeText(getByTestId('otp_input_0'), 'A');

    expect(handleTextChange).toHaveBeenLastCalledWith('A');
  });

  it('distributes pasted values across cells', () => {
    const handleTextChange = jest.fn();
    const { getByTestId } = render(
      <OTPTextView inputCount={4} handleTextChange={handleTextChange} />
    );

    fireEvent.changeText(getByTestId('otp_input_0'), '1234');

    expect(handleTextChange).toHaveBeenLastCalledWith('1234');
    expect(getByTestId('otp_input_0').props.value).toBe('1');
    expect(getByTestId('otp_input_3').props.value).toBe('4');
  });

  it('clears all cells through the ref API', () => {
    const handleTextChange = jest.fn();
    const ref = createRef<OTPTextViewRef>();
    const { getByTestId } = render(
      <OTPTextView
        ref={ref}
        inputCount={4}
        handleTextChange={handleTextChange}
      />
    );

    fireEvent.changeText(getByTestId('otp_input_0'), '1');
    fireEvent.changeText(getByTestId('otp_input_1'), '2');
    act(() => {
      ref.current?.clear();
    });

    expect(handleTextChange).toHaveBeenLastCalledWith('');
    expect(getByTestId('otp_input_0').props.value).toBe('');
    expect(getByTestId('otp_input_1').props.value).toBe('');
  });

  it('sets values through the ref API', () => {
    const handleTextChange = jest.fn();
    const ref = createRef<OTPTextViewRef>();
    const { getByTestId } = render(
      <OTPTextView
        ref={ref}
        inputCount={4}
        handleTextChange={handleTextChange}
      />
    );

    act(() => {
      ref.current?.setValue('9876');
    });

    expect(handleTextChange).toHaveBeenLastCalledWith('9876');
    expect(getByTestId('otp_input_0').props.value).toBe('9');
    expect(getByTestId('otp_input_3').props.value).toBe('6');
  });

  it('initializes with defaultValue', () => {
    const { getByTestId } = render(
      <OTPTextView
        defaultValue="1234"
        inputCount={4}
        handleTextChange={() => {}}
      />
    );

    expect(getByTestId('otp_input_0').props.value).toBe('1');
    expect(getByTestId('otp_input_3').props.value).toBe('4');
  });

  it('throws when tint color array length does not match inputCount', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      render(
        <OTPTextView
          inputCount={4}
          tintColor={['#111111', '#222222']}
          handleTextChange={() => {}}
        />
      )
    ).toThrow(
      'If tint color is an array, its length should be equal to input count'
    );

    consoleError.mockRestore();
  });
});
