import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function Registrations({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          'Necosmic': require('../assets/fonts/Necosmic.ttf'), // Ensure the path is correct
        });
        setFontLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error loading font:', error);
      }
    }
    loadFont();
  }, []);
  if (!fontLoaded) return null;


  const toggleMode = () => {
    Animated.timing(animatedValue, {
      toValue: isLogin ? 1 : 0,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start(() => {
      setIsLogin(!isLogin);
      animatedValue.setValue(0);
    });
  };

  // Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Home"); // Redirect after login
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      setIsLogin(true);
    } catch (error) {
      Alert.alert("Sign Up Failed");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.brand}>Fibear Network Tech.</Text>

      {/* Login/Sign Up Toggle */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, isLogin && styles.activeTab]} onPress={() => !isLogin && toggleMode()}>
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, !isLogin && styles.activeTab]} onPress={() => isLogin && toggleMode()}>
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Animated Form */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            transform: [
              { translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 30] }) },
              { scale: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) },
            ],
            opacity: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] }),
          },
        ]}
      >
        {isLogin ? (
          <>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#777" value={password} onChangeText={setPassword} />
          </>
        ) : (
          <>
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#777" value={fullName} onChangeText={setFullName} onBlur={() => updateProfile(auth.currentUser, { displayName: fullName })} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Create Password" secureTextEntry placeholderTextColor="#777" value={password} onChangeText={setPassword} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry placeholderTextColor="#777" value={password} onChangeText={setPassword} />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignUp}>
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f4f4f4' },
  backButton: { position: 'absolute', top: 70, left: 20, zIndex: 10 },
  tabContainer: { flexDirection: 'row', width: '90%', backgroundColor: '#ddd', borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  brand: { fontSize: 20, color: '#007bff', marginBottom: 20, fontFamily: 'Necosmic' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', backgroundColor: '#bbb' },
  activeTab: { backgroundColor: '#007bff' },
  tabText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  activeTabText: { color: '#fff' },
  formContainer: { width: '90%', backgroundColor: '#fff', padding: 25, borderRadius: 15, elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 4 }, shadowRadius: 5, alignItems: 'center' },
  input: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#007bff', marginBottom: 18, padding: 12, fontSize: 16, color: '#000', backgroundColor: '#f8f9fa', borderRadius: 8 },
  button: { backgroundColor: '#007bff', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 25, width: '100%', elevation: 3 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});

