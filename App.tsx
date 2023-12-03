import React from 'react';
import {SafeAreaView} from 'react-native';
import MainNav from './src/navigation/mainNav';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNav />
    </SafeAreaView>
  );
};
export default App;
