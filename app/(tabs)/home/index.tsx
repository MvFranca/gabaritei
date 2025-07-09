import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import StepItem from "@/src/components/stepItem";
import HeaderHome from "@/src/components/headers/headerHome";
import { theme } from "@/src/theme";
import CardSubModule from "@/src/components/home/submodule";

const Home = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />

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
          {/* <Illustration index={2} /> */}
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
          {/* <Illustration index={2} /> */}
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 80 + 16,
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
});

export default Home;
