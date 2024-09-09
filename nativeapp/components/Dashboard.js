import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32, marginBottom: 60, marginTop: 60 }}>
          Welcome to your Dashboard!
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            style={styles.image}
            source={require('../assets/img9.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 0,
    resizeMode: 'cover',
  },
  sidebarItem: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  }
});
