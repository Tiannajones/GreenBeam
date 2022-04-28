import {TouchableHighlight , StyleSheet, Text, View } from 'react-native';
import {styles} from './style.js';

import React, { Component } from 'react';
import { useState } from 'react';

class ArrayExample extends Component{
  constructor(props){
    super(props);
      
  }
}
export default function App() {
  const [questionNumber, setQNumber] = useState(0) 
  const [yselected, setYSelected] = useState(false)
  const [nselected, setNSelected] = useState(false)

  const finalsubmit = (ans) =>{
    console.log(ans)
  }
  const questionArray ={
   0:"The company has goals for the rational use of water, such as the use limit per activity (for example: for each meal served, 10 liters of water are spent).", 
  1: "The company has reduced water consumption by at least 15% in the last six months, or by 30% in the previous 12 months monitored by the record (see history of water bills).",
  2: "The company performs preventive maintenance of the plumbing.",
  3: "The company, in case of a water leak, performs immediate repair.",
  4: "Employees verify that taps, when not in use and at the end of the service, are closed (note: confirm with the employee).",
  5: "The pressure of kitchen faucets, washbasins, and bathrooms is regulated and limited to allow water savings.",
  6: "Taps installed in hand or kitchen sinks have automatic activation.",
  7: "The water reservoir is adequately kept covered and conserved and is free from cracks, leaks, infiltrations, peeling, and other defects.",
  8: "The company does not use running water to melt ice in sinks or thaw food.",
  9: "Employees remove dirt without water from utensils before putting them in the washing machine.",
 10: "Dishwashers are operated only at full loading capacity.",
 11: "When cleaning floors, the water flow is interrupted when it is not necessary to use it.",
 12: "Rainwater is collected and/or water from thermal counters that use water is recycled for use in activities where the use of drinking water is not required (e.g., flushing, washing outside areas).",
 13: "The company has documentation for the assessment and/or inspection of energy use for energy conservation.",
 14: "The company has reduced energy expenditure by at least 15% in the last six months, or 30% in the previous 12 months (see history of energy expenditure).",
 15: "The company has smart energy meters. Check the energy meter.",
 16: "The company does not use air coolers as it has natural ventilation to maintain thermal comfort.",
 17: "The refrigerator and freezer doors have audible alarms for open doors or automatic locks.",
 18: "The temperature of refrigerators, cooling chambers, and freezers are adequate and have a monitoring record.",
 19: "The company performs and documents the maintenance recommended by the manufacturer for electronic devices to ensure that all equipment is functioning correctly and maintains energy efficiency levels.",
 20: "The company cleans the air cooler filters with suitable detergents or contracts a third-party company for this service and changes the replaceable filters according to the manufacturer’s guidelines.",
 21: "The company has lighting controls, such as sensors and timers, in low-occupancy areas (for example, in the distribution area) so that lights are automatically turned off when daylight is sufficient or when spaces are not being occupied.",
 22: "The company uses some form of renewable energy (wind, solar, or photovoltaic) in the production area.",
 23: "The company achieves zero greenhouse gas emissions with proven partnerships (e.g., commercial energy and vehicle fuel use).",
 24: "The company has a documented program to reduce carbon emissions (by at least 5% per year).",
 25: "The company has documented targets for reducing the use of liquefied petroleum gas.",
 26: "The company has documented targets for reducing the use of natural gas.",
 27: "The company uses biogas.",
 28: "The company owns and uses the technical preparation sheets to make the preparations.",
 29: "The company has options for smaller portions separately or a children’s menu.",
 30: "The company offers ≥50% of its proven healthiest (less salt, sugar, and oil) dishes.",
 31: "The company offers a separate menu or substitutions to meet diet restrictions, such as gluten-free preparations, vegetarian cuisine, vegan menu, or preparations to meet religious restrictions.",
 32: "The company has documented commitments, with a defined term, to reduce the use of sugar, salt, or saturated fat on the menu.",
 33: "The company includes seasonal products in its menu, changing it throughout the months of the year.",
 34: "At least 50% of the fruits and vegetables that the company buys are certified organic.",
 35: "The company manages its vegetable garden without using pesticides.",
 36: "Suppliers of products of animal origin have certificates that prove that animals are raised without the application of antibiotics or organics.",
 37: "The company only purchases products of animal origin that have an animal welfare certification seal.",
 38: "The company has a policy of purchasing sustainable seafood.",
 39: "The company’s supplier produces farmed fish and has a sustainability certification (for example, organic).",
 40: "The company does not use ingredients or products with transgenic ingredients in its composition in the production of meals.",
 41: "The company prioritizes the full use of food, producing safe preparations that use peels, stalks, and/or edible shavings of vegetables and fruits as ingredients.",
 42: "The company assesses its food waste during food preparation.",
 43: "The company assesses its food waste during food distribution.",
 44: "The company discards food waste in the form of composting, anaerobic digestion, maceration, donates to feed pigs, or establishes partnerships with cooperatives that carry out these processes.",
 45: "The company trains its employees to avoid food waste during all stages of meal production, from the receipt of food to distribution.",
 46: " The company carries out smart ordering systems, inventory monitoring, inventory rotation, and/or other inventory management strategies to avoid food waste.",
 47: "The company has goals for reducing/controlling food waste.",
 48: "The company recycles or reuses its coffee grounds.",
 49: "The company recycles cooking oil and/or transfers the cooking oil used to recycling companies.",
 50: "The company has an operational policy that contains a documented strategy on solid (non-food) waste management.",
 51: "The company separates recyclable materials, that is, selective collection.",
 52: "The company limits packaging and orders products in bulk to avoid waste generation.",
 53: "The company does not use disposables and/or adopts strategies to minimize the use of these materials as much as possible, with documented goals.",
 54: "The company adopts strategies to reduce the use of plastic in the distribution of meals.",
 55: "The company returns packaging boxes for suppliers to reuse and/or provides suppliers with their returnable boxes for the delivery of goods.",
 56: "The company returns glass bottles for suppliers to reuse and/or properly dispose of these materials for recycling.",
 57: "The company adopts measures to encourage its customers to reduce waste (for example: maintaining glasses, reducing disposable packaging, and eliminating plastics or straws).",
 58: "The company uses recycled paper or FSC-certified office paper.",
 59: "The company uses lamps, accessories, or furniture made from recovered or recycled materials or those provided with an environmental product declaration to improve the environmental impact.",
 60: "The paints used for building are environmentally sustainable.",
 61: "The furniture (tables, chairs, and others) of the company is made of durable materials that can be repaired.",
 62: "The tablecloths (if any) and/or employees uniforms are made of organic or environmentally sustainable materials.",
 63: "The company uses rechargeable batteries for battery-powered devices and equipment, including flashlights, handheld vacuum cleaners, and others.",
 64: "Office equipment replaced or purchased is ENERGY STAR or PROCEL certified.",
 65: "The company uses only ecological cleaning products.",
 66: "The company uses cleaning concentrates and dilution control systems and/or employee training and monitoring for adequate dilution to minimize the use of chemicals.",
 67: "The company exclusively uses environmentally sustainable hand cleaners in the bathrooms of customers and employees.",
 68: " The team has already undergone environmental training (energy efficiency and water efficiency).",
 69: "The team has already undergone environmental training (fundamentals of sustainability).",
 70: "The staff has undergone some training on healthy eating and the health impact of what they are producing.",
 71: "The company has a strategy regarding donations or support to its community.",
 72: "The company donates to food banks or charities to avoid wasting food from products suitable for consumption.",
 73: "The company has initiatives to promote healthy eating education for the local community (schools, colleges, community groups).",
 74: "The company has a policy in place with the supplier or purchase specification that favors the acquisition of local products for foods such as dairy products, meat, fruits, and vegetables.",
 75: "Does the company purchase one or more products from a charitable foundation or a social enterprise that provides social impact? (For example, a product made from leftover food, bread from a social enterprise bakery, etc.)." 
}
//https://www.youtube.com/watch?v=KcC8KZ_Ga2M
var anserArray = {
  0:-1,
  1: -1,
  2: 1,
  3: -1,
  4: 0,
  5: 1,
  6: -1,
  7: -1,
  8: -1,
  9: -1,
  10: -1,
  11: -1,
  12: -1,
  13: -1,
  14: -1,
  15: -1,
  16: -1,
  17: -1,
  18: -1,
  19: -1,
  20: -1,
  21: -1,
  22: -1,
  23: -1,
  24: -1,
  25: -1,
  26: -1,
  27: -1,
  28: -1,
  29: -1,
  30: -1,
  31: -1,
  32: -1,
  33: -1,
  34: -1,
  35: -1,
  36: -1,
  37: -1,
  38: -1,
  39: -1,
  40: -1,
  41: -1,
  42: -1,
  43: -1,
  44: -1,
  45: -1,
  46: -1,
  47: -1,
  48: -1,
  49: -1,
  50: -1,
  51: -1,
  52: -1,
  53: -1,
  54: -1,
  55: -1,
  56: -1,
  57: -1,
  58: -1,
  59: -1,
  60: -1,
  61: -1,
  62: -1,
  63: -1,
  64: -1,
  65: -1,
  66: -1,
  67: -1,
  68: -1,
  69: -1,
  70: -1,
  71: -1,
  72: -1,
  73: -1,
  74: -1,
  75: -1,
  76: -1,}
const updateAnsArray= (questionNumber, a ,b) =>{
  //anserArray[questionNumber].useState(5) 
}
const backbutton = (questionNumber) =>{
  if(questionNumber>0){
  setQNumber(questionNumber-1)
  console.log("Back ",questionNumber-1,":  ",anserArray[questionNumber-1])
  changeColor(anserArray[questionNumber-1])
  }
  //updateAnsArray(questionNumber,true,false)
}
  const nextbutton = (questionNumber)=>{
   
   // console.log(anserArray[questionNumber], " ", questionNumber)
    setQNumber(questionNumber+1)
    changeColor(anserArray[questionNumber+1])
   console.log("Front ",questionNumber+1,":  ",anserArray[questionNumber+1])
  }
  const changeColor = (yn) =>{
    if(yn == 5){
    console.log("Wow")
    }else if(yn == -1){
      setYSelected(false)
      setNSelected (false)
    }else if(yn == 1){
      setYSelected(true) 
      setNSelected (false)
    }else{
      setYSelected(false) 
      setNSelected (true)
    }
  }
//{questionArray[questionNumber]}
  return (
    <View style={styles.container}>
      <View style={addRestaurantStlye.textContainer}>
           <Text style = {addRestaurantStlye.questionText}>
              {questionArray[questionNumber]} 
            </Text>
      </View>
      <TouchableHighlight onPress={() => changeColor(1)} style={yselected ? [addRestaurantStlye.selectedbutton] : [styles.longbutton]}>
            <Text style = {styles.text}>
               Yes  
            </Text>
      </TouchableHighlight>  
      <TouchableHighlight onPress={() => changeColor(0)} style={nselected ? [addRestaurantStlye.selectedbutton] : [styles.longbutton]}>
            <Text style = {styles.text}>
               No  
            </Text>
      </TouchableHighlight>  
      <View style= {{height: 80,  width: '90%',  backgroundColor: "#19b194", flexDirection: 'row', alignItems: "center" }}>
       <TouchableHighlight onPress={() => backbutton(questionNumber)} style={styles.addrestbutton}>
            <Text style = {styles.text}>
               Back 
            </Text>
      </TouchableHighlight>   
       <TouchableHighlight onPress={() => nextbutton(questionNumber)} style={styles.addrestbutton}>
            <Text style = {styles.text}>
               Next  
            </Text>
      </TouchableHighlight>   
      </View>
      <TouchableHighlight onPress={() => finalsubmit(anserArray)} style={styles.longbutton}>
            <Text style = {styles.text}>
               Submit  
            </Text>
      </TouchableHighlight>   
    </View>

  );
}

const addRestaurantStlye= StyleSheet.create({
   selectedbutton: {
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 8,
    height: 40,
    width: '85%',
  },
   button: {
    backgroundColor: "#f0f3bd",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 8,
    height: 40,
    width: 180,
  },
  questionText:{
    fontSize: 20,
 },
  textContainer: {
  height: "30%",
  width: "85%", 
  backgroundColor: '#f0f3bd',
  },
  
});
