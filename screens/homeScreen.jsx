import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { appContext } from "../Context/appContext";
import personimg from "../assets/person.jpeg";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeComponent from "../components/HomeComponent";
import ConnectComponent from "../components/ConnectComponent";
import MessageComponent from "../components/MessageComponent";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import ProfileComponent from "../components/ProfileComponent";
import PersonalPage from "../components/PersonalPage";

const HomeScreen = () => {
  const { user } = useContext(appContext);

  const Stack = createNativeStackNavigator();

  const { isKeyboardVisible } = useContext(appContext);

  const navigator = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {!isKeyboardVisible && (
        <View
          className="p-2 m-3 flex items-center justify-between flex-row"
          style={{
            flex: 0.12,
          }}
        >
          <Text
            onPress={() => {
              auth.signOut(auth.currentUser);
            }}
            className="italic font-bold text-lg"
          >
            Unibuddies
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("ProfileComponent");
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              className="rounded-full"
              source={personimg}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flex: 0.78 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeComponent"
            component={HomeComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConnectComponent"
            component={ConnectComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MessageComponent"
            component={MessageComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileComponent"
            component={ProfileComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalPage"
            component={PersonalPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
      {!isKeyboardVisible && (
        <View
          style={{
            flex: 0.1,
          }}
          className="flex items-center justify-around flex-row"
        >
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("HomeComponent");
            }}
          >
            <Entypo name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("ConnectComponent");
            }}
          >
            <FontAwesome5 name="user-friends" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("MessageComponent");
            }}
          >
            <Entypo name="chat" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("PersonalPage");
            }}
          >
            <Ionicons name="person" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
