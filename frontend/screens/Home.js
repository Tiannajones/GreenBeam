import React from 'react';
// import { SearchBar } from 'react-native-elements';
//import Geolocation from '@react-native-community/geolocation'; // paste inside map view (for get location)
import {request, PERMISSIONS} from 'react-native-permissions'; // for request location permission
import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';
import { Platform } from 'react-native-web';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {styles} from './style.js';

export default function HomeLoad({ navigation }) {
 /* 
  const [Search, onSearch] = React.useState();
  const items = [...Array(100)].map((val, i) => `Item ${i}`);

  const searchAttempt = (Search) => {
    if(Boolean(Search)) {
      console.log(Search);
      navigation.push("HomeDrawer");
    }
  }
  
  const App = () => (
    <div className="Home.js">
      <div className="leftCol">
        leftCol
      </div>
      
      <div className="centerCol">
        <span>List</span>
        <ul>
          {items.map((item, i) => (<li key={`item_${i}`}>{ item }</li>))}
        </ul>
      </div>
      
      <div className="rightCol">
        rightCol
      </div>
    </div>
  );
  
  renderRestaurantBubble = ({item}) => 
  <View> 
    <Text>
      
    </Text>
  </View>






  
   // ReactDOM.render(<App />, document.getElementById('react'));


/*
<MapView
         style={mapstyles.map}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: 30.633263,
         longitude: -97.677986,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
        />
  */
  return (
    <View style={styles.container}> 

    <TextInput
      style={styles.input}
      onChangeText={onSearch}
      value={Search}
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

      </View>

  );
}
const mapstyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


