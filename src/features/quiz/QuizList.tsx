import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSharedValue, runOnJS } from "react-native-reanimated";
import { StyleSheet, Dimensions } from "react-native";
import { Item } from "@/src/types/quiz.types";
import { SortableItem } from "./SortableItem";
import { theme } from "@/src/theme";
import { ProgressBar } from "@/src/components/progressBar";
import { useQuizOnboarding } from "@/src/hooks/onboarding/useQuizOnboarding";
import ErrorComponent from "@/src/components/error";

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");
export const ITEM_HEIGHT = 70;

export const QuizList = () => {
  const { data, error, handleGetQuestions, loading } = useQuizOnboarding();

  const [items, setItems] = useState<Item[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const positions = useSharedValue<number[]>([]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = data?.questions?.length || 1;
  const progress = (questionIndex + 1) / totalQuestions;

  useEffect(() => {
    handleGetQuestions();
  }, []);

  useEffect(() => {
    if (
      data?.questions?.length &&
      currentQuestionIndex < data.questions.length
    ) {
      const contents = data.questions[currentQuestionIndex].options;

      const mappedItems = contents.map((title: string, index: number) => ({
        key: String(index + 1),
        title,
      }));

      setItems(mappedItems);
      positions.value = mappedItems.map((_: string, i: number): number => i);
    }
  }, [data, currentQuestionIndex]);

  const move = (from: number, to: number) => {
    const newPositions = [...positions.value];
    const item = newPositions.splice(from, 1)[0];
    newPositions.splice(to, 0, item);
    positions.value = newPositions;
  };

  const getOrder = () => positions.value.map((i) => items[i].key);

  const handleNext = () => {
    console.log("Nova ordem:", getOrder());

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("Quiz finalizado");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorComponent/>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <Text style={styles.instructions}>
        Ordene os conteúdos que você tem mais dificuldade em{" "}
        <Text style={styles.question}>
          {data?.questions[questionIndex].name}
        </Text>
        .
      </Text>

      <View style={{ gap: 8, flexDirection: "row", paddingHorizontal: 16 }}>
        <View style={styles.positionsContainer}>
          {items.map((_, index: number) => (
            <View key={index} style={[styles.position]}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {items.map((item: Item, index: number) => (
            <SortableItem
              key={item.key}
              index={index}
              item={item}
              positions={positions}
              dataLength={items.length}
              onSwap={(from: number, to: number) => runOnJS(move)(from, to)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Nova ordem:", getOrder());
          if (questionIndex < totalQuestions - 1) {
            const nextOptions = data.questions[questionIndex + 1].options;
            const mappedItems = nextOptions.map(
              (title: string, index: number) => ({
                key: String(index + 1),
                title,
              })
            );

            setItems(mappedItems);
            positions.value = mappedItems.map((_: string, i: number): number => i);
            setQuestionIndex((prev) => prev + 1);
          } else {
            console.log("Fim do quiz");
          }
        }}
      >
        <Text style={styles.buttonText}>AVANÇAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingTop: 40,
    paddingBottom: 60,
  },
  positionsContainer: {
    width: 30,
    flexDirection: "column",
    gap: 10,
  },
  position: {
    width: 30,
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  question: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    height: 42,
    alignItems: "center",
    justifyContent: 'center',
    width: Dimensions.get("window").width - 32,
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
  },
});