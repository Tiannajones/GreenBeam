import { TouchableHighlight, StyleSheet, Text, View, TextInput,Alert, Keyboard  } from 'react-native';

import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';

export default function LoginScreenload({ navigation }) {
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword ] = React.useState('');
    //for authentication
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const onLogin = async () => {
      console.log("start");
      try {
        console.log("try1");
        navigation.push("CreateAccount");
        try{
          const response = await publicAxios.post('api/token', {
            "email": Email,
            "password": Password,
          });
        } catch (err){
          if (error.response) {
            // There is an error response from the server
            // You can anticipate error.response.data here
            const error = err.response.data;
            dispatch(addError(error.message));
          } else if (error.request) {
            // The request was made but no response was received
            // Error details are stored in error.reqeust
            console.log(error.request);
          } else {
            // Some other errors
            console.log('Error', error.message);
          }
        }
        console.log(response.data);
        try{
          console.log("try2");
          const {accessToken, refreshToken} = response.data;
          authContext.setAuthState({
            accessToken,
            refreshToken,
            authenticated: true,
          });
        }catch(error){
          Alert.alert('setAuthState Failed', error.response.data.message);
          return navigation.push("CreateAccount");
        }
        try{
          console.log("try3");
          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              accessToken,
              refreshToken,
            }),
          );
        }catch (error){
          Alert.alert('KeyChain Failed', error.response.data.message);
          return navigation.push("CreateAccount");
        }
        navigation.push("CreateAccount");
      } catch (error) {
        Alert.alert('Login Failed', error.response.data.message);
        return navigation.push("CreateAccount")
      }
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