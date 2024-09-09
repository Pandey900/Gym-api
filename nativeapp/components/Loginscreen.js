import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const Loginscreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.4:3000/api/login', {
        username,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      console.log("Login successful. Token:", token);
      navigation.navigate('Dashboard');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid username or password. Please try again.');
      } else {
        console.error('Error logging in:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#FF6969', padding: 8, borderTopRightRadius: 16, borderBottomLeftRadius: 16, marginLeft: 16 }}>
                <ArrowLeftIcon size="20" color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={require('../assets/img10.png')}
                style={{ width: 250, height: 250 }}
              />
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 32, paddingTop: 32, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#000', marginLeft: 16 }}>Email Address</Text>
              <TextInput
                style={{ padding: 16, backgroundColor: '#F3F3F3', color: '#000', borderRadius: 16, marginBottom: 16 }}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your email address"
              />
              <Text style={{ color: '#000', marginLeft: 16 }}>Password</Text>
              <TextInput
                style={{ padding: 16, backgroundColor: '#F3F3F3', color: '#000', borderRadius: 16, marginBottom: 10 }}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
              />
              <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontWeight: '600' }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
              <TouchableOpacity
                style={{ paddingVertical: 12, backgroundColor: '#FF6969', borderRadius: 16 }}
                onPress={handleSubmit}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Loginscreen;
