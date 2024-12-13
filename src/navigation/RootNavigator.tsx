import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Menu from 'app/components/menu';

import ShopScreen from 'app/screens/shop';
import InitialScreen from 'app/screens/initial';
import ProfileScreen from 'app/screens/profile';
import GameScreen from 'app/screens/game';
import HomeScreen from 'app/screens/home';

import {navigationRef} from 'app/navigationRef';
import {setCurrentRouteName} from 'app/store/coreReducer';
import {useAppSelector, useAppDispatch} from 'app/store/hooks';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.core);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={e => {
        const currentRouteName = e?.routes[e.index]?.name;
        dispatch(setCurrentRouteName(currentRouteName));
      }}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={userInfo?.name ? 'Home' : 'Initial'}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Initial" component={InitialScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
      <Menu />
    </NavigationContainer>
  );
}

export default RootNavigator;
