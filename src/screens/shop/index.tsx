import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import Button from 'app/components/button';
import SafeView from 'app/components/safe-view';
import {avatars} from 'app/assets/avatars';
import {
  setAvailableAvatars,
  saveGlobalScore,
  changeUserInfo,
} from 'app/store/coreReducer';
import {navigate} from 'app/navigationRef';
import {useAppSelector, useAppDispatch} from 'app/store/hooks';

const {width} = Dimensions.get('window');

const Shop: React.FC = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(NaN);

  const {availableAvatars = [0], globalScore} = useAppSelector(
    state => state.core,
  );

  return (
    <SafeView>
      <View style={styles.root}>
        <Text fontSize={20} ta="center">
          Avatars shop
        </Text>
        <View style={styles.list}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveIndex(index);
              }}
              style={[
                styles.item,
                {
                  borderColor: availableAvatars.includes(index)
                    ? 'orange'
                    : activeIndex === index
                    ? '#0C9000'
                    : '#fff',
                },
              ]}>
              <FastImage source={avatar} style={styles.avatar} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {!isNaN(activeIndex) && !availableAvatars.includes(activeIndex) && (
        <Button
          title="Buy"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FastImage
              source={avatars[activeIndex]}
              style={styles.avatarPreview}
            />
            {!status && (
              <>
                <Text fontSize={18} ta="center">
                  Are u sure want to buy this avatar?
                </Text>

                <View style={styles.info}>
                  <Text fontSize={24} fontWeight="600">
                    50
                  </Text>
                  <FastImage
                    source={require('app/assets/images/dimond.png')}
                    style={styles.diamond}
                  />
                </View>
              </>
            )}

            {status === 'success' && (
              <Text fontSize={18} ta="center">
                Youre bought new avatar for your profile!
              </Text>
            )}

            {status === 'error' && (
              <>
                <Text fontSize={18} ta="center">
                  You have not enough coins to buy this item, your current
                  balance:
                </Text>
                <View style={styles.info}>
                  <Text fontSize={24} fontWeight="600">
                    {globalScore}
                  </Text>
                  <FastImage
                    source={require('app/assets/images/dimond.png')}
                    style={styles.diamond}
                  />
                </View>
              </>
            )}
            {!status && (
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    if (globalScore - 50 > 0) {
                      dispatch(
                        setAvailableAvatars([...availableAvatars, activeIndex]),
                      );
                      dispatch(saveGlobalScore(globalScore - 50));
                      setStatus('success');
                    } else {
                      setStatus('error');
                    }
                  }}>
                  <Text fontSize={14} color="#0C9000">
                    Buy avatar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setStatus('');
                  }}>
                  <Text fontSize={14} color="#9A9A9A">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {status === 'success' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(changeUserInfo({avatarIndex: activeIndex}));
                    setModalVisible(false);
                    setStatus('');
                  }}>
                  <Text fontSize={14} color="#0C9000">
                    Set avatar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setStatus('');
                  }}>
                  <Text fontSize={14} color="#9A9A9A">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {status === 'error' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Home');
                  }}>
                  <Text fontSize={14} color="#0C9000">
                    Earn more
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setStatus('');
                  }}>
                  <Text fontSize={14} color="#9A9A9A">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    marginTop: 17,
  },
  root: {
    borderRadius: 14,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: width <= 375 ? 4 : 16,
    paddingVertical: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 17,
  },
  diamond: {width: 23, height: 23},
  list: {
    gap: width <= 375 ? 8 : 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: 328,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 23,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarPreview: {
    width: 102,
    height: 102,
    borderRadius: 51,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginBottom: 31,
  },
});

export default Shop;
