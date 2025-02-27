import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Modal, Image, Animated, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function TechnicalSupport({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [query, setQuery] = useState('');
  const slideAnim = useState(new Animated.Value(0))[0];

  const toggleSidebar = (isOpen) => {
    setSidebarVisible(isOpen);
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const submitQuery = () => {
    if (query.trim()) {
      alert('Your query has been submitted. We will get back to you soon!');
      setQuery('');
    } else {
      alert('Please enter your issue before submitting.');
    }
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
            <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Menu</Text>
            {[ 
              { icon: 'home', text: 'Home', onPress: () => navigation.navigate('Home') },
              { icon: 'account-circle', text: 'My Account', onPress: () => navigation.navigate('Account') },
              { icon: 'receipt', text: 'Billing & Payments', onPress: () => navigation.navigate('Bills') },
              { icon: 'build', text: 'Technical Support' },
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
      </ScrollView>
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
  sidebarTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  sidebarText: { fontSize: 16, marginLeft: 10 },
  
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
});