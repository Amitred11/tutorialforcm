import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    if (fontLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [fontLoaded]);

  const handlePressIn = () => {
    Animated.spring(bounceAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => navigation.navigate('Registrations'));
  };

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Welcome to</Animated.Text>
      <Animated.Text style={[styles.companyName, { opacity: fadeAnim }]}>FIBEAR NETWORK TECHNOLOGIES CORP.</Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>Fast. Reliable. Unlimited.</Animated.Text>

      <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
        <TouchableOpacity
          style={[styles.button, { opacity: fadeAnim }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.buttonText ]}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Necosmic',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 28,
    color: '#007bff',
    textAlign: 'center',
    fontFamily: 'Necosmic',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
