import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import Button from 'app/components/button';
import {avatars} from 'app/assets/avatars';
import SafeView from 'app/components/safe-view';
import {changeUserInfo, reset} from 'app/store/coreReducer';
import {useAppDispatch, useAppSelector} from 'app/store/hooks';
import {reset as resetNavigation} from 'app/navigationRef';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const {availableAvatars = [0], userInfo} = useAppSelector(
    state => state.core,
  );
  const [activeIndex, setActiveIndex] = useState<number>(NaN);

  const list = avatars.filter((_, index) => availableAvatars.includes(index));

  const showConfirmationAlert = () => {
    Alert.alert(
      'Remove account?',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(reset());
            setTimeout(() => {
              resetNavigation([{name: 'Initial'}]);
            }, 700);
          },
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const avatarIndex =
    userInfo?.avatarIndex === undefined ? 0 : userInfo?.avatarIndex;

  return (
    <SafeView>
      <FastImage source={avatars[avatarIndex]} style={styles.mainAvatar} />

      <View style={styles.root}>
        <Text fontSize={20} ta="center">
          My avatars:
        </Text>
        <View style={styles.list}>
          {list.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveIndex(index);
              }}
              style={[
                styles.item,
                {
                  borderColor: activeIndex === index ? '#0C9000' : '#fff',
                },
              ]}>
              <FastImage source={avatar} style={styles.avatar} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {!isNaN(activeIndex) && activeIndex !== userInfo?.avatarIndex && (
        <Button
          small
          title="Set avatar"
          onPress={() => {
            dispatch(changeUserInfo({avatarIndex: activeIndex}));
            setActiveIndex(NaN);
          }}
        />
      )}

      <View style={styles.gap} />

      <Button
        small
        bg="#FA3E3E"
        style={styles.danger}
        title="Delete account"
        onPress={showConfirmationAlert}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 14,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 20,
  },
  danger: {
    opacity: 0.5,
  },
  gap: {
    height: 30,
  },
  list: {
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  item: {
    overflow: 'hidden',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  avatar: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 14,
  },
  mainAvatar: {
    width: 130,
    height: 130,
    overflow: 'hidden',
    borderRadius: 65,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginBottom: 31,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Profile;
