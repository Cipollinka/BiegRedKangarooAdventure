import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import Button from 'app/components/button';
import {navigate} from 'app/navigationRef';
import SafeView from 'app/components/safe-view';
import {useAppDispatch} from 'app/store/hooks';
import {changeUserInfo} from 'app/store/coreReducer';

const InitialScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const redirectToHome = () => {
    dispatch(
      changeUserInfo({
        name: 'Redbieg',
      }),
    );
    navigate('Home');
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.flex}>
          <FastImage
            source={require('app/assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        <View>
          <Text color="#FA3E3E" fontSize={24} mt={10} mb={17} ta="center">
            ADVENTURE OF REDBIEG KANGAROO
          </Text>

          <Text fontSize={14} color="#636363" ta="center" mb={17}>
            Join our adventurous kangaroo as it hops through diverse
            environments, exploring deserts, tropical rainforests, temperate
            climates, and snowy landscapes. Get ready for an exciting learning
            experience!
          </Text>

          <Button
            small
            title="Get Started"
            bg="#FA3E3E"
            onPress={redirectToHome}
          />

          <Text fontSize={14} color="#636363" ta="center" mt={30}>
            *diamonds are an in-game currency, they are not related to real
            money and cannot be purchased
          </Text>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '95%',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
    flexGrow: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default InitialScreen;
