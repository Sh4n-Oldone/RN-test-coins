import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {secondaryColor} from '../../settings/constants';

const MainScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>r/wallstreetbets</Text>
      <Text style={styles.mainParagraph}>Только в плюс!</Text>
      <Image
        source={require('../../assets/Stonks_vector.png')}
        style={styles.mainImg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeader: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
  },
  mainParagraph: {
    fontSize: 22,
    marginBottom: 5,
  },
  mainImg: {
    resizeMode: 'contain',
    width: '90%',
    transform: [{scaleX: -1}],
  },
});

export default MainScreen;
