import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {styles} from './style.js';
import React, { Component, useState } from 'react';
import { block } from 'react-native-reanimated';
export default function HomeLoad({ navigation }) {
  const [enterGoal, setEnterGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
   const [tmpArray] = useState([
      // this is the original format
      // instead needs to be the contents of the
      // database... most likely implemented by backend
      { name: "Jimmy Johns", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" },
      { name: "Panda Express", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" },
      { name: "Jimmy Johns", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" },
      { name: "Panda Express", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" }
    ]);
  const goalInputHandler = enteredText => {
    setEnterGoal(enteredText);
  };
  const addGoalHandler = () => {
    setCourseGoals(currentGoals => [...currentGoals, enterGoal]);
    // setEnterGoal('');
  };
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      onChangeText={console.log("big")}
      value={"Works"}
      placeholder="Searching"
    />
     <View style={{height: 400,
   width: 400, backgroundColor: '#fff'}}>
      </View>
      <TouchableHighlight onPress={() => searchAttempt(Search)} style={styles.button}>
            <Text style = {styles.text}>
               Search
            </Text>
      </TouchableHighlight>
      <ScrollView>
        {tmpArray.map(item => (
          <View style={stylet.listItem}>
            <Text>
             {item.rating}

             </Text>
            <Text key={item}>
            {item.name}
             
            
           

            {item.distance}


            {item.categroies}


            {item.address}
          </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const stylet = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  listItem: {
    padding: 5,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 4,
    marginVertical: 2,
    height:80,
    width: 215,
    letterSpacing:1,
    textDecorationColor: 'red',
    textShadowColor:'gray',
   
    
  },
});













