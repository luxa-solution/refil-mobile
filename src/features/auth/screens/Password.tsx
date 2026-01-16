import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';

import { usePasswordScreenUI } from '../hooks/usePasswordScreenUI';
import { usePasswordSubmit } from '../hooks/usePasswordSubmit';

type Mode = 'signup' | 'reset';

type Props = { mode: Mode };

export function PasswordScreen({ mode }: Props) {
  const ui = usePasswordScreenUI(mode);
  const { submit, loading, error } = usePasswordSubmit(mode);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>{ui.title}</ContentTitle>

        <View style={styles.inputGroup}>
          <TextField
            label={ui.passwordLabel}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••"
            error={error}
          />
          <TextField
            label="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholder="••••••"
          />
        </View>

        <PrimaryButton
          title={ui.primaryCta}
          onPress={() => submit(password, confirm)}
          loading={loading}
        />

        {ui.dots.show && <StepDots activeIndex={ui.dots.activeIndex} count={ui.dots.count} />}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create(() => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 40,
  },
  inputGroup: {
    gap: 20,
  },
}));
