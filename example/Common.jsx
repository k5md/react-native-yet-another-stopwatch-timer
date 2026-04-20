import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: '2%',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export const Button = ({ label, onPress }) => (
  <TouchableOpacity style={[ styles.container, styles.button ]} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);
