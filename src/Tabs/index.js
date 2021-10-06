import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import MainScreen from '../screens/MainScreen/MainScreen';
import StonksScreen from '../screens/StonksScreen/StonksScreen';
import {IconComponent} from '../components/IconComponent';
import {disabledColor, mainColor} from '../settings/constants';
import {observer} from 'mobx-react';
import { stockStore } from '../store/store';

const Tabs = observer(() => {
  const TabMenu = createBottomTabNavigator();
  const store = stockStore;

  return (
    <TabMenu.Navigator
      screenOptions={{
        showLabel: false,
        keyboardHidesTabBar: Platform.OS === 'ios' ? false : true,
        activeTintColor: mainColor,
        inactiveTintColor: disabledColor,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 40,
          right: 40,
          height: 70,
          borderRadius: 15,
          paddingTop: 10,
          paddingBottom: 10,
          // iOS only
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          // Android only
          elevation: 3,
        },
        headerShown: false,
      }}>
      <TabMenu.Screen
        name="О приложении"
        component={MainScreen}
        listeners={() => ({
          tabPress: () => {
            store.stopLoadingData();
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <IconComponent
              focused={focused}
              icon={require('../assets/Home.png')}
            />
          ),
        }}
      />
      <TabMenu.Screen
        name="Котировки"
        component={StonksScreen}
        listeners={() => ({
          tabPress: () => {
            store.startLoadingData();
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <IconComponent
              focused={focused}
              icon={require('../assets/Stock.png')}
            />
          ),
        }}
      />
    </TabMenu.Navigator>
  );
});

export default Tabs;
