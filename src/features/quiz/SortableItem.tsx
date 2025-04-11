import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  clamp,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { SortableItemProps } from "@/src/types/quiz.types";
import { ITEM_HEIGHT } from "./QuizList";
import { theme } from "@/src/theme";

export const SortableItem: React.FC<SortableItemProps> = ({
  item,
  index,
  positions,
  dataLength,
  onSwap,
}) => {
  const isGestureActive = useSharedValue(false);
  const offsetY = useSharedValue(positions.value.indexOf(index) * ITEM_HEIGHT);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        isGestureActive.value = true;
        offsetY.value = positions.value.indexOf(index) * ITEM_HEIGHT;
      },
      onActive: (event) => {
        offsetY.value = event.absoluteY + ITEM_HEIGHT - 350;

        const newPosition = clamp(
          Math.floor(offsetY.value / ITEM_HEIGHT),
          0,
          dataLength - 1
        );

        const currentPosition = positions.value.indexOf(index);
        if (newPosition !== currentPosition) {
          runOnJS(onSwap)(currentPosition, newPosition);
        }
      },
      onEnd: () => {
        offsetY.value = withSpring(
          positions.value.indexOf(index) * ITEM_HEIGHT
        );
        isGestureActive.value = false;
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    const top = isGestureActive.value
      ? offsetY.value
      : withSpring(positions.value.indexOf(index) * ITEM_HEIGHT);

    return {
      position: "absolute",
      top,
      left: 0,
      right: 0,
      zIndex: isGestureActive.value ? 100 : 0,
      transform: [
        {
          scale: withSpring(isGestureActive.value ? 1.05 : 1),
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.itemContainer, animatedStyle]}>
        <Text style={styles.itemText}>{item.title}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: 70 - 10 ,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 8,
    justifyContent: "center",
    paddingLeft: 16,
    backgroundColor: theme.colors.surface,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
