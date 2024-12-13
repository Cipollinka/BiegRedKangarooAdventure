import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  Dimensions,
} from 'react-native';

import Text from '../text';

interface ButtonProps {
  title: string;
  bg?: string;
  small?: boolean;
  disabled?: boolean;
  onPress: () => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const {width} = Dimensions.get('window');

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  small,
  icon,
  bg = '#0C9000',
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        style,
        small ? styles.small : null,
        disabled ? styles.disabled : null,
        {backgroundColor: bg},
      ]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.buttonText, small ? styles.smallText : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#227EF6',
    paddingHorizontal: 50,
    paddingVertical: width <= 375 ? 10 : 16,
  },
  icon: {
    marginRight: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  small: {
    borderRadius: 20,
    paddingVertical: 10,
    maxWidth: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width <= 375 ? 20 : 24,
    fontWeight: '800',
  },
  smallText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Button;
