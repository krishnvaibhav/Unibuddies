import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import personimg from "../assets/person.jpeg";
import { appContext } from "../Context/appContext";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const ConnectComponent = () => {
  const { data, setData, user } = useContext(appContext);
  const [recommendations, setRecommendations] = useState([]);

  const calculateUserScore = (otherUser) => {
    let score = 0;

    for (const interest of data.interests) {
      if (otherUser.interests.includes(interest)) {
        score += 1;
      }
    }

    if (otherUser.state === data.state) {
      score += 5;
    }

    return score;
  };

  const getData = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("University", "==", data.University)
      );
      const result = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log("My data");
        if (
          doc.id !== user.uid &&
          !data.requestSent.includes(doc.id.trim()) &&
          !data.connections.includes(doc.id.trim())
        ) {
          result.push([doc.data(), doc.id]);
        }
      });

      setRecommendations(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnect = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const cureRef = doc(db, "users", user.uid);

      await updateDoc(docRef, {
        requests: arrayUnion(user.uid),
      });

      await updateDoc(cureRef, {
        requestSent: arrayUnion(id),
      });
      alert("Request sent");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex items-center justify-center">
        {recommendations.length === 0 && (
          <View className="">
            <Text className=" font-semibold text-lg">No Recomendations</Text>
          </View>
        )}
        {recommendations.map((el) => {
          return (
            <View
              key={el[1]}
              className="w-4/5 p-3 m-3 rounded-lg shadow-md bg-slate-200"
            >
              <View className="flex items-center justify-around">
                <Image
                  source={personimg}
                  style={{ width: 150, height: 150 }}
                  className="rounded-full m-2"
                />
                <Text className="font-bold text-xl m-2 p-2">{el[0].name}</Text>
              </View>
              <View>
                <Text className="text-center font-light">{el[0].course}</Text>
              </View>
              <View>
                <Text className="text-center font-light">{el[0].intake}</Text>
              </View>
              <View className="flex items-center justify-center">
                <TouchableOpacity
                  className="w-5/6 p-3 rounded m-4"
                  style={{ backgroundColor: "#27B4E4" }}
                  onPress={() => {
                    handleConnect(el[1]);
                  }}
                >
                  <Text className="text-center text-white">Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default ConnectComponent;
