import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import personimg from "../assets/person.jpeg";
import { useNavigation } from "@react-navigation/native";
import { EmailAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const credential = EmailAuthProvider.credential(email, password);
    const userCred = await signInWithCredential(auth, credential);
    const user = userCred.user;
  };

  const navigator = useNavigation();
  return (
    <View className="flex justify-evenly h-full">
      <View className="flex flex-row w-full justify-center items-center mt-4 pt-4">
        <Image
          source={personimg}
          className="rounded-full m-2"
          style={{ width: 50, height: 50 }}
        />
        <Text className="font-semibold text-2xl m-2">Unibuddies</Text>
      </View>
      <View className="mt-10 p-4 space-y-5">
        <TextInput
          placeholder="E-MAIL"
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
          keyboardType="email-address"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <TextInput
          placeholder="Password"
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
          value={password}
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
        <Text
          onPress={() => {
            navigator.navigate("CreateAccount");
          }}
          className="text-center"
          style={{ color: "#444BFF" }}
        >
          Dont Have an Account ? Sign Up
        </Text>
      </View>
      <View className="flex items-center justify-center ">
        <TouchableOpacity
          onPress={() => {
            handleSignIn();
          }}
          className="p-3 w-3/5 rounded-full"
          style={{ backgroundColor: "#27B4E4" }}
        >
          <Text className="text-center text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
