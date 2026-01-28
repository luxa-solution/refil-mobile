import { Tabs } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { TabBarIcon } from '@/shared/components';

export default function TabLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.typography,
        },
        tabBarActiveTintColor: theme.colors.primaryDefault,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}
