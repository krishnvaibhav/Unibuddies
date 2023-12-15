import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import personimg from "../assets/person.jpeg";
import { useNavigation } from "@react-navigation/native";

const OnBoardingScreen = () => {
  const navigate = useNavigation();
  return (
    <View className="flex items-center justify-around h-full">
      <View className="items-center justify-center flex">
        <Image
          source={personimg}
          className="rounded-full"
          style={{ width: 100, height: 100 }}
        />
        <Text className="font-semibold text-2xl mt-4">Unibuddies</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate.navigate("UserAuthScreen");
        }}
        className="m-3 p-3 rounded-full w-4/5 flex flex-row items-center justify-center"
        style={{ backgroundColor: "#27B4E4" }}
      >
        <Text className="text-white">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;
