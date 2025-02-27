import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebaseConfig';

export default function Account({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = (isOpen) => {
    setSidebarVisible(isOpen);
  };

  const handleLogout = () => {
    toggleSidebar(false);
    navigation.replace('Registrations');
  };

  return (
    <View style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0044cc" />
      
      {/* Header */}
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

      {/* Sidebar */}
      <Modal visible={sidebarVisible} transparent>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSidebarVisible(false)}>
          <View style={styles.sidebar}> 
            <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" left="86%" />
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Account Menu</Text>
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
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <Image source={require('../assets/profile.jpg')} style={styles.profilePic} />
          <Text style={styles.profileName}>{auth.currentUser.fullName}</Text>
          <Text style={styles.profileEmail}>{auth.currentUser.email}</Text>
        </View>
        
        {/* Account Details */}
        <View style={styles.card}>
          <Text style={styles.title}>Account Plan</Text>
          <Text style={styles.detail}>FiberX 500 Mbps</Text>
          <Text style={styles.detail}>Billing Cycle: 15th of Every Month</Text>
          <Text style={styles.detail}>Current Bill: <Text style={styles.balance}>₱2,499</Text></Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Billing Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  
  header: { paddingVertical: 20, paddingHorizontal: 20 },
  headerContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 40
  },
  headerText: { fontSize: 19, color: '#fff', fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-start' },
  sidebar: { width: '70%', backgroundColor: '#fff', height: '100%', padding: 20 },
  sidebarTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
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
});
