import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from './TabBarIcon.style';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
};
