import { QuizHeader } from "@/src/components/header";
import Modal from "@/src/components/modal";
import { QuizList } from "@/src/features/quiz/QuizList";
import { theme } from "@/src/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function QuizScreen() {
  const router = useRouter();
  const [showModalExit, setShowModalExit] = useState(false);
  const [showModalFinished, setShowModalFinished] = useState(false); // 🆕

  const handleHeaderPress = () => {
    setShowModalExit(true);
  };

  const closeModal = () => {
    setShowModalExit(false);
  };

  const exit = () => {
    router.replace("/home");
  };

  const handleQuizFinish = () => {
    setShowModalFinished(true);
  };

  const goToHome = () => {
    setShowModalFinished(false);
    router.replace("/home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface, gap: 8 }}>
      <QuizHeader onPress={handleHeaderPress} />
      <QuizList finished={handleQuizFinish} />

      {showModalExit && (
        <Modal
          title="Tem certeza que deseja sair?"
          subtitle="Você deixará de ter um estudo personalizado!"
          imageSource={require("@/assets/images/modal/close.png")}
          primaryButtonText="Continuar"
          onPrimaryPress={closeModal}
          secondaryButtonText="Sair"
          onSecondaryPress={exit}
          onRequestClose={closeModal}
        />
      )}

      {showModalFinished && (
        <Modal
          title="PARABÉNS!"
          subtitle="Agora você já está pronto para utilizar nossa plataforma!"
          imageSource={require("@/assets/images/modal/success.png")} 
          primaryButtonText="Ir para Home"
          onPrimaryPress={goToHome}
          onRequestClose={goToHome}
        />
      )}
    </View>
  );
}
