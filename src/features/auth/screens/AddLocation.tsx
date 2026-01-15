import { Href, useRouter } from 'expo-router';
import { Text, View, Image } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Container } from '../components/layout/Container';

export function AddLocationScreen() {
  const router = useRouter();

  const handlePress = () => router.replace('/(tabs)' as Href);

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

          <PrimaryButton title="Add Location" onPress={handlePress} />
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
    // width: 256,
    height: 256,
    // justifyContent: 'center',
    // alignItems: 'center',
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
