import React from 'react';
// import { SearchBar } from 'react-native-elements';
// import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, StyleSheet, Text, View, TextInput, Keyboard  } from 'react-native';


export default function HomeLoad({ navigation }) {
  return (
    <View style={styles.container}> 

    <SearchBar
      placeholder="Search Contacts..."
      placeholderTextColor="darkgrey"
      containerStyle={style.container_style}
      inputStyle={{ backgroundColor: "lightgrey", fontSize: 15 }}
      inputContainerStyle={{
        backgroundColor: "lightgrey",
        height: 20,
      }}
      onChangeText={(searchTerm) => {
        console.log(searchTerm);
      }}
        value={searchText}
      /> 

    <TextInput
      style={styles.input}
      onChangeText={onMap}
      value={Map}
      placeholder="Dynamic Map"
    />

<TouchableHighlight onPress={() => mapDisplay(Map)} style={styles.button}>
            <Text style = {styles.text}>
               dynamicMap
            </Text>
      </TouchableHighlight>

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});