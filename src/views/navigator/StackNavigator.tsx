import { createStackNavigator } from '@react-navigation/stack';
import { HomeApp } from '../HomeApp/HomeApp';
import { PokemonScreen } from '../Pokemons/PokemonScreen';
import { SearchScreen } from '../search/SearchScreen';
import { LoginScreen } from '../auth';
import { PermissionScreen } from '../Permissions/PermissionScreen';


export type RootStackParams = {
  HomeApp: undefined; 
  LoginScreen: undefined
  PermissionScreen: undefined
  PokemonScreen: { pokemonId: number };
  SearchScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName='HomeApp'
        screenOptions={{
        headerShown: false,
        
      }}
    >     
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="HomeApp" component={ HomeApp } />
      <Stack.Screen name="PokemonScreen" component={ PokemonScreen } />
      <Stack.Screen name="SearchScreen" component={ SearchScreen } />      
      <Stack.Screen name="PermissionScreen" component={ PermissionScreen } />      
    </Stack.Navigator>
  );
}