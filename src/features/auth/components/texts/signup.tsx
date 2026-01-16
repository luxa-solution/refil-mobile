import { Href, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function SignupText() {
  const router = useRouter();
  return (
    <Text style={styles.footer}>
      New User?{' '}
      <Text style={styles.footerLink} onPress={() => router.push('/auth/create-account' as Href)}>
        Sign Up
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  footer: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
  },
  footerLink: {
    color: theme.colors.primaryDefault,
    fontWeight: '900',
  },
}));
