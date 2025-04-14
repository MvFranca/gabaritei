import React, { memo, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  clamp,
  useDerivedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { SortableItemProps } from "@/src/types/quiz.types";
import { ITEM_HEIGHT } from "../features/quiz/QuizList";
import { theme } from "@/src/theme";

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
};

const SortableItemComponent: React.FC<SortableItemProps> = ({
  item,
  index,
  positions,
  dataLength,
  onSwap,
}) => {
  const isGestureActive = useSharedValue(false);
  const offsetY = useSharedValue(0);

  const positionIndex = useDerivedValue(() =>
    positions.value.findIndex(p => p === index)
  );

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        isGestureActive.value = true;
        offsetY.value = positionIndex.value * ITEM_HEIGHT;
      },
      onActive: (event) => {
        offsetY.value = clamp(event.absoluteY - 280, 0, ITEM_HEIGHT * (dataLength - 1));

        const newPosition = clamp(
          Math.floor(offsetY.value / ITEM_HEIGHT),
          0,
          dataLength - 1
        );

        const currentPosition = positionIndex.value;
        if (newPosition !== currentPosition) {
          runOnJS(onSwap)(currentPosition, newPosition);
        }
      },
      onEnd: () => {
        isGestureActive.value = false;
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    const top = isGestureActive.value
      ? offsetY.value
      : withSpring(positionIndex.value * ITEM_HEIGHT, SPRING_CONFIG);

    return {
      position: "absolute",
      top,
      left: 0,
      right: 0,
      zIndex: isGestureActive.value ? 100 : 0,
      transform: [
        {
          scale: withSpring(isGestureActive.value ? 1.05 : 1, SPRING_CONFIG),
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

export const SortableItem = memo(SortableItemComponent);

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: 60,
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
