import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import StepItem from "@/src/components/stepItem";
import HeaderHome from "@/src/components/headers/headerHome";
import { theme } from "@/src/theme";
import CardSubModule from "@/src/components/home/submodule";
import BottomSheetCustom from "@/src/components/bottomSheetCustom";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Loading from "@/src/ds/loading";
import { useFocusEffect, useNavigation } from "expo-router";
import { useLoading } from "@/src/context/LoadingContext";

const Home = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Matemática");
  const {  isLoading, setLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, []);

  const navigation = useNavigation();

useFocusEffect(
  useCallback(() => {
    if (isLoading) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: undefined, // ou seu estilo original
      });
    }
  }, [isLoading])
);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <HeaderHome
            setIsSheetOpen={setIsSheetOpen}
            selectedSubject={selectedSubject}
          />

          <ScrollView contentContainerStyle={styles.wrapper}>
            {/* Módulo 1 */}
            <View style={styles.cardArea}>
              <CardSubModule
                title="Operações Básicas"
                description="Aprenda mais sobre adição, subtração..."
                theme="primary"
              />
              <View style={styles.steps}>
                <StepItem icon="📚" />
                <StepItem icon="📦" />
                <StepItem icon="⚡" theme="gray" />
                <StepItem icon="🎬" theme="gray" />
                <StepItem icon="🔄" theme="gray" />
                <StepItem icon="🏅" theme="gray" />
              </View>
            </View>

            {/* Módulo 2 */}
            <View style={styles.cardArea}>
              <CardSubModule
                title="Revisão: Operações Básicas"
                description="Aprenda mais sobre..."
                theme="gray"
              />
              <View style={styles.steps}>
                <StepItem icon="📚" theme="gray" />
                <StepItem icon="📦" theme="gray" />
                <StepItem icon="⚡" theme="gray" />
                <StepItem icon="🎬" theme="gray" />
                <StepItem icon="🔄" theme="gray" />
                <StepItem icon="🏅" theme="gray" />
              </View>
            </View>
          </ScrollView>

          <BottomSheetCustom
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
          >
            <View style={styles.bottomSheetHeaderContainer}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={20}
                color={theme.colors.textPrimary}
              />
              <Text style={styles.sheetTitle}>Escolha uma matéria</Text>
            </View>

            {["Matemática", "Português", "História"].map((subject) => {
              const isSelected = selectedSubject === subject;
              return (
                <TouchableOpacity
                  key={subject}
                  style={[
                    styles.sheetButton,
                    isSelected && { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={() => {
                    setSelectedSubject(subject);
                    setIsSheetOpen(false);
                  }}
                >
                  <View style={styles.subjectRow}>
                    <Text
                      style={[
                        styles.sheetButtonText,
                        isSelected && { color: theme.colors.surface },
                      ]}
                    >
                      {subject}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color="#fff"
                        style={{ marginLeft: 8 }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </BottomSheetCustom>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.surface,
  },
  wrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 96,
  },
  cardArea: {
    marginBottom: 48,
  },
  steps: {
    flexDirection: "column",
    gap: 16,
    justifyContent: "space-around",
    marginVertical: 16,
  },
  bottomSheetHeaderContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  sheetButton: {
    backgroundColor: "#E3F2FD",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  sheetButtonText: {
    color: theme.colors.textPrimary,
    fontWeight: "500",
    fontSize: 16,
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
});

export default Home;
