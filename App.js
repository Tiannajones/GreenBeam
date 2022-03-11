import { Coustard_400Regular, useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Settings, StyleSheet, Text, View } from 'react-native';

// import AddRestaurant from "./.expo-shared/app/Screens/AddRestaurant"
import CreateAccount from "./screens/CreateAccount"
// import Favorites from "./.expo-shared/app/Screens/Favorites"
// import Home from "./.expo-shared/app/Screens/Home"
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from "./screens/LoginScreen"
import { StatusBar } from 'expo-status-bar';
// import Profile from "./.expo-shared/app/Screens/Profile"
// import Restaurant from "./.expo-shared/app/Screens/Restaurant"
// import SettingScreen from "./.expo-shared/app/Screens/SettingScreen"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';

/**
 * App Screens
 **/


/*
This just holds the actual home page and Resuant page 
*/
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Restaurant" component={Restaurant} />
  </HomeStack.Navigator>
);


const SettingStack = createStackNavigator();
const SettingStackScreen = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name="Settings" component={SettingScreen} />
    <SettingStack.Screen name="AddRestaurant" component={AddRestaurant} />
    <SettingStack.Screen name="Favorites" component={Favorites} />
    <SettingStack.Screen name="Profile" component={Profile} />
  </SettingStack.Navigator>
);


/*
This holds the main app 
It holds the Home screen and the setting screen
*/
const HomeDrawer = createDrawerNavigator();
const HomeDrawerScreen  = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="Settings" component={SettingStack} />
  </Drawer.Navigator>
);

/*
This Stack handels logging in and creating the account 
The base one is the login process 
if they login pass back to Root and move to the app its self 
The second layer is the create account proccess 
*/
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

/*
This is the most deep layer of our navagators 
Here we seperate login from using the app 
If we aren't logged in we should be in the Auth stack 
When we are logged in we are in the App Drawer
*/
const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    console.log("not yet")
    {false ? (
      <RootStack.Screen
        name="App"
        component={HomeDrawer}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  // const authContext = React.useMemo(() => {
  //   return {
  //     signIn: () => {
  //       setIsLoading(false);
  //       setUserToken("asdf");
  //     },
  //     signUp: () => {
  //       setIsLoading(false);
  //       setUserToken("asdf");
  //     },
  //     signOut: () => {
  //       setIsLoading(false);
  //       setUserToken(null);
  //     }
  //   };
  // }, []);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  // if (isLoading) {
  //   return <Splash />;
  // }

// export default function App() {
//   return (
//     //<AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         console.log("Test 1")
//         <AuthStackScreen/>
//       </NavigationContainer>
    //</AuthContext.Provider>
  // );
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Jake</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});