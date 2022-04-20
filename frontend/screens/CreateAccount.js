import { TouchableHighlight , StyleSheet, Text, View, TextInput,Alert, Keyboard  } from 'react-native';
import {styles} from './style.js';


import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';

export default function CreateAccountLoad({ navigation }) {
  const [Username, setUserName] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword ] = React.useState('');
  //for authentication
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);

  const onCreateAccount = async () => {
    try{
      const response1 = await publicAxios.post('api/user/register/', {
        email: Email,
        user_name: Username,
        password: Password,
      });
    }catch (error){
      Alert.alert('Registration Failed', error.response1.data.message);
    }
    
    try {
      const response2 = await publicAxios.post('api/token/', {
        email: Email,
        password: Password,
      });

      const {accessToken, refreshToken} = response2.data;
      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
      );
    } catch (error) {
      Alert.alert('Login Failed', error.response2.data.message);
    }
  };

    

  return (
      <View style={styles.container}> 
      
     <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={Email}
        keyboardType="email-address"
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={Username}
        placeholder="UserName"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={Password}
        placeholder="Password"
      />
    <TouchableHighlight onPress={() => onCreateAccount()} style={styles.button}>
            <Text style = {styles.text}>
               Create Account 
            </Text>
      </TouchableHighlight>    
    </View>
  );
}
