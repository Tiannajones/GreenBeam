import { TouchableHighlight , StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';

import React from 'react';
import axiosInstance from '../axios';

export default function CreateAccountLoad({ navigation }) {
    const [Username, onUserName] = React.useState();
    const [Password, onPassword ] = React.useState();
    const [Email , onEmail] = React.useState();
    const [FirstName , onFirstName] = React.useState();


    const CreateAccountAttemp = (Username, Password, Email) =>{
      if(Boolean(Email) && Boolean(Password) && Boolean(FirstName)){ //Must have a username, pasword and email defined  
        console.log(Username);
        console.log(Password);
        axiosInstance
          .post(`user/register/`, {
            email:Email,
            user_name:Username,
            password:Password
          })
          .then((res) => {
            navigation.push("HomeDrawer");
            console.log(res);
            console.log(res.data);
          })
      }else{
        console.log("Please insert an email, username, and password")
      }
      
    }
    function handleRequest() {
      const endpoint = 'http://127.0.0.1:8000/api/register';
      const payload = { username: this.state.username, password: this.state.password } 
      
      if (this.props.create) {
        payload.first_name = this.state.firstName;
        payload.last_name = this.state.lastName;
      }
      console.log(payload);
      
      axios
        .post(`/auth/${endpoint}/`, payload)
        .then(response => {
          const { token, user } = response.data;
  
          // We set the returned token as the default authorization header
          axios.defaults.headers.common.Authorization = `Token ${token}`;
          
          // Navigate to the home screen
          Actions.main();
        })
        .catch(error => console.log(error));
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
        placeholder="UserName"
      />
      <TextInput
        style={styles.input}
        onChangeText={onPassword}
        value={Password}
        placeholder="Password"
      />
    <TouchableHighlight onPress={() => CreateAccountAttemp(Username, Password, Email)} style={styles.button}>
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