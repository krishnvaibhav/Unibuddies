import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import personimg from "../assets/person.jpeg";
import { appContext } from "../Context/appContext";
import { doc, getDoc } from "firebase/firestore"; // Import the necessary Firestore functions
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { db } from "../firebase";

const MessageComponent = () => {
  const { data, user } = useContext(appContext);

  const [chating, setChating] = useState(false); // Updated state variable name

  const [connectionList, setConnectionList] = useState([]);
  const connections = data.connections;
  const userConnections = [];

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

  console.log("message");

  useEffect(() => {
    getConnectionData();
  }, []);

  return (
    <View>
      {!chating && (
        <ScrollView>
          {connectionList.map((el) => {
            return (
              <TouchableOpacity
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
                <View className="w-4/5 flex-row items-center justify-center">
                  <Text className="text-lg text-black font-bold ml-4">
                    {el[0].name}
                  </Text>
                  <Text className="text-lg text-black font-light ml-4">
                    {el[0].course}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {chating && <View></View>}
    </View>
  );
};

export default MessageComponent;
