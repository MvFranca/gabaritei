import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  icon: string;
  theme?: string;
};

const StepItem = ({ icon, theme = "primary" }: Props) => {
  const gradientColors =
    theme === "primary" ? ["#407BFF", "#3ABAFF"] : ["#B0B0B0", "#C0C0C0"];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.circle]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </LinearGradient>
      <View style={[styles.circleShadow]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  circleShadow: {
    borderRadius: 24,
    backgroundColor: "#117DBF",
    width: 60,
    height: 60,
    position: "absolute",
    transform: [{ translateY: 4 }, { translateX: 3 }],
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    zIndex: 99,
  },
  icon: {
    fontSize: 24,
  },
});

export default StepItem;
