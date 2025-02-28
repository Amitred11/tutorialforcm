import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image, Modal, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

export default function Account({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [profileName, setProfileName] = useState(auth.currentUser?.displayName || 'User');
  const [profileEmail] = useState(auth.currentUser?.email || 'No email available');
  const [profileImage, setProfileImage] = useState(require('../assets/profile.jpg'));
  const [newProfileName, setNewProfileName] = useState(profileName);

  const toggleSidebar = (isOpen) => {
    setSidebarVisible(isOpen);
  };

  const handleLogout = async () => {
    try {
      toggleSidebar(false);
      await auth.signOut();
      navigation.replace('Registrations');
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  const handleBillingDetails = () => {
    navigation.navigate('Bills');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE], // Updated API usage
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled && result.assets?.length > 0) {
      setProfileImage({ uri: result.assets[0].uri }); // Corrected access to image URI
    }
  };
  

  const handleSaveProfile = () => {
    setProfileName(newProfileName); // Correctly update profile name
    setEditProfileVisible(false);
  };
  

  return (
    <View style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0044cc" />
      
      <LinearGradient colors={['#0044cc', '#002b80']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => toggleSidebar(true)}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Account</Text>
          <TouchableOpacity onPress={() => alert('No new notifications')}>
            <Ionicons name="notifications" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal visible={sidebarVisible} transparent>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSidebarVisible(false)}>
          <View style={styles.sidebar}> 
            <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" left="86%" />
            </TouchableOpacity>
            <View style={styles.sidebarProfile}>
              <Image source={profileImage} style={styles.sidebarProfilePic} />
              <Text style={styles.sidebarProfileName}>{profileName}</Text>
              <Text style={styles.sidebarProfileEmail}>{profileEmail}</Text>
            </View>
            {[ 
              { icon: 'home', text: 'Home', onPress: () => navigation.navigate('Home') },
              { icon: 'account-circle', text: 'My Account', onPress: () => navigation.navigate('Account') },
              { icon: 'receipt', text: 'Billing & Payments', onPress: () => navigation.navigate('Bills') },
              { icon: 'build', text: 'Technical Support', onPress: () => navigation.navigate('TechSupp') },
              { icon: 'logout', text: 'Logout', onPress: handleLogout }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.sidebarItem} onPress={item.onPress}>
                <MaterialIcons name={item.icon} size={24} color="#333" />
                <Text style={styles.sidebarText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={profileImage} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.profileEmail}>{profileEmail}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setEditProfileVisible(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Account Plan</Text>
          <Text style={styles.detail}>FiberX 500 Mbps</Text>
          <Text style={styles.detail}>Billing Cycle: 15th of Every Month</Text>
          <Text style={styles.detail}>Current Bill: <Text style={styles.balance}>₱2,499</Text></Text>
          <TouchableOpacity style={styles.button} onPress={handleBillingDetails}>
            <Text style={styles.buttonText}>View Billing History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={editProfileVisible} transparent animationType="slide">
        <View style={styles.modalContainers}>
          <View style={styles.modalContents}>
            <Text style={styles.modalTitles}>Edit Profile</Text>
            <TextInput style={styles.input} value={newProfileName} onChangeText={setNewProfileName} placeholder="Enter new name" />
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
  <Text style={styles.buttonText}>Change Profile Picture</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
  <Text style={styles.buttonText}>Save</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.cancelButton} onPress={() => setEditProfileVisible(false)}>
  <Text style={styles.cancelButtonText}>Cancel</Text>
</TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  
);
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f4f4f4' },
  darkContainer: { backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { paddingVertical: 20, paddingHorizontal: 20 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: StatusBar.currentHeight || 40 },
  headerText: { fontSize: 19, color: '#fff', fontWeight: 'bold' },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10 },
  closeButton: { marginTop: 10 },
  closeButtonText: { color: '#d9534f', fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-start' },
  sidebar: { width: '70%', backgroundColor: '#fff', height: '100%', padding: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  sidebarProfile: { alignItems: 'center', marginBottom: 20 },
  sidebarProfilePic: { width: 60, height: 60, borderRadius: 30 },
  sidebarProfileName: { fontSize: 16, fontWeight: 'bold' },
  sidebarProfileEmail: { fontSize: 14, color: '#555' },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  sidebarText: { fontSize: 16, marginLeft: 10 },
  profileCard: { alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 },
  profilePic: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileName: { fontSize: 18, fontWeight: 'bold' },
  profileEmail: { fontSize: 14, color: '#555' },

  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 5, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  detail: { fontSize: 14, color: '#555', marginTop: 5 },
  balance: { color: '#d9534f', fontWeight: 'bold' },

  button: { backgroundColor: '#0044cc', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },

  modalContainers: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContents: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 20, alignItems: 'center' },
  modalTitles: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  imagePickerButton: {
    backgroundColor: '#007bff', // Blue for action
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  saveButton: {
    backgroundColor: '#007bff', // Green for saving
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  cancelButton: {
    backgroundColor: 'transparent', // Transparent for a clean look
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  cancelButtonText: {
    color: '#d9534f', // Red for cancel action
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
