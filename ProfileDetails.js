import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

const ProfileDetails = ({ route, navigation }) => {
  const { userData, userIndex } = route.params; // Get the user data and the index passed from Profile

  // State to manage editing mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  // Function to handle input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function for Edit button
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save updated profile to AsyncStorage
  const handleSave = async () => {
    try {
      const savedUsers = await AsyncStorage.getItem('users');
      let users = savedUsers ? JSON.parse(savedUsers) : [];
  
      // Update the full profile
      users[userIndex] = formData;
  
      console.log("Saving updated user data:", users); // Debugging line to check the full data
  
      await AsyncStorage.setItem('users', JSON.stringify(users));
  
      Alert.alert("Profile Saved", "Your profile has been updated successfully!");
      setIsEditing(false); // Exit edit mode
      navigation.goBack(); // Go back to the Profile screen
  
    } catch (error) {
      console.error('Error saving profile: ', error);
      Alert.alert("Error", "There was an error saving your profile. Please try again.");
    }
  };

  // Function for Cancel button
  const handleCancel = () => {
    setFormData(userData); // Reset form data to original
    setIsEditing(false); // Exit edit mode
  };

  return (
    <ScrollView style={styles.container}>
      {/* Content section added here */}
      <View style={styles.contentSection}>
        <Text style={styles.contentText}>
          Welcome to your profile details! Here, you can view and update your personal information, including your name, contact details, and other essential data. Make sure your profile is up to date to keep your records accurate.
        </Text>
      </View>

      <Text style={styles.title}>User Details</Text>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          placeholder="First Name"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.middleName}
          onChangeText={(text) => handleChange('middleName', text)}
          placeholder="Middle Name"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="Age"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.gender}
          onChangeText={(text) => handleChange('gender', text)}
          placeholder="Gender"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.bloodType}
          onChangeText={(text) => handleChange('bloodType', text)}
          placeholder="Blood Type"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          placeholder="Address"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.contactNum}
          onChangeText={(text) => handleChange('contactNum', text)}
          placeholder="Contact Number"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.birthdate}
          onChangeText={(text) => handleChange('birthdate', text)}
          placeholder="Birth Date"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.birthPlace}
          onChangeText={(text) => handleChange('birthPlace', text)}
          placeholder="Birth Place"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.mothersName}
          onChangeText={(text) => handleChange('mothersName', text)}
          placeholder="Mother's Name"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.mothersContact}
          onChangeText={(text) => handleChange('mothersContact', text)}
          placeholder="Mother's Contact"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.mothersAddress}
          onChangeText={(text) => handleChange('mothersAddress', text)}
          placeholder="Mother's Address"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.fathersName}
          onChangeText={(text) => handleChange('fathersName', text)}
          placeholder="Father's Name"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.fathersContact}
          onChangeText={(text) => handleChange('fathersContact', text)}
          placeholder="Father's Contact"
        />
        <TextInput
          style={styles.infoText}
          editable={isEditing}
          value={formData.fathersAddress}
          onChangeText={(text) => handleChange('fathersAddress', text)}
          placeholder="Father's Address"
        />
      </View>

      <View style={styles.buttonContainer}>
        {!isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4C6D7', // Vintage light pink background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contentSection: {
    marginBottom: 20,
    paddingBottom: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1A7B4', // Light pink border for content section
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E1A7B4', // Light pink border
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000', // Black button background
    padding: 15,
    borderRadius: 5,
    width: '80%', // Adjust button width
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileDetails;
