import React from 'react'
import 'react-native-gesture-handler'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect} from 'react-redux'

import LoginScreen from './src/screens/Login';
import WeatherScreen from './src/screens/Weather'
import WatchListScreen from './src/screens/WatchList';
import SearchScreen from './src/screens/Search'
import SignUpScreen from './src/screens/SignUp';

const App = (props) => {

  const MainStack = createStackNavigator();
  const RootStack = createStackNavigator();

  function MainStackScreen(){
    return(
<MainStack.Navigator initialRouteName="Login">
  
  <MainStack.Screen name="Login" component={LoginScreen} />
  <MainStack.Screen name="SignUp" component={SignUpScreen} />
  <MainStack.Screen name="Weather" component={WeatherScreen} />
  <MainStack.Screen name="WatchList" component={WatchListScreen} />
      </MainStack.Navigator>
    )
  }

  console.log(props.login)
  return (
    <>
  <NavigationContainer> 
  <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="Search" component={SearchScreen} />
      </RootStack.Navigator>
  </NavigationContainer>
    </> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'darkslateblue',
    fontSize: 30
  }
})

const mapStateToProps = (state)=>{
  return{
    login : state.login
  }
}

export default  connect(mapStateToProps , null)(App)