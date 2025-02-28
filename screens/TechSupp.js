import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Modal, Image, Animated, TextInput, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebaseConfig';

export default function TechnicalSupport({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [query, setQuery] = useState('');
  const slideAnim = useState(new Animated.Value(0))[0];
  const [profileName] = useState(auth.currentUser?.displayName || 'User');
  const [profileEmail] = useState(auth.currentUser?.email || 'No email available');
  const [profileImage] = useState(require('../assets/profile.jpg'));
  const [supportModalVisible, setSupportModalVisible] = useState(false);

  const toggleSidebar = (isOpen) => {
    setSidebarVisible(isOpen);
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = () => {
    toggleSidebar(false);
    navigation.replace('Registrations');
  };

  const submitQuery = () => {
    if (query.trim()) {
      alert('Your query has been submitted. We will get back to you soon!');
      setQuery('');
    } else {
      alert('Please enter your issue before submitting.');
    }
  };

  // Customer Support Function
  const handleCustomerSupport = () => {
    setSupportModalVisible(true);
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
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.headerText}>Technical Support</Text>
          <TouchableOpacity onPress={() => alert('No new notifications')}>
            <Ionicons name="notifications" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Sidebar */}
      <Modal visible={sidebarVisible} transparent>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSidebarVisible(false)}>
          <View style={styles.sidebar}> 
            <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.close}>
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

      
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>How can we help you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe your issue..."
            multiline
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.button} onPress={submitQuery}>
            <Text style={styles.buttonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>

      <TouchableOpacity style={styles.supportButton} onPress={handleCustomerSupport}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={supportModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Customer Support</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('tel:+123456789')}>
              <Ionicons name="call" size={24} color="#0044cc" style={styles.optionIcon} />
              <Text style={styles.optionText}>Call Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('mailto:support@example.com')}>
              <Ionicons name="mail" size={24} color="#0044cc" style={styles.optionIcon} />
              <Text style={styles.optionText}>Email Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => alert('Live chat coming soon!')}>
              <Ionicons name="chatbubble" size={24} color="#0044cc" style={styles.optionIcon} />
              <Text style={styles.optionText}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSupportModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flexGrow: 1, padding: 20 },
  
  header: { 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  headerContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 40
  },
  headerText: { fontSize: 19, color: '#fff', fontWeight: 'bold' },
  logo: { width: 40, height: 40, resizeMode: 'contain', borderRadius: 20 },
  
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

  
  
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12, 
    elevation: 5, 
    shadowColor: '#000', 
    marginBottom: 20
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  input: { height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, textAlignVertical: 'top', backgroundColor: '#fff' },
  button: { backgroundColor: '#0044cc', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },

  supportButton: { backgroundColor: '#ff8800', padding: 15, borderRadius: 10, alignItems: 'center', width: '80%', alignSelf: 'center' },
  supportButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: '#fff', padding: 25, borderRadius: 12, width: '85%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  optionButton: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: '#e6e6e6', width: '100%', justifyContent: 'flex-start' },
  optionIcon: { marginRight: 10 },
  optionText: { fontSize: 16, color: '#333', fontWeight: '500' },
  closeButton: { marginTop: 15, padding: 12, backgroundColor: '#ff4444', borderRadius: 8, width: '100%', alignItems: 'center' },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});