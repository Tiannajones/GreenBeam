import { TouchableHighlight, StyleSheet, Text, View, TextInput,Alert, Keyboard  } from 'react-native';

import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import axios from 'axios';

export default function LoginScreenload({ navigation }) {
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword ] = React.useState('');
    //for authentication
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const onLogin = async () => {
      console.log("start");
      console.log(Email);
      console.log(Password);
      //axios.get('127.0.0.1:8000/yelprestaurant')
      //.then((response) => {
      //  console.log(response);
      //}
      //, (error) => {
      //  console.log(error);
      //})
      fetch('http://10.116.148.58:8000/yelprestaurant/')
        .then(response => response.json())
        .then(data => console.log(data));


      navigation.push("CreateAccount")
    };

  return (
      <View style={styles.container}> 
      
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={Email}
        keyboardType="email-address"
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={Password}
        placeholder="Password"
      />

    <TouchableHighlight onPress={() => onLogin()} style={styles.button}>
            <Text style = {styles.text}>
               Login
            </Text>
      </TouchableHighlight>
 
    <TouchableHighlight onPress={() => navigation.push("CreateAccount")} style={styles.button}>
            <Text style = {styles.text}>
               Create Account
            </Text>
      </TouchableHighlight>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#118c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
   button: {
    backgroundColor: "#fff",
     alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 8,
    height: 40,
    width: 200,
  },
  text: {
     fontSize: 20,
      borderColor: 'black',
  },
  input: {
    height: 40,
    width: 200,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    textAlign: 'center'
  },
});