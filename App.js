import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { AppProvider } from "./Context/appContext";
import Main from "./main";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={{ flex: 1 }}>
              <Main />
            </View>
          </KeyboardAvoidingView>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
