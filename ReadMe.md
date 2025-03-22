# React Native Setup Guide  

This guide provides step-by-step instructions to set up a React Native development environment using Expo.  

---

## **Prerequisites**  

Before creating a React Native app, install the following:  

### **1. Install Visual Studio Code (VSCode)**  
- Download and install VSCode from [here](https://code.visualstudio.com/).  

### **2. Install Node.js**  
- Download and install Node.js from [here](https://nodejs.org/).  
- Verify installation by running:  
  ```sh
  node -v
  ```
  This should display the installed Node.js version.  

### **3. Install Expo CLI (Globally)**  
- Open a terminal and run:  
  ```sh
  npm install -g expo-cli
  ```
- Verify installation:  
  ```sh
  expo --version
  ```

---

## **Creating a New React Native App**  

Follow these steps to create your first React Native project:  

### **1. Create a Project Folder**  
- Open a terminal and navigate to the directory where you want to create the project.  
- Create a new folder:  
  ```sh
  mkdir MyReactNativeApp
  cd MyReactNativeApp
  ```

### **2. Create an Expo App**  
- Run the following command:  
  ```sh
  npx create-expo-app MyReactNativeApp --template blank
  ```
- This will set up a basic React Native project.  

### **3. Navigate into the Project**  
```sh
cd MyReactNativeApp
```

### **4. Start the Development Server**  
- Run the app using:  
  ```sh
  npm start
  ```
- This will open **Expo Developer Tools** in your browser.  

### **5. Run the App on a Device or Emulator**  
- **On a physical device** (Android/iOS):  
  - Install the **Expo Go** app from the Play Store or App Store.  
  - Scan the QR code displayed in the terminal or browser.  

- **On an Android Emulator**:  
  - Make sure you have **Android Studio** installed.  
  - Open the emulator and run:  
    ```sh
    npm run android
    ```

- **On an iOS Simulator** (Mac Only):  
  - Install **Xcode** and run:  
    ```sh
    npm run ios
    ```

---

## **Additional Commands**  

### **Run the App**  
```sh
npm start
```

### **Install Dependencies**  
```sh
npm install <package-name>
```

### **Build the App**  
```sh
npm run build
```

### **Stop the Development Server**  
Press `Ctrl + C` in the terminal.

---

## **Conclusion**  
Your React Native app is now set up! 🚀 Start coding and customizing your project.  

For more details, visit the [React Native documentation](https://reactnative.dev/).  
```

IN branch: master has the sample codes
