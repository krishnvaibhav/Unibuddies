import { createContext, useEffect, useState } from "react";
import { Keyboard } from "react-native";

const appContext = createContext();

const AppProvider = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [user, setUser] = useState({});
  const [data, setData] = useState("");
  return (
    <appContext.Provider
      value={{ isKeyboardVisible, user, setUser, data, setData }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export { AppProvider, appContext };
