import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { styles } from './EditScreenInfo.style';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const { t } = useTranslation();
  const title = t('getStarted');
  const description = t('changeCode');

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>{title}</Text>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <Text style={styles.text}>{path}</Text>
        </View>
        <Text style={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};
