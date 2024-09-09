import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.drawerInnerContent}>
        <Text style={styles.drawerTitle}>Menu</Text>
        <DrawerItem
          label="Profile"
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate('Profile')}
        />
        <DrawerItem
          label="Settings"
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Logout"
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'black',
  },
  drawerInnerContent: {
    paddingTop: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 16,
    color: 'white',
  },
  drawerItemLabel: {
    color: 'white',
  },
});
