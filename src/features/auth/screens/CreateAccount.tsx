import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { useAuthFlowStore } from '../store/authFlowStore';
import { isValidPhone } from '../utils/phone';

export function CreateAccountScreen() {
  const router = useRouter();
  const setSignupDetails = useAuthFlowStore((s) => s.setSignupDetails);

  const [phone, setPhone] = useState('');
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [err, setErr] = useState<{ phone?: string; first?: string; last?: string }>({});

  const submit = () => {
    const nextErr: typeof err = {};
    if (!isValidPhone(phone)) nextErr.phone = 'Enter a valid phone number';
    if (!firstName.trim()) nextErr.first = 'First name required';
    if (!lastName.trim()) nextErr.last = 'Last name required';
    setErr(nextErr);
    if (Object.keys(nextErr).length) return;

    setSignupDetails({
      phoneNumber: phone,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    router.push('/auth/add-password' as Href);
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Create Account</ContentTitle>

        <View style={styles.buttonGroup}>
          <PhoneField value={phone} onChange={setPhone} error={err.phone} />
          <TextField
            label="First Name"
            value={firstName}
            onChangeText={setFirst}
            error={err.first}
            placeholder="Ahmad"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChangeText={setLast}
            error={err.last}
            placeholder="Abubakr"
          />
        </View>

        <PrimaryButton title="Next" onPress={submit} />

        <StepDots activeIndex={1} count={4} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 40,
  },
  buttonGroup: {
    gap: 20,
  },
}));
