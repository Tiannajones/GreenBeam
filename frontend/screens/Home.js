import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, Alert, ScrollView, Image  } from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps';
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
  const [RestaurantList, setRestaurantList] = useState([]);
  const [Search, setSearch] = React.useState('');

  const loadRestaurants = async () => {
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

  const searchAttempt = async () => {
    try {
      console.log(Search);
      let url = 'api/searchname/?search='+Search;
      const response = await axiosContext.publicAxios.get(url);
      console.log(response.data);
      setRestaurantList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      onChangeText={text => setSearch(text)}
      value={Search}
      placeholder="Search..."
    />
  
     <View style={{height: 400, width: 400, backgroundColor: '#fff'}}>
      <MapView style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 30.633263,
          longitude: -97.677986,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {RestaurantList.map((item,key) => (
          <Marker
            key={key}
            coordinate={{ latitude : Number(item.latitude) , longitude : Number(item.longitude) }}
            title={item.name}
          >
          <Image
                source={require('../assets/map_marker.png')}
                style={{width: 26, height: 35}}
                resizeMode="center"
                resizeMethod = "resize"
          />
          </Marker>
        ))}
        </MapView>
      </View>
      
      <TouchableHighlight onPress={() => searchAttempt()} style={styles.button}>
            <Text style = {styles.text}>
               Search
            </Text>
      </TouchableHighlight>
      
      <ScrollView>
        {RestaurantList.map((item,key) => (
          <View style={stylet.listItem} key={item.name}>

          <Text style={stylet.name} key={item.name} >
          {item.name}
           </Text>

          
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
              <Image
                style={{
                  flex: 1,
                  width: 39, 
                  height: 53,
                  position: 'absolute',
                  right: 20,
                  
                }}
                resizeMode="center"
                resizeMethod = "resize"
                source={require('../assets/not-rated.png')}
              />
              <Text key={item.distance} style={{position: 'absolute', left: 0}}>
                {item.distance} miles
              </Text>
          </View>

          <Text key={item.address}>
          {item.address}
          </Text>
          <Text key={item.categories_title}>
          {item.categories_title}
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
    backgroundColor: '#028090',
    borderColor: '#f0f3bd',
    borderWidth: 4,
    marginVertical: 2,
    height:105,
    width: 300,
    letterSpacing:1,
    textDecorationColor: 'red',
    textShadowColor:'gray',
  },
  name: {
    fontSize: 18,
    color: '#f0f3bd',
     borderColor: 'black',
     fontFamily: 'Righteous-Regular',
 },
  
});
