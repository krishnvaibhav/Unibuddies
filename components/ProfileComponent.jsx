import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import personimg from "../assets/person.jpeg";
import { FontAwesome5 } from "@expo/vector-icons";
import { appContext } from "../Context/appContext";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ProfileComponent = () => {
  const [name, setName] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState(null);
  const { isKeyboardVisible } = useContext(appContext);
  const getData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
      setName(docSnap.data().name);
      setAboutme(docSnap.data().aboutme);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(docRef, {
      name: name,
      aboutme: aboutme,
    });
  };

  return (
    <View className="flex items-center justify-around">
      {data && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center justify-center">
            {!isKeyboardVisible && (
              <Image
                source={personimg}
                className="rounded-full"
                style={{ width: 110, height: 110 }}
              />
            )}
          </View>
          <View className="w-full flex items-center justify-center pb-5 pt-5  mt-4">
            <View className="w-4/5 mt-3">
              <Text style={{ color: "#27B4E4" }}>University</Text>
              <TextInput
                editable={editable}
                style={styles.textInput}
                value={data.University}
                placeholder="Enter University"
              ></TextInput>
            </View>
            <View className="w-4/5 mt-3">
              <Text style={{ color: "#27B4E4" }}>Name</Text>
              <TextInput
                editable={editable}
                style={styles.textInput}
                value={name}
                onChangeText={(e) => {
                  setName(e);
                }}
                placeholder="Enter Name"
              ></TextInput>
            </View>
            <View className="w-4/5 mt-3">
              <Text style={{ color: "#27B4E4" }}>Email</Text>
              <TextInput
                editable={editable}
                style={styles.textInput}
                value={data.email}
                placeholder="Enter Email"
              ></TextInput>
            </View>
            <View className="w-4/5 mt-3">
              <Text style={{ color: "#27B4E4" }}>Number</Text>
              <TextInput
                editable={editable}
                style={styles.textInput}
                value={data.number}
                placeholder="Enter Email"
              ></TextInput>
            </View>
            <View className="w-4/5 mt-3">
              <Text style={{ color: "#27B4E4" }}>About Yourself</Text>
              <TextInput
                editable={editable}
                value={aboutme}
                multiline={true}
                numberOfLines={4}
                style={styles.textInput}
                onChangeText={(e) => {
                  if (e.length < 251) {
                    setAboutme(e);
                  }
                }}
              />
            </View>
          </View>
          {!isKeyboardVisible && (
            <View className="flex items-center justify-center  mb-4 mt-4 w-full p-4">
              {editable === false && (
                <TouchableOpacity
                  onPress={() => {
                    setEditable(true);
                  }}
                  className=" w-2/5 p-3 rounded-full mt-4 "
                  style={{ backgroundColor: "#27B4E4" }}
                >
                  <Text className="text-center text-white">Update</Text>
                </TouchableOpacity>
              )}
              {editable === true && (
                <TouchableOpacity
                  onPress={() => {
                    setEditable(false);
                    updateData();
                  }}
                  className=" w-2/5 p-3 rounded-full mt-4 "
                  style={{ backgroundColor: "#27B4E4" }}
                >
                  <Text className="text-center text-white">Confirm</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  textInput: {
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#27B4E4",
    paddingVertical: 5,
  },
});
