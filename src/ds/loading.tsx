import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/loading.json")}
        autoPlay
        loop
        resizeMode="contain"
        style={{
          width: 250,
          height: 250,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  animation: {
    width: 200,
    height: 200,
    alignSelf: "center", // opcional
  },
});

export default Loading;
