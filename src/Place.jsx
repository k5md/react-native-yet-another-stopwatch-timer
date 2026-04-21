import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Digit } from './Digit';

const styles = StyleSheet.create({
  place: {
    position: 'relative',
  },
  digit: {
    position: 'absolute',
  },
});

export const Place = ({ digit: actualDigit, style }) => {
  const range = useMemo(() => Array.from({ length: 10 }, (_, assignedDigit) =>
    (<Digit key={assignedDigit} assignedDigit={assignedDigit} actualDigit={actualDigit} style={[ assignedDigit && styles.digit, style?.digit ]} />)
  ), [ actualDigit, style ]);
  return (<View style={[ styles.place, style?.place ]}>{range}</View>);
};
