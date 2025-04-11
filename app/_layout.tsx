import { apolloClient } from "@/src/api/apollo";
import { ApolloProvider } from "@apollo/client";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Slot />
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
