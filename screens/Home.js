import React from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeLoad() {
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

      <Text>Home </Text>
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