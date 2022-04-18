import React from 'react';
// import { SearchBar } from 'react-native-elements';
// import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // paste inside map view (for get location)
import {request, PERMISSIONS} from 'react-native-permissions'; // for request location permission
import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';
import { Platform } from 'react-native-web';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {styles} from './style.js';

export default function HomeLoad({ navigation }) {
  
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

const styles = StyleSheet.create({

  // search bar

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
   button: {
    backgroundColor: "#FFFFFF",
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

  
  componentDidMount() {
    this.requestLocationPermission();
  },

  requestLocationPermission : async () => {
    if(Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if(response === 'granted') {
        this.locateCurrentPosition();
      } else (
        response = await request(PERMISSIONS.ANDROID.ACCESS_FIND_LOCATION));
        console.log('Android: ' + response);

        if(response === 'granted') {
          this.locateCurrentPosition();
      }
    }
  },

  locateCurrentPosition : () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));
    })
  }
  

  // scrollable bar 
/*
  scrollableContainer: {
    display: flex,
    flexDirection: row,
    height: 100,
  },
  
  leftCol: {
    flex: 1,
    display: flex,
    justifyContent: center,
    alignItems: center,
    background: '#ddd',
  },
  
  centerCol: {
    flex: 1,
    background: '#aaa',
    overFlow: scroll,
  },
  
  rightCol: {
    flex: 1,
    display: flex,
    justifyContent: center,
    alignItems: center,
    background: '#e7e7e7',
  }
*/
});
