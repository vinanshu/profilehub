import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

const AddUser = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    age: '',
    gender: '',
    bloodType: '',
    address: '',
    email: '',
    contactNumber: '',
    birthdate: '',
    birthPlace: '',
    mothersName: '',
    mothersContact: '',
    mothersAddress: '',
    fathersName: '',
    fathersContact: '',
    fathersAddress: '',
  });

  const [errors, setErrors] = useState({}); // To hold validation error messages

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field
  };

  const validateForm = () => {
    let validationErrors = {};
    // Check for empty fields
    for (const key in formData) {
      if (!formData[key].trim()) {
        validationErrors[key] = 'This field is required';
      }
    }

    // Validate age (should be a valid number)
    if (formData.age && isNaN(formData.age)) {
      validationErrors.age = 'Age should be a valid number';
    }

    // Validate contact number (should be exactly 11 digits)
    if (formData.contactNumber.length !== 11 || isNaN(formData.contactNumber)) {
      validationErrors.contactNumber = 'Contact number should be exactly 11 digits';
    }

    // Validate mothersContact (should be numeric and exactly 11 digits)
    if (formData.mothersContact.length !== 11 || isNaN(formData.mothersContact)) {
      validationErrors.mothersContact = 'Mother\'s contact number should be exactly 11 digits';
    }

    // Validate fathersContact (should be numeric and exactly 11 digits)
    if (formData.fathersContact.length !== 11 || isNaN(formData.fathersContact)) {
      validationErrors.fathersContact = 'Father\'s contact number should be exactly 11 digits';
    }

    // Validate email (should end with @gmail.com, @yahoo.com, or @hotmail.com)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      validationErrors.email = 'Email should be a valid Gmail, Yahoo, or Hotmail address';
    }

    setErrors(validationErrors);
    return validationErrors; // Return validation errors if any
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return; // If there are validation errors, don't submit the form
    }

    // Show confirmation dialog before saving
    Alert.alert(
      'Confirm',
      'Are you sure you want to save the information?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('User canceled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              // Retrieve existing users data from AsyncStorage
              const existingUsers = await AsyncStorage.getItem('users');
              const users = existingUsers ? JSON.parse(existingUsers) : [];

              // Add the new user data
              users.push(formData);

              // Save the updated users list back to AsyncStorage
              await AsyncStorage.setItem('users', JSON.stringify(users));

              // Navigate to Home screen after saving
              navigation.navigate('Home');  // Replace 'Home' with your actual home screen name
            } catch (error) {
              console.error('Error saving user data:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {Object.keys(formData).map((key, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </Text>
            <TextInput
              style={[styles.input, errors[key] && styles.inputError]}
              placeholder={key}
              value={formData[key]}
              onChangeText={(text) => handleChange(key, text)}
              keyboardType={
                key === 'age' || key === 'contactNumber' || key === 'mothersContact' || key === 'fathersContact'
                  ? 'numeric'
                  : 'default'
              }
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
          </View>
        ))}

        {/* Custom styled button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4C6D7', // Vintage pink background color
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F4C6D7', // Vintage pink background color
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',  // Bold font weight
    marginBottom: 5,
    color: '#333',  // Dark color for better visibility
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1A7B4', // Light vintage pink border color
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF', // White background for inputs
    color: '#333', // Text color
  },
  inputError: {
    borderColor: 'red', // Red border for error fields
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#000', // Black background for button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF', // White text for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddUser;
