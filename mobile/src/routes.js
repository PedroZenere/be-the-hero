import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './pages/Incidents';
import Details from './pages/Details';

const AppStack = createStackNavigator();

/**Esse headerShown desabilita o cabeçalho da pagina */
export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Details" component={Details} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}