import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, ScrollView, ActivityIndicator} from 'react-native';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import axios from 'axios';

/*
color palette
fbfbfb
fff1c1
78b7bb
808b97
*/

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultaApi, setConsultaApi] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultaApi) {
        setCargando(true);
        const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        console.log('url: ' + url);
        const resultado = await axios.get(url);
        console.log('respuesta: ' + resultado.data.DISPLAY[criptomoneda][moneda]);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        setConsultaApi(false);
        setCargando(false);
      }
    };
    cotizarCriptomoneda();
  }, [consultaApi]);

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />

        <View style={styles.contenido}>
          <Formulario 
            moneda={moneda} 
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultaApi={setConsultaApi}/>
        </View>
        <View style={{ marginTop: 40}}>
          { (cargando)? 
            <ActivityIndicator size="large"/>: 
            <Cotizacion resultado={resultado} />
          }
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%',
  }
});

export default App;
