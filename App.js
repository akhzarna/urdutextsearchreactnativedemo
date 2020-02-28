/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// 1st Step
 import { createStackNavigator } from 'react-navigation-stack';
 // authentication views

 import { createSwitchNavigator, createAppContainer } from 'react-navigation';

 // import HomeViewController from './HomeViewController';
 // import DetailViewController from './DetailViewController';

 // Some More Screens
 import  Register  from "./Register";
 import  Dashboard  from "./Dashboard";
 import  Newcontroller  from "./Newcontroller";
 import  SectionListController  from "./SectionListController";

 const AuthNavigator = createStackNavigator({
     Register: { screen: Register },
     Dashboard: { screen: Dashboard },
     Newcontroller: { screen: Newcontroller },
     SectionListController: { screen: SectionListController },
   },
   {
    // headerMode: 'none'
   }
 );

 const App = createAppContainer(AuthNavigator);

 export default App;
