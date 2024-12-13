import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  DimensionValue,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Play, Check} from 'lucide-react-native';

import Text from 'app/components/text';
import SafeView from 'app/components/safe-view';
import {
  saveGlobalScore,
  incrementActiveTooltipIndex,
  setShowOnboardingScreen,
} from 'app/store/coreReducer';
import {navigate} from 'app/navigationRef';
import Button from 'app/components/button';
import {useAppDispatch, useAppSelector} from 'app/store/hooks';

const {width, height} = Dimensions.get('window');
const texts = [
  'Hi! My name is “Redbieg”!',
  "I'm traveling the world, but I need your help, I can't do it myself, as a reward I'll give you my diamonds",
  'With the help of these diamonds, you will be able to buy yourself new avatars!',
  'I visited all the places I wanted to, thank you for your help!',
  "I'm giving you all my diamonds as a gift, we'll meet again!",
];

const levels: {
  left: DimensionValue;
  bottom: DimensionValue;
}[] = [
  {
    left: '33.5%',
    bottom: 50,
  },
  {
    left: '60.8%',
    bottom: 236,
  },
  {
    left: '14.8%',
    bottom: 405,
  },
  {
    left: '33%',
    bottom: 540,
  },
  {
    left: '50%',
    bottom: 640,
  },
];

const mapHeight = 1400;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {
    globalScore = 0,
    activeTooltipIndex = 0,
    showOnboardingScreen = false,
    activeLevel = 1,
  } = useAppSelector(state => state.core);

  if (showOnboardingScreen) {
    return (
      <SafeView>
        <View style={styles.root}>
          <FastImage
            source={require('app/assets/images/logo.png')}
            style={styles.logo2}
            resizeMode="contain"
          />
          <View style={styles.header}>
            <Text>Redbieg gave you - 320 diamonds</Text>
            <FastImage
              source={require('app/assets/images/dimond.png')}
              style={styles.top}
            />
          </View>
          <Button
            title="Open shop"
            onPress={() => {
              dispatch(setShowOnboardingScreen(false));
              navigate('Shop');
              dispatch(saveGlobalScore(320));
            }}
          />
        </View>
      </SafeView>
    );
  }

  const buttons = levels.slice(0, activeLevel);

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require('app/assets/images/bg.png')}
      style={[styles.content, {height: mapHeight}]}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          disabled={index + 1 !== activeLevel}
          style={[
            styles.action,
            {
              left: button.left,
              bottom: button.bottom,
            },
          ]}
          onPress={() => navigate('Game')}>
          {index + 1 === activeLevel ? (
            <Play size={40} fill="#3A3A3A" color="#3A3A3A" />
          ) : (
            <Check size={40} color="#3A3A3A" />
          )}
        </TouchableOpacity>
      ))}
      <View
        style={[
          styles.countBox,
          {
            bottom: height - insets.bottom - insets.top - 100,
          },
        ]}>
        <FastImage
          resizeMode="contain"
          source={require('app/assets/images/dimond.png')}
          style={styles.top}
        />
        <Text fontSize={20}>{globalScore}</Text>
      </View>
      {texts[activeTooltipIndex] && (
        <View style={styles.tooltip}>
          <FastImage
            source={require('app/assets/images/logo.png')}
            style={styles.logo}>
            <TouchableOpacity
              onPress={() => {
                const nextIndex = activeTooltipIndex + 1;
                dispatch(incrementActiveTooltipIndex());

                if (nextIndex === texts.length) {
                  dispatch(setShowOnboardingScreen(true));
                }
              }}
              style={[styles.text, {marginBottom: insets.bottom + 10}]}>
              <Text ta="center">{texts[activeTooltipIndex]}</Text>
            </TouchableOpacity>
          </FastImage>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  action: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 40,
    borderColor: '#5D5D5D',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo2: {
    width: '100%',
    height: '50%',
    marginBottom: 20,
  },
  header: {
    gap: 6,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  root: {
    justifyContent: 'center',
    flex: 1,
    height: height - 100,
  },
  countBox: {
    position: 'absolute',
    right: 16,
    gap: 7,
    height: 42,
    zIndex: 10,
    width: 80,
    borderRadius: 42,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  top: {width: 23, height: 23},
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000',
    paddingHorizontal: 50,
    paddingVertical: 30,
    backgroundColor: '#fff',
    maxWidth: '80%',
  },
  logo: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default HomeScreen;
