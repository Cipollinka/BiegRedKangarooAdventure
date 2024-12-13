import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';

interface IProps {
  ph?: number;
}

const SafeView: React.FC<PropsWithChildren<IProps>> = ({children, ph = 16}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.container, {paddingHorizontal: ph}]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SafeView;
