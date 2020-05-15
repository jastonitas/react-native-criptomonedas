import React from 'react';
import {Text, StyleSheet, Platform, ColorPropType} from 'react-native';

const Header = () => {
  return (
    <>
      <Text style={styles.encabezado}>Criptomonedas</Text>
    </>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    fontFamily: 'Lato-Black',
    backgroundColor: '#808b97',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: "uppercase",
    fontSize: 20,
    color: '#fbfbfb',
    marginBottom: 30
  },
});

export default Header;
