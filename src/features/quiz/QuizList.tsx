import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSharedValue, runOnJS } from "react-native-reanimated";
import { Item, OrderedAnswer } from "@/src/types/quiz.types";
import { theme } from "@/src/theme";
import { ProgressBar } from "@/src/components/progressBar";
import { useQuizOnboarding } from "@/src/hooks/onboarding/useQuizOnboarding";
import ErrorComponent from "@/src/components/error";
import { getOrderedTitles } from "@/src/domain/quiz/getOrderedTitles";
import { createAnswerEntry } from "@/src/domain/quiz/createAnswerEntry";
import { saveOrderedAnswer } from "@/src/domain/quiz/saveOrderedAnswer";
import { SortableItem } from "../../components/sortableItem";

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");
export const ITEM_HEIGHT = 70;

interface QuizProps {
  finished?: () => void;
}

export const QuizList: React.FC<QuizProps> = ({finished}) => {
  const { data, error, handleGetQuestions, loading } = useQuizOnboarding();

  const [items, setItems] = useState<Item[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const positions = useSharedValue<number[]>([]);
  const [orderedAnswers, setOrderedAnswers] = useState<OrderedAnswer[]>([]);

  const totalQuestions = data?.questions?.length || 1;
  const progress = (currentQuestionIndex + 1) / totalQuestions;

  useEffect(() => {
    handleGetQuestions();
  }, []);

  //lembrar de refatorar isso daqui
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
      positions.value = mappedItems.map((_: any, i: number): number => i);
    }
  }, [data, currentQuestionIndex]);

  const move = (from: number, to: number) => {
    const newPositions = [...positions.value];
    const item = newPositions.splice(from, 1)[0];
    newPositions.splice(to, 0, item);
    positions.value = newPositions;
  };

  const handleNext = () => {
    const currentQuestion = data.questions[currentQuestionIndex];
    const orderedTitles = getOrderedTitles(items, positions.value);
    const answerEntry = createAnswerEntry(currentQuestion.name, orderedTitles);
    const updatedAnswers = saveOrderedAnswer(orderedAnswers, answerEntry);
    setOrderedAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("Quiz finalizado");
      console.log("Respostas ordenadas:", updatedAnswers);
    }
  };

  const handleSwap = useCallback((from: number, to: number) => {
    runOnJS(move)(from, to);
  }, []);

  const questionText = useMemo(() => {
    return data?.questions[currentQuestionIndex].name;
  }, [data, currentQuestionIndex]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <Text style={styles.instructions}>
        Ordene os conteúdos que você tem mais dificuldade em{" "}
        <Text style={styles.question}>{questionText}</Text>.
      </Text>

      <View style={{ gap: 8, flexDirection: "row", paddingHorizontal: 16 }}>
        <View style={styles.positionsContainer}>
          {items.map((_, index) => (
            <View key={index} style={styles.position}>
              <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
                {index + 1}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flex: 1 }}>
          {items.map((item, index) => (
            <SortableItem
              key={item.key}
              index={index}
              item={item}
              positions={positions}
              dataLength={items.length}
              onSwap={(from, to) => handleSwap(from, to)}
            />
          ))}
        </View>
      </View>
      {currentQuestionIndex == totalQuestions - 1 ? (
        <TouchableOpacity style={styles.button} onPress={finished}>
          <Text style={styles.buttonText}>FINALIZAR</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            CONTINUAR
          </Text>
        </TouchableOpacity>
      )}
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
    justifyContent: "center",
    width: Dimensions.get("window").width - 32,
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
  },
});
