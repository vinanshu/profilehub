import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import BackgroundImage from './bg.jpg'; // Ensure the path is correct

const Home = ({ navigation }) => {
  return (
    <ImageBackground 
      source={BackgroundImage} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('AddUser')}
          >
            <Text style={styles.buttonText}>Add profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Profiles</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Email')} // Ensure Email screen exists
          >
            <Text style={styles.buttonText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // Adjust image scaling
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '130%',
    marginVertical: 20,
    flexWrap: 'wrap', // Allows buttons to wrap if space is limited
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:40,
    marginBottom:-50,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
