import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { theme } from "@/src/theme";

export function QuizHeader({onPress}: { onPress?: () => void }) {

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo-horizontal-gradiente.png")}
        style={styles.logo}
      />

      <TouchableOpacity onPress={onPress}>
        <Icon color="#000" size={24} name="close" />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    height: 114,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface,

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 145,
    height: 31,
    resizeMode: "contain",
  },
});
