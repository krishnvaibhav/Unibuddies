import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import personimg from "../assets/person.jpeg";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { appContext } from "../Context/appContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const PersonalPage = () => {
  const { data, user } = useContext(appContext);
  const [isThoughts, setIsThoughts] = useState(true);
  const [isConnections, setIsConnections] = useState(false);
  const [isRequests, setIsRequests] = useState(false);
  const [requestsList, setRequestsList] = useState([]);
  const [connectionList, setConnectionList] = useState([]);
  const [thoughtsList, setThoughtsList] = useState([]);

  const requests = data.requests;
  const userRequests = [];

  const getData = async () => {
    for (const userId of requests) {
      if (userId !== "") {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            userRequests.push([docSnap.data(), userId]);
          } else {
            console.log(`User with ID ${userId} does not exist`);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    }
    setRequestsList(userRequests);
  };

  const connections = data.connections;
  const userConnections = [];

  const getThoughtsData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setThoughtsList(docSnap.data().thoughts);
      console.log(docSnap.data().thoughts);
    } else {
      console.log("No such document!");
    }
  };

  const getConnectionData = async () => {
    for (const userId of connections) {
      if (userId !== "") {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            userConnections.push([docSnap.data(), userId]);
          } else {
            console.log(`User with ID ${userId} does not exist`);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    }
    setConnectionList(userConnections);
  };

  const handleAccept = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const cureRef = doc(db, "users", user.uid);

      await updateDoc(docRef, {
        connections: arrayUnion(user.uid),
        requestSent: arrayRemove(user.uid),
      });

      await updateDoc(cureRef, {
        connections: arrayUnion(id),
        requests: arrayRemove(id),
      });
      getData();
      getConnectionData();
      alert("Accepted");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    getConnectionData();
    getThoughtsData();
  }, []);

  return (
    <View>
      <View className="flex flex-row items-center justify-around m-2">
        <TouchableOpacity
          className="m-3 items-center"
          onPress={() => {
            setIsThoughts(true);
            setIsConnections(false);
            setIsRequests(false);
            getThoughtsData();
          }}
        >
          <Text className="font-semibold">{thoughtsList.length}</Text>
          <Text className="font-semibold">Thoughts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="m-3 items-center"
          onPress={() => {
            setIsThoughts(false);
            setIsConnections(true);
            setIsRequests(false);
            getConnectionData();
          }}
        >
          <Text className="font-semibold">{connectionList.length}</Text>
          <Text className="font-semibold">Connections</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="m-3 items-center"
          onPress={() => {
            getData();
            setIsThoughts(false);
            setIsConnections(false);
            setIsRequests(true);
          }}
        >
          <Text className="font-semibold">{requestsList.length}</Text>
          <Text className="font-semibold">Requests</Text>
        </TouchableOpacity>
      </View>
      {isThoughts && (
        <ScrollView showsVerticalScrollIndicator={false} className="m-2 p-3">
          {thoughtsList.map((el) => {
            return (
              <View
                className="bg-slate-300 p-3 mt-2 mb-2"
                style={{
                  borderRadius: 20,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 0,
                }}
              >
                <Text>{el.thought}</Text>
                <Text className=" font-light mt-3">{el.date}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      {isConnections && (
        <ScrollView className="m-2 p-3">
          {connectionList.map((el) => (
            <View
              key={el[1]}
              className="bg-slate-300 m-2 p-3 rounded flex flex-row items-center"
            >
              <View>
                <Image
                  source={personimg}
                  className="rounded-full"
                  style={{ width: 70, height: 70 }}
                />
              </View>
              <View className=" w-4/5  flex row items-center justify-center">
                <Text className="text-lg text-black font-bold ml-4">
                  {el[0].name}
                </Text>
                <Text className="text-lg text-black font-light ml-4">
                  {el[0].course}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {isRequests && (
        <ScrollView className="m-2 p-3">
          {requestsList.map((el) => (
            <View
              key={el[1]} // Assuming each user has a unique ID
              className="bg-slate-300 m-2 p-3 rounded flex flex-row items-center justify-between"
            >
              <View className=" flex flex-row items-center">
                <View>
                  <Image
                    source={personimg}
                    className="rounded-full"
                    style={{ width: 70, height: 70 }}
                  />
                </View>
                <View className="">
                  <Text className="text-lg text-black font-bold ml-4">
                    {el[0].name}
                  </Text>
                  <Text className="text-lg text-black font-light ml-4">
                    {el[0].course}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row p-2">
                <TouchableOpacity
                  className="p-2 bg-green-200 rounded-full"
                  onPress={() => {
                    handleAccept(el[1]);
                  }}
                >
                  <AntDesign name="check" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 ml-2 bg-red-200 rounded-full">
                  <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PersonalPage;
