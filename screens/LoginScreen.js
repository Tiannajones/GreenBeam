import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';

import React from 'react';
import axios from 'axios';

//import from context
import { AuthContext } from '../context';

export default function LoginScreenload({ navigation }) {
    const [Username, onUserName] = React.useState();
    const [Email, onEmail] = React.useState();
    const [Password, onPassword ] = React.useState();

    const { signIn } = React.useContext(AuthContext);
    const loginAttempt = (Email, Username, Password) =>{
      if(Boolean(Email) && Boolean(Username) && Boolean(Password)){ //Must have a username and pasword defined  
        console.log(Email);
        console.log(Username);
        console.log(Password);
        handleRequest(Email,Username,Password);
        //uToken = 'ajsdfasdfasdf';
        signIn();
      //navigation.push("HomeDrawer");
      }else{
        console.log("done")
        console.log(Email);
        console.log(Username);
        console.log(Password);
      }
    }

    const handleRequest = (Email, Username, Password) => {
      const endpoint = 'http://127.0.0.1:8000/api/user/register';
      const payload = { email: Email, user_name: Username, password: Password } 
      
      //if (this.props.create) {
      //  payload.email = this.state.firstName;
      //  payload.last_name = this.state.lastName;
      //}
      //console.log(payload);
      
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/user/register/',
        data: {
          email: Email,
          user_name: Username,
          password: Password
        }
      });
    }

  return (
      <View style={styles.container}> 
      
      <TextInput
        style={styles.input}
        onChangeText={onEmail}
        value={Email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onUserName}
        value={Username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onPassword}
        value={Password}
        placeholder="Password"
      />

    <TouchableHighlight onPress={() => loginAttempt(Email, Username, Password)} style={styles.button}>
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