import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../Context/appContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const DetailsScreen = () => {
  const { user, setUser, data, setData } = useContext(appContext);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const navigator = useNavigation();

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const checkedInterests = [];
      if (checked1) {
        checkedInterests.push("Sports");
      }
      if (checked2) {
        checkedInterests.push("Gaming");
      }
      if (checked3) {
        checkedInterests.push("Travel");
      }
      if (checked4) {
        checkedInterests.push("Coding");
      }
      if (checked5) {
        checkedInterests.push("Music");
      }
      if (checked6) {
        checkedInterests.push("Dance");
      }
      await updateDoc(docRef, {
        aboutme: aboutMe,
        course: course,
        originState: state,
        intrests: checkedInterests,
      });
      navigator.navigate("HomeScreen");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, margin: 25 }}>
      {data && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Hello {data.name}
            </Text>
            <Text style={{ marginTop: 10, textAlign: "center" }}>
              Please fill out the following details so we can get to know you
              better
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>
              INTERESTS
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setChecked1(!checked1)}
                style={[
                  styles.interestButton,
                  {
                    backgroundColor: checked1
                      ? "#27B4E4"
                      : "rgb(226, 232, 240)",
                  },
                ]}
              >
                <Text>Sports</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChecked2(!checked2)}
                style={[
                  styles.interestButton,
                  {
                    backgroundColor: checked2
                      ? "#27B4E4"
                      : "rgb(226, 232, 240)",
                  },
                ]}
              >
                <Text>Gaming</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChecked3(!checked3)}
                style={[
                  styles.interestButton,
                  {
                    backgroundColor: checked3
                      ? "#27B4E4"
                      : "rgb(226, 232, 240)",
                  },
                ]}
              >
                <Text>Travel</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setChecked4(!checked4)}
                style={[
                  styles.interestButton,
                  {
                    backgroundColor: checked4
                      ? "#27B4E4"
                      : "rgb(226, 232, 240)",
                  },
                ]}
              >
                <Text>Coding</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChecked5(!checked5)}
                style={[
                  styles.interestButton,
                  {
                    backgroundColor: checked5
                      ? "#27B4E4"
                      : "rgb(226, 232, 240)",
                  },
                ]}
              >
                <Text>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChecked6(!checked6)}
                style={[
                  styles.interestButton,
                  {
                    backgroundColor: checked6
                      ? "#27B4E4"
                      : "rgb(226, 232, 240)",
                  },
                ]}
              >
                <Text>Dance</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-2">
            <Text style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>
              DETAILS
            </Text>
            <View style={styles.stateInputContainer}>
              <TextInput
                style={styles.stateInput}
                value={state}
                onChangeText={setState}
                placeholder="Enter your state"
              />
            </View>
            <View style={styles.stateInputContainer}>
              <TextInput
                style={styles.stateInput}
                value={course}
                onChangeText={setCourse}
                placeholder="Enter your Course"
              />
            </View>
          </View>
          <View style={styles.stateInputContainer}>
            <TextInput
              numberOfLines={6}
              multiline
              value={aboutMe}
              onChangeText={(e) => {
                setAboutMe(e);
              }}
              placeholder="About yoursef"
              style={styles.stateInput}
            ></TextInput>
          </View>
          <View className="mt-3">
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              className=" p-3 rounded m-4"
              style={{ backgroundColor: "#27B4E4" }}
            >
              <Text className="text-center text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = {
  interestButton: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 4,
  },

  stateInputContainer: {
    margin: 10,
  },
  stateInputLabel: {
    fontSize: 16,
  },
  stateInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    padding: 10,
  },
};

export default DetailsScreen;
