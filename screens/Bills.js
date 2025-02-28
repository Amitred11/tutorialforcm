import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Modal, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebaseConfig';

export default function Bill({ navigation }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [profileName] = useState(auth.currentUser?.displayName || 'User');
    const [profileEmail] = useState(auth.currentUser?.email || 'No email available');
    const [profileImage] = useState(require('../assets/profile.jpg'));

    const historyData = [
      { id: 1, date: 'Jan 15, 2024', amount: '₱2,499', status: 'Paid' },
      { id: 2, date: 'Dec 15, 2023', amount: '₱2,499', status: 'Paid' },
      { id: 3, date: 'Nov 15, 2023', amount: '₱2,499', status: 'Paid' },
    ];
  

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
        
        <View style={styles.historyContainer}>
        <Text style={styles.historytitle}>Billing History</Text>
        {historyData.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={[styles.status, item.status === 'Paid' ? styles.paid : styles.unpaid]}>
              {item.status}
            </Text>
          </View>
        ))}
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

  historyContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 15, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 4, 
    elevation: 5,
    width: "90%",
    alignSelf: 'center'
  },
  historytitle: { 
    fontSize: 30, 
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  historyItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  date: { 
    fontSize: 16, 
    color: '#333' 
  },
  amount: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  status: { 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  paid: { 
    color: '#28a745' 
  },
  unpaid: { 
    color: '#d9534f' 
  }
});