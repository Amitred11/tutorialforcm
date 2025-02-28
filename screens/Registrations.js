import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function Registrations({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          'Necosmic': require('../assets/fonts/Necosmic.ttf'),
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Home"); 
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Home"); 
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.brand}>Fibear Network Tech.</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, isLogin && styles.activeTab]} onPress={() => !isLogin && toggleMode()}>
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, !isLogin && styles.activeTab]} onPress={() => isLogin && toggleMode()}>
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

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
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#777" />
      </TouchableOpacity>
    </View>
  </>
) : (
  <>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#777"
        value={fullName}
        onChangeText={setFullName}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Create Password"
        secureTextEntry={!showPassword}
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#777" />
      </TouchableOpacity>
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={!showConfirmPassword}
        placeholderTextColor="#777"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
        <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="#777" />
      </TouchableOpacity>
    </View>
  </>
)}
      
      <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
        <Animated.Text style={[styles.forgotPasswordText]}>Forgot Password</Animated.Text>
      </TouchableOpacity>

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
  input: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#007bff', marginBottom: 18, padding: 12, fontSize: 16, color: '#000' },
  button: { backgroundColor: '#007bff', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 25, width: '100%' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 18,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '20%',
    transform: [{ translateY: -12 }],
  },
  forgotPassword: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Necosmic',
  },
});

