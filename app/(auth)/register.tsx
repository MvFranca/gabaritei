"use client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/src/theme";
import { useZodForm } from "@/src/hooks/form/useZodForm";
import { registerSchema } from "@/src/schemas/registerSchema";
import { FormInput } from "@/src/ds/FormInput";
import { ScrollView } from "react-native";
import { useRegister } from "@/src/hooks/auth/useRegister";

const defaultError = "Erro ao tentar cadastrar";

export default function RegisterScreen() {

  const [showError, setShowError] = useState(false);
  const { handleRegister, error, loading } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useZodForm(registerSchema);

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
    setShowError(true);
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.centerContent}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require("../../assets/images/logo-horizontal-gradiente.png")}
            />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <View style={styles.containersInput}>
                <FormInput
                  control={control}
                  name="name"
                  placeholder="Nome completo"
                />
                <FormInput
                  control={control}
                  name="email"
                  placeholder="Digite seu e-mail"
                />
                <FormInput
                  control={control}
                  name="password"
                  placeholder="Senha"
                  secureTextEntry
                  showToggleVisibility
                />
                <FormInput
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirmar senha"
                  secureTextEntry
                  showToggleVisibility
                />

              </View>

              {showError && error && (
                <Text style={styles.generalErrorText}>{defaultError}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.7}
                onPress={handleSubmit(handleRegister)}
              >
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text style={styles.loginButtonText}>CADASTRAR</Text>
                )}
              </TouchableOpacity>

              <View style={styles.socialLoginContainer}>
                <Text style={styles.socialLoginText}>
                  Ou use as suas redes:
                </Text>
                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.socialButton, styles.googleButton]}
                  >
                    <FontAwesome name="google" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.socialButton, styles.facebookButton]}
                  >
                    <FontAwesome name="facebook" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>
                  Já possui conta?
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/login")}
                  >
                    <Text style={styles.createAccountLink}> Entrar</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  //revisar depois
  scrollView: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 24,
    height: "75%",
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 20,
  },
  containerLogo: {
    height: "25%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  logo: {
    width: 340,
    height: 100,
  },
  formContainer: {
    width: "100%",
  },
  containersInput: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  generalErrorText: {
    color: "red",
    marginTop: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  socialLoginContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  socialLoginText: {
    color: "#666",
    fontSize: 16,
    marginBottom: 15,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: theme.colors.primary,
  },
  facebookButton: {
    backgroundColor: theme.colors.primary,
  },
  createAccountContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  createAccountText: {
    color: "#666",
    fontSize: 16,
  },
  createAccountLink: {
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: -5,
    fontSize: 16,
  },
});
