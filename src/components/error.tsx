import { Image, Text, View } from "react-native";
import Button from "./button";
import { StyleSheet } from "react-native";
import { theme } from "../theme";

const ErrorComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/error/404_error.png")}
        style={styles.image}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>
          Houve uma falha no carregamento da página
        </Text>
        <Text style={styles.subtitle}>
          Fique tranquilo, já estamos trabalhando para resolver.
        </Text>
      </View>

      <Button
        text="Tentar Novamente"
        style={{
          maxWidth: 320,
          width: "100%",
        }}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    marginBottom: 20,
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: 20,
    maxWidth: 320,
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: theme.colors.textPrimary,
    marginBottom: 24
  },
});

export default ErrorComponent;
