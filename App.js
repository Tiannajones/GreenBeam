import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';


export default function App() {
 //const [number, onChangeNumber] = React.useState(null);
  
  return (
    <SafeAreaView style={LoginBackground.container}>
     <Text adjustsFontSizeToFit = {true} style={{ fontFamily: 'Inter-Black', fontSize: 60, color: '#beed72', justifyContent: 'center', alignItems: 'center'
, textAlign: 'center' }}>GreenBeam</Text>
      {/*
      <TextInput
        style={LoginInput.input}
        onChangeText={onChangeNumber}
        placeholder="useless placeholder"
        multiline = {false}
        keyboardType="email-address"
      />
      */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const LoginBackground = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39ab1a',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
const LoginInput = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
