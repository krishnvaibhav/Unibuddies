import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { appContext } from "./Context/appContext";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import HomeScreen from "./screens/homeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { doc, getDoc } from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Main = () => {
  const Stack = createNativeStackNavigator();
  const [detailsFilled, setDetailsFilled] = useState(false);

  const { user, setUser, data, setData } = useContext(appContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userParams) => {
      if (userParams) {
        setUser(userParams);
        getData();
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, setUser]);

  const getData = async () => {
    try {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          setData(docSnap.data());
        }
        if (docSnap.data().aboutme === "") {
          setDetailsFilled(false);
        } else {
          setDetailsFilled(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack.Navigator>
      {!user && (
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
      )}
      {!user && (
        <Stack.Screen
          name="UserAuthScreen"
          component={AuthenticationScreen}
          options={{ headerShown: false }}
        />
      )}
      {user && (
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
      {user && !detailsFilled && (
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Main;
