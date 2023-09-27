// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login.tsx';
import AccountCreation from './pages/AccountCreation.tsx';
import HomePage from './pages/HomePage.js';
import ChatBot from './pages/ChatBot.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AccountCreation" component={AccountCreation} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ChatBot" component={ChatBot}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
