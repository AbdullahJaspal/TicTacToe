import React from 'react';
import Splash from './src/screen/splash/splash';
import {SafeAreaView} from 'react-native';
import Welcome from './src/screen/welcome/welcome';
import VsHuman from './src/screen/vsHuman/vsHuman';
import VsComp from './src/screen/vsComp/vsComp';
import MainNav from './src/navigation/mainNav';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNav />
    </SafeAreaView>
  );
};
export default App;
