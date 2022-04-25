import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {styles} from './style.js';
import React, { Component, useState, useContext, useEffect, useCallback } from 'react';
import {AxiosContext} from '../context/AxiosContext';
import {AuthContext} from '../context/AuthContext';
import Spinner from './Spinner';
import { block } from 'react-native-reanimated';

export default function HomeLoad({ navigation }) {
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [restaurantlist, setRestaurantList] = useState([]);
  //const [isInitialized, setInitialized] = useState(false);
  //const [status, setStatus] = useState('idle');
  //const started = false;
  const loadRestaurants = async () => {
    //setStatus('loading');
    try {
      const response = await axiosContext.publicAxios.get('api/restaurantlist/');
      console.log(response.data);
      setRestaurantList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { //loads the restaurants only once
    loadRestaurants();
  }, []);

  const [tmpArray] = useState([
      // this is the original format
      // instead needs to be the contents of the
      // database... most likely implemented by backend
      { name: "Jimmy Johns", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" },
      { name: "Panda Express", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" },
      { name: "Jimmy Johns", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" },
      { name: "Panda Express", rating: 75, distance: "1.2", categories: "sandwitch", address: "950 W University Ave Ste. 201", url: "www.google.com" }
    ]);

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
        {restaurantlist.map(item => (
          <View style={stylet.listItem}>
          <Text>
          {item.name}

           </Text>
          <Text key={item}>
          
           
          {item.yelp_rating}
         

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













