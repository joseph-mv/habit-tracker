import { persistor, store } from "@/src/store";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor} >
      <Stack />
      </PersistGate>
    </Provider>
  );
}
