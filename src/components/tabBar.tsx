// components/TabBar.tsx
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { tabBarItems } from '../utils/tabBar';
import { theme } from '../theme';

import { Image } from 'expo-image';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const routesWithMeta = state.routes
    .map((route, index) => {
      const tab = tabBarItems.find(item => route.name.includes(item.route));
      return {
        ...route,
        index,
        label: tab?.label ?? route.name,
        icon: tab?.icon,
        order: tab?.order ?? 999,
      };
    })
    .sort((a, b) => a.order - b.order); 

  return (
    <View style={styles.container}>
      {routesWithMeta.map((route, idx) => {
        const isFocused = state.index === route.index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            {route.icon && (
              <Image source={route.icon} style={{ width: 26, height: 26, tintColor: isFocused ? theme.colors.primary : '#666' }} />
            )}
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {route.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderColor: '#D6D6D6',

    height: 80,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: theme.colors.textPrimary,
    marginTop: 4,
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default TabBar;
