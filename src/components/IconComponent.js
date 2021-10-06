import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { disabledColor, mainColor } from '../settings/constants';

export const IconComponent = ({icon, focused}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        focused
          ? {backgroundColor: mainColor}
          : {backgroundColor: disabledColor, opacity: 0.5},
      ]}>
      <Image source={icon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 18,
    width: 18,
  },
});
