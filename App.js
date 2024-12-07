import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import AddUser from './AddUser'; // Ensure this exists
import ProfilesList from './ProfilesList'; // Ensure this exists
import ProfileDetails from './ProfileDetails'; // Ensure this exists
import Profile from './Profile'; // Ensure this exists
import About from './About'; // Ensure this exists
import Email from './Email'; // Ensure this exists

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="ProfilesList" component={ProfilesList} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Email" component={Email} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
