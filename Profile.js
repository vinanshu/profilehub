import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Profile = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem('users');
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers)); // Set users from AsyncStorage
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUsers();
  }, []);

  const handleViewProfile = (user, index) => {
    navigation.navigate('ProfileDetails', { userData: user, userIndex: index }); // Pass user data and index to ProfileDetails screen
  };

  const handleDeleteUser = (userIndex) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedUsers = users.filter((_, index) => index !== userIndex);
              setUsers(updatedUsers); // Update the local state
              await AsyncStorage.setItem('users', JSON.stringify(updatedUsers)); // Update AsyncStorage
            } catch (error) {
              console.error('Error deleting user:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {users.length === 0 ? (
        <Text style={styles.noDataText}>No users available</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.userItem}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => handleViewProfile(item, index)}
              >
                <Text style={styles.userText}>{`${item.firstName} ${item.lastName}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
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
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  userText: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d', // Red background for delete button
    padding: 3,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default Profile;
