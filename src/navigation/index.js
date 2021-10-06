import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from '../Tabs/index.js';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default AppNavigation;
