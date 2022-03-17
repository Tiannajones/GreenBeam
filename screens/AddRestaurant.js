import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

// let btn = document.createElement("button");
// btn.innerHTML = "Add Restaurant";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>New problem </Text>
      <Text>document.body.appendChild(btn)</Text>
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