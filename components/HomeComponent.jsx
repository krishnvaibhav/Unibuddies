import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import personimg from "../assets/person.jpeg";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { appContext } from "../Context/appContext";

const HomeComponent = () => {
  const { data, user } = useContext(appContext);
  const [post, setPost] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  const getData = async () => {
    const q = query(
      collection(db, "thoughts"),
      where("University", "==", data.University)
    );

    const result = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push([doc.id, doc.data()]);
    });
    setThoughts(result);
  };

  useEffect(() => {
    getData();
  });

  const [input, setInput] = useState("");
  const handlePost = async () => {
    try {
      const docRef = await addDoc(collection(db, "thoughts"), {
        name: data.name,
        University: data.University,
        thought: input,
        date: new Date().toLocaleString(),
        uid: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      const updateRef = doc(db, "users", user.uid);

      await updateDoc(updateRef, {
        thoughts: arrayUnion({
          date: new Date().toLocaleString(),
          thought: input,
        }),
      });
      alert("Successfully Posted!");
      setPost(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      {post && (
        <View className="flex items-center justify-center w-full h-full">
          <Text className="font-bold text-lg">Enter your Thoughts</Text>
          <TextInput
            value={input}
            onChangeText={(e) => {
              setInput(e);
            }}
            multiline
            numberOfLines={5}
            style={{
              width: "80%",
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 15,
              padding: 10,
            }}
            className="m-2 p-2"
          />
          <TouchableOpacity
            onPress={() => {
              handlePost();
            }}
            className="m-3 p-3 w-1/4 rounded-xl"
            style={{ backgroundColor: "#27B4E4" }}
          >
            <Text className="p-1 text-md text-center text-white">Post</Text>
          </TouchableOpacity>
        </View>
      )}
      {!post && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {thoughts.map((thought) => {
            return (
              <View className="m-3 p-3 flex  items-center justify-center bg-slate-200 rounded-lg">
                <View className="flex flex-row items-center justify-between w-full">
                  <Image
                    source={personimg}
                    style={{ width: 60, height: 60 }}
                    className="rounded-full"
                  />
                  <View>
                    <Text className="font-semibold text-lg">
                      {thought[1].name}
                    </Text>
                  </View>
                </View>
                <View className="mt-3">
                  <Text className="text-lg">{thought[1].thought}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.stickyBtn}
        onPress={() => {
          post === true ? setPost(false) : setPost(true);
        }}
        activeOpacity={0.7}
        className="m-2"
      >
        {post === true ? (
          <Feather name="minus" size={34} color="white" />
        ) : (
          <Ionicons name="add" size={34} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyBtn: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: "#27B4E4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeComponent;
