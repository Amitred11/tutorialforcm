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


  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title ]}>
        Welcome to FIBEAR NETWORK TECHNOLOGIES CORP.
      </Animated.Text>

      <Text style={styles.subtitle}>Fast. Reliable. Unlimited.</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Registrations')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Necosmic', // Ensure this matches the loaded font
  },
  subtitle: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
