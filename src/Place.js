import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Digit from './Digit';

const styles = StyleSheet.create({
  place: {
    position: 'relative',
  },
  digit: {
    position: 'absolute',
  },
});

export const Place = ({ value, style }) => {
  const range = useMemo(() => Array.from({ length: 10 }, (_, numeral) => 
    (<Digit key={numeral} numeral={numeral} value={value} style={[ numeral && styles.digit, style?.digit ]} />)
  ), [ value, style ]);
  return (<View style={[ styles.place, style?.place ]}>{range}</View>);
};

export default Place;
