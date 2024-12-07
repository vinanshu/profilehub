import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ImageBackground } from 'react-native';
import BackgroundImage from './bg.jpg'; // Make sure this is the correct path to your image file

const Email = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const email = 'ProfileHub07@gmail.com';
    const subject = 'Message from App';
    const body = message;

    // Open the email client with prefilled details
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(mailtoUrl).catch((err) => console.error('Failed to open email app', err));
    
    setMessage(''); // Clear the input field
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.emailText}>ProfileHub07@gmail.com</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Type your message here"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // Ensure the background image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginTop:170,
  },
  emailText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff1493', // Pink color for the text
    marginBottom: 20,
    textShadowColor: '#000', // Black shadow for contrast
    textShadowOffset: { width: 2, height: 2 }, // Offset the shadow for better visibility
    textShadowRadius: 5, // Shadow softness
  },
  textInput: {
    height: 150,
    width: '100%',
    borderColor: '#000', // Changed border color to black
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#000', // Changed text color to black
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Email;
