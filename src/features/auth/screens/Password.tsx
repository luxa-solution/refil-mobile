import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';

import { usePasswordScreenUI } from '../hooks/usePasswordScreenUI';
import { usePasswordSubmit } from '../hooks/usePasswordSubmit';
import { PasswordForm, passwordSchema } from '../schema/password.schema';
import { AuthFlowMode } from '../types/flow';

type Props = {
  mode: AuthFlowMode;
};

export function PasswordScreen({ mode }: Props) {
  const ui = usePasswordScreenUI(mode);
  const { submit, loading, error } = usePasswordSubmit(mode);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirm: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submit(values.password);
  });

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>{ui.title}</ContentTitle>

        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <TextField
                label={ui.passwordLabel}
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="••••••"
                error={errors.password?.message ?? error}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm"
            render={({ field: { value, onChange } }) => (
              <TextField
                label="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="••••••"
                error={errors.confirm?.message}
              />
            )}
          />
        </View>

        <PrimaryButton title={ui.primaryCta} onPress={onSubmit} loading={loading || isSubmitting} />

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
