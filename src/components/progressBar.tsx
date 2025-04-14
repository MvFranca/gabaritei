import React, { useEffect, useRef, useState } from "react";
import { View, Animated, LayoutChangeEvent, StyleSheet } from "react-native";
import { theme } from "@/src/theme";

type Props = {
  progress: number;
};

export function ProgressBar({ progress }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, containerWidth]);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View style={[styles.fill, { width: animatedWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 25,
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
