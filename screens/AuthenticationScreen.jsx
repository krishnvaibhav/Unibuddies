import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../components/CreateAccount";
import Login from "../components/Login";
import OtpComponent from "../components/OtpComponent";

const AuthenticationScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OtpComponent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationScreen;
