import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

// Import the background image
import BackgroundImage from './bg.jpg'; // Adjust path if needed

const About = () => {
  return (
    <ImageBackground 
      source={BackgroundImage} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>About Our App</Text>
          <Text style={styles.description}>
            Our Profile Hub is a cutting-edge tool designed to simplify and enhance persona profiling.
            By seamlessly gathering, organizing, and managing user data, the app empowers individuals and organizations
            to create comprehensive user profiles with ease.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Style for the background image
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // Ensures the image scales correctly
  },
  // Container for the scrollable content
  container: {
    flexGrow: 1,
    paddingHorizontal: 10, // Padding on the sides
    paddingVertical: 250, // Padding on the top and bottom
    marginTop:100,
  },
  // Content section with centered text
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Padding for the content
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
    borderRadius: 10, // Rounded corners
    borderWidth: 2, // Black border
    borderColor: 'black', // Black border color
  },
  // Title text style
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  // Description text style
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default About;
