import { TouchableHighlight, StyleSheet, Text, View, TextInput,Alert,Image, Keyboard  } from 'react-native';
import {styles} from './style.js';
import { Dimensions } from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';

/*const ValidityState= (Username, Password) =>{
  let input = this.state.input; 
  let errors = {};
  let isValid = true; 

  if(!input['email']) {
    isValid = false; 
    errors['email'] = "Please enter you email address";
  }
  if (typeof input['email'] !== "undefined"){
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if(!pattern.test(input['email'])) {
        isValid = false;
        errors['email'] = 'Please enter a valid email address.';
      }
  }
}
*/
const fontwidth= Dimensions.get('window').width

export default function LoginScreenload({ navigation }) {
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword ] = React.useState('');
    //for authentication
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);
  
    const onLogin = async () => {
      console.log(Email)
      console.log(Password)
      try {
        const response = await publicAxios.post('api/token/', {
          email: Email,
          password: Password,
        });
  
        const {accessToken, refreshToken} = response.data;
        authContext.setAuthState({
          accessToken,
          refreshToken,
          authenticated: true,
        });
  
        //await Keychain.setGenericPassword(
          //'token',
          //JSON.stringify({
            //accessToken,
            //refreshToken,
         // }),
        //);
        navigation.push("CreateAccount");
      } catch (error) {
        Alert.alert('Login Failed', error.response.data.message);
      }
    };
    
    
  return (
      <View style={styles.container}> 
      <Text style = {{fontSize:0.2*fontwidth,fontFamily: 'Redressed_400Regular',color: '#fff',}}> Green Beam  </Text>
      <Image source = {require('./greenbeamlogo.png')} style = {{ width: '80%', height: '30%',marginTop: 50 ,marginBottom: 30}}/>
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


const popupStlye = StyleSheet.create({
   root: {  // this should make the field name red
    
      color: 'red'
    
  },
  underline: {  // this should make the error message below the field red 
    
      borderBottomColor: 'red',
    
  },
});
