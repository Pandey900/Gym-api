import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './components/Loginscreen';
import SignupScreen from './components/signupscreen';
import HomeScreen from './components/HomeScreen';
import Dashboard from './components/Dashboard';
import CustomDrawerContent from './components/CustomDrawerContent'; // Import the custom drawer component

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DashboardDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="DashboardMain"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        drawerStyle: { backgroundColor: 'black' },
        drawerIcon: ({ color, size }) => (
          <Ionicons name="menu" size={size} color="white" />
        ),
      }}
    >
      <Drawer.Screen
        name="DashboardMain"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color="white" />
          ),
        }}
      />
      {/* Add more drawer items here with appropriate icons */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
