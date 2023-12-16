import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
// import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const {width, height} = Dimensions.get('screen');
const Welcome = ({navigation}) => {
  // const adUnitIdd = __DEV__
  //   ? TestIds.BANNER
  //   : Platform.OS === 'ios'
  //   ? 'ca-app-pub-1229777906283605/3655753522'
  //   : 'ca-app-pub-1229777906283605/9516215178';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAE093',
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
      {/* <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adUnitIdd}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          console.error('Advert failed to load: ', error);
        }}
      /> */}
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
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            height: width / 2.6,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VsHuman');
            }}>
            <Image
              source={require('../../assets/icons/man.png')}
              style={{
                width: width / 3,
                height: width / 3,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VsComp');
            }}>
            <Image
              source={require('../../assets/icons/computer.png')}
              style={{
                width: width / 3,
                height: width / 3,
                resizeMode: 'contain',
              }}
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
