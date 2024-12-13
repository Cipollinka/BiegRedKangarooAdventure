import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Store, Map, CircleUser} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {navigate} from 'app/navigationRef';
import {useAppSelector} from 'app/store/hooks';

const menuItems = ['Home', 'Profile', 'Shop'];
const icons = [Map, CircleUser, Store];

const Menu = () => {
  const insets = useSafeAreaInsets();
  const {activeTooltipIndex, showOnboardingScreen, currentRouteName} =
    useAppSelector(state => state.core);

  if (activeTooltipIndex <= 4 || showOnboardingScreen) {
    return null;
  }

  return (
    <View style={[styles.container, {marginBottom: insets.bottom + 5}]}>
      {menuItems.map((item, index) => {
        const Icon = icons[index];
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigate(item)}
            style={[
              styles.item,
              currentRouteName === item ? styles.active : null,
            ]}>
            {Icon && (
              <Icon
                size={30}
                color={currentRouteName === item ? '#42CE00' : '#000'}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 40,
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {},
});

export default Menu;
