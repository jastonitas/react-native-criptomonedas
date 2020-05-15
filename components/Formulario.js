import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultaApi}) => {

  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    }

    consultarApi();
  }, []);

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
    console.log(moneda);
  }

  const obtenerCriptomoneda = (criptomoneda) => {
    setCriptomoneda(criptomoneda);
    console.log(criptomoneda);
  }

  const cotizarPrecio = () => {
    if (moneda === '' || criptomoneda === '') {
      mostrarAlerta();
    } else {
      console.log('valido...');
      setConsultaApi(true);
    }
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'Todos los campos son obligatorios',
      [
        {text: 'Ok'}
      ]
    );
  }

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        itemStyle='120'
        onValueChange={moneda => obtenerMoneda(moneda)}
      >
        <Picker.Item label="Seleccione..." value=""/>
        <Picker.Item label="Dolar de Estados Unidos" value="USD"/>
        <Picker.Item label="Peso Mexicano" value="MXN"/>
        <Picker.Item label="Euro" value="EUR"/>
        <Picker.Item label="Libra Esterlina" value="GBP"/>
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        itemStyle='120'
        onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)}
      >
        <Picker.Item label="Seleccione" value=""/>
        {criptomonedas.map(cripto => (
          <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btCotizar}
        onPress={() => cotizarPrecio()}
      >
        <Text style={styles.textCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btCotizar: {
    backgroundColor: '#78b7bb',
    padding: 10,
    marginTop: 20,
  },
  textCotizar: { 
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: "center",
  }
});
export default Formulario
