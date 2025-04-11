import { QuizHeader } from "@/src/components/header";
import { QuizList } from "@/src/features/quiz/QuizList";
import { theme } from "@/src/theme";
import React from "react";
import { View } from "react-native";

export default function QuizScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', gap: 8 }}>
      <QuizHeader />
      <QuizList />
    </View>
  );
}
