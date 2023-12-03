import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5DC90',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Image
          style={{width: 120, height: 120, resizeMode: 'contain'}}
          source={require('../../assets/images/logo.png')}
        />
      </View>

      <View
        style={{
          height: '60%',
          width: '90%',
          // flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            fontFamily: 'Casual-Regular',
          }}>
          Who you wanna play againts?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            height: 150,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VsHuman');
            }}>
            <Image
              source={require('../../assets/icons/man.png')}
              style={{width: 120, height: 120}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VsComp');
            }}>
            <Image
              source={require('../../assets/icons/computer.png')}
              style={{width: 120, height: 120}}
            />
          </TouchableOpacity>
        </View>
      </View>
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
        <Text
          style={{
            fontSize: 22,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Casual-Regular',
          }}>
          TIC TAC TOE
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
