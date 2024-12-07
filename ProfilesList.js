import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

const ProfilesList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Load users from AsyncStorage
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem('users');
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));  // Set state with users from AsyncStorage
        } else {
          // If no users found in AsyncStorage, use a sample list
          setUsers([]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    loadUsers();
  }, []);

  // Handle profile click
  const handleProfileClick = (user) => {
    navigation.navigate('ProfileDetails', { userData: user }); // Navigate to ProfileDetails with user data
  };

  if (loading) {
    // Show a loading indicator while data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor uses item id correctly
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.profileItem}
            onPress={() => handleProfileClick(item)} // Navigate to ProfileDetails with user data
          >
            <Text style={styles.profileName}>{`${item.firstName} ${item.lastName}`}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noDataText}>No users available</Text>} // Display message when no data
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4C6D7', // Background color for the screen
  },
  profileItem: {
    backgroundColor: '#000', // Black background for profile items
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  profileName: {
    color: '#fff', // White text for user names
    fontSize: 18,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center', // Center text for no data message
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4C6D7',
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
});

export default ProfilesList;
