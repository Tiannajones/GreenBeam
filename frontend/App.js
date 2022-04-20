import { Redressed_400Regular, useFonts } from 'expo-font';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Settings, StyleSheet, Text, View, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem  } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';

//import for Authentication
import {AuthContext} from './context/AuthContext';
import * as Keychain from 'react-native-keychain';

/**
 * App Screens
 **/
import AddRestaurant from "./screens/AddRestaurant"
import CreateAccount from "./screens/CreateAccount"
import Favorites from "./screens/Favorites"
import Home from "./screens/Home"
import LoginScreen from "./screens/LoginScreen"
import Profile from "./screens/Profile"
import Restaurant from "./screens/Restaurant"
import SettingScreen from "./screens/SettingScreen"
import Spinner from './screens/Spinner';



/*
This just holds the actual home page and Resuant page 
*/
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false, headerBackVisible : 'false' }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Restaurant" component={Restaurant} />
  </HomeStack.Navigator>
);

//https://reactnative.dev/docs/alert
//This creates an alert(a popup) which confirms if the user would like to logout


function createTwoButtonAlert(){
  try{
  const authContext = useContext(AuthContext);
  } catch (error) {
    console.log(`authContext Error: ${error.message}`);
  }
  Alert.alert(
    "Log Out",
    "Are you sure you want to log out",
    [
      { text: "No"},//does nothing closes alert 
      {text: "Yes", onPress: () => console.log("LOGOUT")} //authContext.logout()
    ]
  );
}

/*
With Drawer content we can add buttons directly into the drawer without them having thier own screen 
This holds the logout button which logs the user out 
*/

//
function CustomDrawerContent(props) {
 //https://stackoverflow.com/questions/52409855/how-to-get-objects-in-array-of-object-in-react-native
 //createTwoButtonAlert(props.navigation.getParent())} in onPress body
 const authContext = useContext(AuthContext);
 return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={() =>
         authContext.logout()} /> 
    </DrawerContentScrollView>
  );
}

/*
This holds the main app 
It holds the Home screen and the setting screen
https://reactnavigation.org/docs/drawer-navigator/
//https://stackoverflow.com/questions/56820757/how-to-place-search-bar-inside-header-in-react-native may be useful when we need to add a search box 
*/
const HomeDrawer = createDrawerNavigator();
const HomeDrawerScreen  = () => (
  <HomeDrawer.Navigator initialRouteName="HomeStack" screenOptions={{  headerBackVisible : 'false' }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <HomeDrawer.Screen name="HomeStack" component={HomeStackScreen} options={{title :"Home", headerTitle : "" }}/> 
    <HomeDrawer.Screen name="Profile" component={Profile} />
    <HomeDrawer.Screen name="Favorites" component={Favorites} />
    <HomeDrawer.Screen name="Settings" component={SettingScreen} />
    <HomeDrawer.Screen name="AddRestaurant" component={AddRestaurant} />
  </HomeDrawer.Navigator>
);

/*
This Stack handels logging in and creating the account 
The base one is the login process 
if they login pass back to Root and move to the app its self 
The second layer is the create account proccess 
*/
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator presentation= 'card' screenOptions={{gestureEnabled : false, headerBackVisible : false }}>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Sign In",}}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
    <AuthStack.Screen
      name="HomeDrawer"
      component={HomeDrawerScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const App = () => {
  let [fontsLoaded] = useFonts({Redressed_400Regular, "Cabin_400Regular": require("./assets/Cabin_400Regular.ttf"), "OleoScript_400Regular": require("./assets/OleoScript_400Regular.ttf")});

  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      try{
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
      } catch (error){
        console.log(`setAuthState Error: ${error.message}`);
      }
    }
  }, []);

  //DEBUG

  console.log(authContext?.authState?.authenticated); //DEBUG

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Spinner />;
  }

  fontsLoaded = true;

  if(!fontsLoaded){
    return <AppLoading/>;
  }
  else{
    console.log("Moved past font loading");
    try{
      if (authContext?.authState?.authenticated === true) {
        return (
          <NavigationContainer>
            <HomeDrawerScreen/>
          </NavigationContainer>
        );
      } else {
        return (
          <NavigationContainer>
            <AuthStackScreen/>
          </NavigationContainer>
        );
      }
    } catch (error){
      console.log(error.message);
    }
  }
}

export default App;
