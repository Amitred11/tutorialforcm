import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Modal } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Bill({ navigation }) {
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Billing & Payments</Text>
          <TouchableOpacity onPress={() => alert('No new notifications')}>
            <Ionicons name="notifications" size={28} color="#fff" right = "-300%" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

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

      <ScrollView>
        <View style={styles.container}>
          {/* Billing Details */}
          <View style={styles.card}>
            <Text style={styles.title}>Current Bill</Text>
            <Text style={styles.usage}>Plan: <Text style={styles.highlight}>FiberX 500 Mbps</Text></Text>
            <Text style={styles.usage}>Billing Cycle: <Text style={styles.bold}>15th of Every Month</Text></Text>
            <Text style={styles.usage}>Amount Due: <Text style={styles.balance}>₱2,499</Text></Text>
            <Text style={styles.usage}>Due Date: <Text style={styles.warning}>March 15, 2025</Text></Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          
          {/* Payment Methods */}
          <View style={styles.quickActions}>
            {['Credit Card', 'Gcash', 'Bank Transfer'].map((text, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <MaterialIcons name={text === 'Credit Card' ? 'credit-card' : text === 'Gcash' ? 'account-balance-wallet' : 'account-balance'} size={28} color="#0044cc" />
                <Text style={styles.actionText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  
  header: { 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  headerContent: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 40
  },
  headerText: { 
    fontSize: 19, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 15
  },
  logo: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain', 
    borderRadius: 20,
    marginLeft: 10
  },
  
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12, 
    elevation: 5, 
    shadowColor: '#000', 
    marginBottom: 20 
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  usage: { fontSize: 14, color: '#555', marginTop: 5 },
  highlight: { color: '#0044cc', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  balance: { color: '#d9534f', fontWeight: 'bold' },
  warning: { color: '#f39c12', fontWeight: 'bold' },
  
  button: { backgroundColor: '#0044cc', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },

  quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  actionButton: { alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 3, width: 100 },
  actionText: { fontSize: 14, fontWeight: 'bold', marginTop: 5, color: '#0044cc' },
});