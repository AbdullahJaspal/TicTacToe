import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/splash/splash';
import Welcome from '../screen/welcome/welcome';
import VsComp from '../screen/vsComp/vsComp';
import VsHuman from '../screen/vsHuman/vsHuman';

const MainNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="VsComp" component={VsComp} />
        <Stack.Screen name="VsHuman" component={VsHuman} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
