import { useNavigation, useRoute } from "@react-navigation/native";
import {
  EmailAuthProvider,
  PhoneAuthProvider,
  linkWithCredential,
  signInWithCredential,
} from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const OTPInput = () => {
  const [otp, setOTP] = useState("");

  const navigator = useNavigation();
  const {
    verificationId,
    name,
    email,
    action,
    number,
    University,
    intake,
    password,
  } = useRoute().params;

  const handleInputChange = (text) => {
    if (text.length <= 6) {
      setOTP(text);
    }
  };

  const handleResendOTP = () => {
    // Implement resend OTP logic here
  };

  const handleSubmit = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCred = await signInWithCredential(auth, credential);
      const user = userCred.user;
      const emailCredential = EmailAuthProvider.credential(email, password);
      const emailData = await linkWithCredential(
        auth.currentUser,
        emailCredential
      );
      setDoc(doc(db, "users", user.uid), {
        name: name,
        number: "+91" + number,
        email: email,
        University: University,
        intake: intake,
        intrests: [],
        connections: [],
        requests: [],
        requestSent: [],
        course: "",
        originState: "",
        aboutme: "",
        recomendations: [],
        thoughts: [],
      });
      alert("Account created");
      navigator.navigate("DetailsScreen");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">OTP Verification</Text>
      <Text className="text-lg text-center mb-6">
        Enter the 6-digit OTP sent to your phone
      </Text>

      <View className="flex-row items-center justify-between w-full mb-6">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-3 text-lg text-center"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={handleInputChange}
        />
      </View>

      <TouchableOpacity className="mb-4" onPress={handleResendOTP}>
        <Text className="text-blue-500 text-lg">Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className=" py-4 px-12 rounded-lg"
        style={{ backgroundColor: "#27B4E4" }}
        onPress={handleSubmit}
      >
        <Text className="text-black text-xl  text-center">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPInput;
