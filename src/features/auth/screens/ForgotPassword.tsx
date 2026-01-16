import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { SignupText } from '../components/texts/signup';
import { useForgotPassword } from '../hooks/useForgotPassword';

export function ForgotPasswordScreen() {
  const { phone, setPhone, error, loading, submit } = useForgotPassword();
  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Enter Phone Number</ContentTitle>
        <PhoneField value={phone} onChange={setPhone} error={error} />
        <View style={styles.buttonGroup}>
          <PrimaryButton title="Get OTP" onPress={submit} loading={loading} />
          <SignupText />
        </View>
        <StepDots activeIndex={1} count={3} />
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
    gap: 10,
  },
}));
