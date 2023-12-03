import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFE087',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: '100%', height: '50%', resizeMode: 'contain'}}
        source={require('../../assets/images/logo.png')}
      />
      <View
        style={{
          backgroundColor: '#735C00',
          height: 50,
          width: 220,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          position: 'absolute',
          top: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
          Tic Tac Toe
        </Text>
      </View>
    </View>
  );
};

export default Splash;
