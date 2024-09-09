import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { storeUser } from '../utils/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import axios from 'axios';

export default function SignupScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2024-06-14');
  const [gender, setGender] = useState('male');
  const [profilePicture, setProfilePicture] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactEmail, setEmergencyContactEmail] = useState('user@example.com');
  const [gymId, setGymId] = useState(0);

  const handleSignup = async () => {
    try {
      const user = { username, password, firstName, lastName, email, phone, address, city, state, pincode, country, dateOfBirth, gender, profilePicture, emergencyContactName, emergencyContactRelationship, emergencyContactPhone, emergencyContactEmail, gymId };
      const response = await axios.post('http://192.168.1.4:3000/api/signup/gymmember', user);

    if (response.status === 200) {
      Alert.alert('Signup successful');
      navigation.navigate('Login');
    } else {
      throw new Error('Failed to sign up');
    }
  } catch (error) {
    console.error('Error signing up', error);
    Alert.alert('Error', 'Failed to sign up. Please try again.');
  }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="form space-y-2">
            <Text className="text-black-700 ml-4">Username</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl mb-3"
              value={username}
              placeholder="Enter your username"
              onChangeText={setUsername}
            />
            <Text className="text-black-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              secureTextEntry
              value={password}
              placeholder="Enter password"
              onChangeText={setPassword}
            />
          </View>
        );
      case 2:
        return (
          <View className="form space-y-2">
            <Text className="text-black-700 ml-4">First Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl mb-3"
              value={firstName}
              placeholder="Enter your first name"
              onChangeText={setFirstName}
            />
            <Text className="text-black-700 ml-4">Last Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={lastName}
              placeholder="Enter your last name"
              onChangeText={setLastName}
            />
            <Text className="text-black-700 ml-4">Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl mb-3"
              value={email}
              placeholder="Enter your email address"
              onChangeText={setEmail}
            />
            <Text className="text-black-700 ml-4">Phone</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={phone}
              placeholder="Enter your phone number"
              onChangeText={setPhone}
            />
          </View>
        );
      case 3:
        return (
          <View className="form space-y-2">
            <Text className="text-black-700 ml-4">Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl mb-3"
              value={address}
              placeholder="Enter your address"
              onChangeText={setAddress}
            />
            <Text className="text-black-700 ml-4">City</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={city}
              placeholder="Enter your city"
              onChangeText={setCity}
            />
            <Text className="text-black-700 ml-4">State</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl mb-3"
              value={state}
              placeholder="Enter your state"
              onChangeText={setState}
            />
            <Text className="text-black-700 ml-4">Pincode</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={pincode}
              placeholder="Enter your pincode"
              onChangeText={setPincode}
            />
            <Text className="text-black-700 ml-4">Country</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={country}
              placeholder="Enter your country"
              onChangeText={setCountry}
            />
          </View>
        );
      case 4:
        return (
          <View className="form space-y-2">
            <Text className="text-black-700 ml-4">Emergency Contact Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl mb-3"
              value={emergencyContactName}
              placeholder="Enter emergency contact name"
              onChangeText={setEmergencyContactName}
            />
            <Text className="text-black-700 ml-4">Emergency Contact Relationship</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={emergencyContactRelationship}
              placeholder="Enter emergency contact relationship"
              onChangeText={setEmergencyContactRelationship}
            />
            <Text className="text-black-700 ml-4">Emergency Contact Phone</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={emergencyContactPhone}
              placeholder="Enter emergency contact phone"
              onChangeText={setEmergencyContactPhone}
            />
            <Text className="text-black-700 ml-4">Emergency Contact Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={emergencyContactEmail}
              placeholder="Enter emergency contact email"
              onChangeText={setEmergencyContactEmail}
            />
            <Text className="text-black-700 ml-4">Gym ID</Text>
            <TextInput
              className="p-4 bg-gray-100 text-black-700 rounded-2xl"
              value={gymId.toString()}
              placeholder="Enter gym ID"
              onChangeText={(text) => setGymId(parseInt(text))}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "black" }}>
      <SafeAreaView className="flex">
        <View className='flex-row justify-start'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-custom-red p-2 rounded-tr-2xl rounded-bl-2xl ml-4'>
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/img16.png')}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            {renderStep()}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              {currentStep > 1 && (
                <TouchableOpacity 
                  style={{ backgroundColor: '#FF6969', padding: 10, borderRadius: 10 }}
                  onPress={() => setCurrentStep(currentStep - 1)}
                >
                  <Text style={{ color: 'black' }}>Previous</Text>
                </TouchableOpacity>
              )}
              {currentStep < 4 ? (
                <TouchableOpacity 
                  style={{ backgroundColor: '#FF6969', padding: 10, borderRadius: 10 }}
                  onPress={() => setCurrentStep(currentStep + 1)}
                >
                  <Text style={{ color: 'black' }}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={{ backgroundColor: '#FF6969', padding: 10, borderRadius: 10 }}
                  onPress={handleSignup}
                >
                  <Text style={{ color: 'black' }}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
