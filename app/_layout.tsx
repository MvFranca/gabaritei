import { apolloClient } from "@/api/apollo";
import { ApolloProvider } from "@apollo/client";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

export default function RootLayout() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    };

    checkToken();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Slot />
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
