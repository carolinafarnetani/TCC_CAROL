import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AdicionarScreen from './screens/AdicionarScreen';
import IndexScreen from './screens/IndexScreen';

export type RootStackParamList = {
  Home: undefined;
  Adicionar: {
    editMode: boolean;
    produto?: {
      id: number;
      nome: string;
      checked: number;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
				<Stack.Screen 
          name="Inicio" 
          component={IndexScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Adicionar" 
          component={AdicionarScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
