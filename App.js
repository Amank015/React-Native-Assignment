// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PaymentModeScreen from "./screens/PaymentModeScreen";
import HomeScreen from "./screens/HomeScreen";
import GenieScreen from "./screens/GenieScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="YoloPay" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="YoloPay" component={PaymentModeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Genie" component={GenieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
