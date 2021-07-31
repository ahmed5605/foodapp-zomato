/* eslint-disable prettier/prettier */
import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Home from 'react-native-vector-icons/Entypo';
import Favorites from 'react-native-vector-icons/MaterialIcons';
import Profile from 'react-native-vector-icons/FontAwesome5';

import {View, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import FavoriteScreen from './FavoriteScreen';


const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home:{
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
              <Home style={[{color: tintColor}]}  size={25} name={'home'} />
          </View>
        )
      }
    },
    Favorite:{
      screen: FavoriteScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
              <Favorites style={[{color: tintColor}]} size={25} name={'favorite'} />
          </View>
        )
      }
    },
    Profile:{
      screen: ProfileScreen,
      navigationOptions: {

        tabBarIcon: ({tintColor}) => (
          <View>
               <Profile style={[{color: tintColor}]}  size={25} name={'user-alt'} />
          </View>
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#E74C3C',
    inactiveColor: '#F5B7B1',
    barStyle: { backgroundColor: 'white',},
  }
);


export default createAppContainer(TabNavigator);