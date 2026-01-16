import { Image, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Container } from '../components/layout/Container';
import { useAddLocation } from '../hooks/useAddLocation';

export function AddLocationScreen() {
  const { loading, ctaTitle, onPress } = useAddLocation();

  return (
    <Container>
      <View style={styles.wrap}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('@/assets/images/auth/location-icon.png')}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.sub}>Add your address to discover stations closeby</Text>

          <PrimaryButton title={ctaTitle} onPress={onPress} loading={loading} />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    gap: 60,
  },
  imageWrapper: {
    height: 256,
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  content: {
    gap: 24,
  },
  sub: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    fontSize: 24,
    fontWeight: '500',
  },
}));
