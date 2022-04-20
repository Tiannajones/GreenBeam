import React from 'react';
// import { SearchBar } from 'react-native-elements';
// import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';


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
  
  renderRestaurantBubble = ({item}) => 
  <View> 
    <Text>
      
    </Text>
  </View>






  
   // ReactDOM.render(<App />, document.getElementById('react'));

  return (
    <View style={styles.container}> 

    <TextInput
      style={styles.input}
      onChangeText={onSearch}
      value={Search}
      placeholder="Searching"
    />

    <TouchableHighlight onPress={() => searchAttempt(Search)} style={styles.button}>
            <Text style = {styles.text}>
               Search
            </Text>
      </TouchableHighlight>

      </View>

  );
}

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