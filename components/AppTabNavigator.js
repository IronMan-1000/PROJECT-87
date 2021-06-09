import React from 'react';
import { Image, StyleSheet,  } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import Exchange from '../screens/Exchange';


export const AppTabNavigator = createMaterialBottomTabNavigator({
  
  HomeScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/home-icon.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Barter Item",
      activeColor: 'darkblue',  
      inactiveColor: 'yellow',  
      barStyle: { backgroundColor: '#90EE90', position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        borderRadius: 200,
        height: 50, },
    }
  },
  BookRequest: {
    screen: Exchange,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/ads-icon.png")} style={{width:20, height:20,}} />,
      tabBarLabel : "Exchange Item",
      activeColor: 'darkblue',  
      inactiveColor: 'yellow',  
      barStyle: { backgroundColor: '#90EE90', position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        borderRadius: 200,
        height: 50, },
    }
  },
   
});

