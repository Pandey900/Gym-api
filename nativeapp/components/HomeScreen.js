import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Color from './Color';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/img20.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>
            
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.signupText}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    paddingBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '90%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: Color.primary,
    paddingVertical: 12,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: 'gray',
    fontWeight: '600',
    marginLeft: 5,
  },
});
