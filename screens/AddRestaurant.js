import {TouchableHighlight , StyleSheet, Text, View } from 'react-native';


import React from 'react';
import { useState } from 'react';

export default function App() {
  const questionArray ={0:"The company has goals for the rational use of water, such as the use limit per activity (for example: for each meal served, 10 liters of water are spent).", 
                        1: "The company has reduced water consumption by at least 15% in the last six months, or by 30% in the previous 12 months monitored by the record (see history of water bills).",
                        2: "The company performs preventive maintenance of the plumbing."


                        
}
const [yselected, setYSelected] = useState(false)
const [nselected, setNSelected] = useState(false)

const backbutton = (qindex) =>{
}
const nextbutton = (qindex)=>{
  setYSelected(false) 
   setNSelected (false)
 }
 const changeColor = (yn) =>{
   if(yn == 0){
     setYSelected(true) 
     setNSelected (false)
   }else{
     setYSelected(false) 
     setNSelected (true)
   }
 }
 


  const qindex = 1
  return (
    <View style= {styles.MainContainer}>
          { questionArray.map((item, key) =>(
            <Text key = {key} style = {styles.TextStyle}> </Text>
          ))}
    <TouchableHighlight onPress={() => changeColor(0)} style={yselected ? [styles.selectedbutton] : [styles.longbutton]}>
            <Text style = {styles.text}>
               Yes  
            </Text>
      </TouchableHighlight>  
      <TouchableHighlight onPress={() => changeColor(1)} style={nselected ? [styles.selectedbutton] : [styles.longbutton]}>
            <Text style = {styles.text}>
               No  
            </Text>
      </TouchableHighlight>  
      <View style= {{height: 80,  width: '100%',  backgroundColor: "#19b194", flexDirection: 'row'}}>
       <TouchableHighlight onPress={() => backbutton(qindex)} style={styles.addrestbutton}>
            <Text style = {styles.text}>
               Back 
            </Text>
      </TouchableHighlight>   
       <TouchableHighlight onPress={() => nextbutton(qindex)} style={styles.addrestbutton}>
            <Text style = {styles.text}>
               Next  
            </Text>
      </TouchableHighlight>   
      </View>
      <TouchableHighlight onPress={() => finalsubmit(qindex)} style={styles.longbutton}>
            <Text style = {styles.text}>
               Submit  
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
  selectedbutton: {
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 8,
    height: 40,
    width: '85%',
  },
  addrestbutton: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 8,
    height: 40,
    width: '45%',
  },
  longbutton: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 8,
    height: 40,
    width: '85%',
  },
  text: {
     fontSize: 20,
      borderColor: 'black',
  },


});