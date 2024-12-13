import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from 'app/store/store';
import RootNavigator from 'app/navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const rootStyles = {flex:1};

export default function GameScreen() {
  return (
    <GestureHandlerRootView style={rootStyles}>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
