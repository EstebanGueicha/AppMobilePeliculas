import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import PerfilPli from '../Profe/ProfileMovie'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Search from '../Profe/SearchMovies';
import Reg from '../screens/Registrarse';
import CambioPass from '../screens/CambiarPass';
import YaLogin from '../screens/Yalogueado';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});




const HomeStack = createStackNavigator(
  {
    
    Home: HomeScreen,
    Registro: Reg,
    CambioPass: CambioPass,
    YaLoegueado:YaLogin,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person{focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
};

HomeStack.path = '';





const LinksStack = createStackNavigator(
  {
    Links: Search,
    Perfil: PerfilPli,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Buscar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

LinksStack.path = '';






const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
 
});

tabNavigator.path = '';

export default tabNavigator;
