import React, {PropsWithChildren} from 'react';
import {Text as RNText} from 'react-native';

export type FontWeight = '400' | '600';

interface TextProps {
  fontSize?: number;
  mt?: number;
  mb?: number;
  px?: number;
  fontWeight?: FontWeight;
  style?: any;
  ta?: string;
  color?: string;
}

const fontWeightMap: {
  [key: string]: string;
} = {
  600: 'OpenSans-Bold',
  400: 'OpenSans-Regular',
};

const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  fontSize = 16,
  mt,
  mb,
  px,
  fontWeight = '400',
  style,
  color = '#000',
  ta = 'left',
}) => {
  return (
    <RNText
      selectable
      style={[
        {
          fontSize,
          fontWeight,
          color,
          textAlign: ta,
          marginTop: mt,
          marginBottom: mb,
          paddingHorizontal: px,
          fontFamily: fontWeightMap[fontWeight],
        },
        style,
      ]}>
      {children}
    </RNText>
  );
};

export default Text;
