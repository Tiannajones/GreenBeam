import { StyleSheet, Text, View } from 'react-native';
import {styles} from './style.js';

import React from 'react';
/*<Text style = {helpS.text}>The world is experiencing many differing hardships in the modern era including the difficulty
of restaurant sustainability. Carbon footprint of food produced and not consumed in the world is
estimated at 3.3 GIGATONS of CO2. (3rd highest emitter if it was a country). Meal production is
responsible for 80% of deforestation, 70% of the consumption of fresh water, 30% of greenhouse
gas emissions, and being the most significant cause of a planet’s species biodiversity reduction.
    Once we recognized this problem we understood that there had to be others cognizant and
willing to make a difference to help solve this problem. We found that young consumers showed
that they tend to rely on the suggestions and reviews made available via the apps when making their
food decisions. This simple fact was the first step towards realizing that an app had the
potential to make a real difference in a world where ecofriendly sustainability is a rare commodity.
However, severe environmental problems, such as global warming, waste, and pollution, have
increased people's consciousness of the environment and of the need for actions based on
sustainability.
    Therefore we decided that a mobile application that helps you locate nearby restaurants based on
a sustainability rating would be a great way to inspire a time of thoughtful consideration for how
we approach supporting the food industry. We will be ranking these restaurants through a
sustainability rating based on a restaurants sustainability checklist created in a study made with
environmental experts. At its core Greenbeam is simply an app that strives to provide a holistic
informative view on all of the restaurants in the users area.
    While our original goal was to be able to apply the app to any location for any type of user we
eventually settled on focusing on the Georgetown area. This can be attributed to a number of factors
including, time constraints, api calls and simply the level of global integration difficulty. While
not being able to fully realize a global integration of the app was a bit frustrating for our team,
we decided to build the application in such a way that we could release future patches that include
area expansions. So while our current version lacks a massive location library, that does not mean
that the team has not thought of a future where that is possible.
 </Text>
 */

export default function AddRestrauntLoad() {
  return (
    <View style={styles.container}>
      <Text style={helpS.title}>
          Development Team:
      </Text>
      <Text style={helpS.text}>
          Carlos Esteban, 
          Jake Casazza, 
          Ethan Poe, 
          Tianna Jones, 
          Shane Philips 
      </Text>
      <Text style={helpS.title}>
        Known improvements
      </Text>
      <Text style={helpS.text}>
          Contact us at estebanr@southwestern.edu if you have an questions or concerns 
      </Text>
    </View>
  );
}

const helpS = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#fff',
    borderColor: 'black',
    fontFamily: 'Righteous-Regular',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    borderColor: 'black',
    fontFamily: 'Righteous-Regular',
    alignSelf: "flex-start"
  }, 
  
});