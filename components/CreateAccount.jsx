import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import personimg from "../assets/person.jpeg";
import { appContext } from "../Context/appContext";
import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig, auth } from "../firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const CreateAccount = () => {
  const navigator = useNavigation();

  const API_KEY = "AIzaSyDesOie1K0-Ho2y_Aj35-FNI8L2Jk8P-qg";

  const { isKeyboardVisible } = useContext(appContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [University, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [intake, setIntake] = useState("");
  const recaptchaVerifier = useRef(null);

  const handleCreateAccount = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + number,
        recaptchaVerifier.current
      );
      const verificationId = confirmationResult.verificationId;
      navigator.navigate("OTP", {
        action: "signIn",
        verificationId: verificationId,
        name: name,
        number: number,
        University: University,
        intake: intake,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err + "err");
    }
  };

  return (
    <View className="flex justify-evenly h-full">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      {!isKeyboardVisible && (
        <View className="flex flex-row w-full justify-center items-center mt-4 pt-4">
          <Image
            source={personimg}
            className="rounded-full m-2"
            style={{ width: 50, height: 50 }}
          />
          <Text className="font-semibold text-2xl m-2">Unibuddies</Text>
        </View>
      )}
      <View className="mt-10 p-4 space-y-5">
        <TextInput
          placeholder="FULL NAME"
          value={name}
          onChangeText={(e) => {
            setName(e);
          }}
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
          autoComplete="name"
        />
        <TextInput
          placeholder="E-MAIL"
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
          keyboardType="email-address"
          inputMode="email"
          autoComplete="email"
        />
        <TextInput
          placeholder="PHONE NUMBER"
          value={number}
          onChangeText={(e) => {
            setNumber(e);
          }}
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
          keyboardType="phone-pad"
          inputMode="tel"
          autoComplete="tel"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(e) => {
            setPassword(e);
          }}
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
        />
        <View
          className="w-auto px-5 rounded-full"
          style={{ backgroundColor: "#F0F0f0" }}
        >
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                backgroundColor: "#F0F0f0",
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setUniversity(data.description);
            }}
            minLength={2}
            enablePoweredByContainer={false}
            query={{
              key: API_KEY,
              language: "en",
              type: "university",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Enter University"
          />
        </View>

        <TextInput
          value={intake}
          onChangeText={(e) => {
            setIntake(e);
          }}
          placeholder="Intake Year"
          className=" h-12 w-auto px-8 rounded-full"
          style={{
            backgroundColor: "#F0F0f0",
          }}
        />

        <Text
          onPress={() => {
            navigator.navigate("Login");
          }}
          className="text-center"
          style={{ color: "#444BFF" }}
        >
          Already Have an Account ? Sign In
        </Text>
      </View>
      {!isKeyboardVisible && (
        <View className="flex items-center justify-center ">
          <TouchableOpacity
            onPress={() => {
              handleCreateAccount();
            }}
            className="p-3 w-3/5 rounded-full"
            style={{ backgroundColor: "#27B4E4" }}
          >
            <Text className="text-center text-white ">Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CreateAccount;
