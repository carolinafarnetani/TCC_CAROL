import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import MesesScreen from './screens/MesesScreen';
import AdicionarScreen from './screens/AdicionarScreen';
import IndexScreen from './screens/IndexScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
			<SafeAreaView style={{ flex: 1 }}>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='Index'>
							<Stack.Screen name="Index" component={IndexScreen} />
							<Stack.Screen name="Home" component={HomeScreen} />
							<Stack.Screen name="Meses" component={MesesScreen} />
							<Stack.Screen name="Adicionar" component={AdicionarScreen} />
						</Stack.Navigator>
					</NavigationContainer>
					<StatusBar style="auto" />
			</SafeAreaView>
	);
}
