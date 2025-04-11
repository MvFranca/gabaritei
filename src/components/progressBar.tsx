import React, { useEffect, useRef } from "react";
import { View, Animated, LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import { theme } from "@/src/theme";

type Props = {
  progress: number;
};

export function ProgressBar({ progress }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const width = useRef(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width.current],
    extrapolate: "clamp",
  });

  const onLayout = (event: LayoutChangeEvent) => {
    width.current = event.nativeEvent.layout.width;
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View style={[styles.fill, { width: animatedWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 25,
    height: 25,
    flex:1,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    overflow: "hidden",
    marginHorizontal: 16,
  },
  fill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
