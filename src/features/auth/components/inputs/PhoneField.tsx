import React from 'react';
import { formatPhoneAsYouType } from '../../utils/phone';
import { TextField } from './TextField';

type Props = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
};

export function PhoneField({
  value,
  onChange,
  error,
  label = 'Phone No',
  placeholder = '+234 000 000 0000',
}: Props) {
  return (
    <TextField
      label={label}
      value={value}
      onChangeText={(t) => onChange(formatPhoneAsYouType(t))}
      keyboardType="phone-pad"
      placeholder={placeholder}
      error={error}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
