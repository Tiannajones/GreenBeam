import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';

import React from 'react';
const ValidityState= (Username, Password) =>{{
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

export default function LoginScreenload({ navigation }) {
    const [Username, onUserName] = React.useState();
    const [Password, onPassword ] = React.useState();

    const loginAttemt = (Username, Password) =>{
      if(Boolean(Username) && Boolean(Password)){ //Must have a username and pasword defined  
      console.log(Username);
      console.log(Password);
      navigation.push("HomeDrawer");
      }else{
        console.log("done")
      } 
    }

  }


  

      if(!input['password']) {
        isValid = false; 
        errors['password'] = 'Please enter your password';
      }    
      if(typeof input ['password'] !== "undefined") {
        if(input[password].length < 6) {
          isValid = false;
          errors['password'] = 'Please enter a password that is at least 6 characters in length'; 

        }
      }  
      this.setState({
        errors: errors 
      });
      return isValid; 

    }

  return (
      <View style={styles.container}> 
      
      <TextInput
        style={styles.input}
        onChangeText={onUserName}
        value={Username}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onPassword}
        value={Password}
        placeholder="Password"
      />

    <TouchableHighlight onPress={() => loginAttemt(Username, Password)} style={styles.button}>
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
  root: {  // this should make the field name red
    '&$error': {
      color: 'red'
    }
  },
  underline: {  // this should make the error message below the field red 
    '&$error:after': {
      borderBottomColor: 'red',
    }
  },
});