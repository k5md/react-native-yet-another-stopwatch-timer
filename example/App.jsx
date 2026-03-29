import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Stopwatch from './Stopwatch';
import Timer from './Timer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

const App = () => (
  <View style={[ styles.container, styles.body ]}>
    <ScrollView>
      <Stopwatch />
      <Timer />
    </ScrollView>
  </View>
);

export default App;


