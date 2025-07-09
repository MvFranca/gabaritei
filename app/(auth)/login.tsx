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
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/src/theme";
import { useLogin } from "@/src/hooks/auth/useLogin";
import { useZodForm } from "@/src/hooks/form/useZodForm";
import { loginSchema } from "@/src/schemas/loginSchema";
import { FormInput } from "@/src/ds/FormInput";
import { router } from "expo-router";

const defaultError = "Email ou senha incorretos";

export default function LoginScreen() {
  const [showError, setShowError] = useState(false);
  const { handleLogin, error, loading } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useZodForm(loginSchema);

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
        <Image
          style={styles.logoContainer}
          resizeMode="contain"
          source={require("../../assets/images/logo-horizontal-gradiente.png")}
        />

        <View style={styles.formContainer}>
          <View style={styles.containersInput}>
            <FormInput
              control={control}
              name="email"
              placeholder="Digite seu usuário ou E-mail"
            />
            <FormInput
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              showToggleVisibility
            />
          </View>
          {showError && error && (
            <Text style={styles.generalErrorText}>{defaultError}</Text>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.7}
            onPress={handleSubmit(handleLogin)}
          >
            {loading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text style={styles.loginButtonText}>ENTRAR</Text>
            )}
          </TouchableOpacity>

          <View style={styles.socialLoginContainer}>
            <Text style={styles.socialLoginText}>Ou realize o login com:</Text>
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
              Não possui conta?
              <TouchableOpacity style={styles.createAccountLinkContainer} onPress={() => router.push("/(auth)/register")}>
                <Text style={styles.createAccountLink}> Criar conta</Text>
              </TouchableOpacity>
            </Text>
          </View>

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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 50,
    width: 340,
    height: 100,
  },
  formContainer: {
    width: "100%",
  },
  containersInput: {
    gap: 12,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialLoginContainer: {
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountLinkContainer : {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  createAccountLink: {
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: -5,
    fontSize: 16,
  },
  generalErrorText: {
    color: "red",
    textAlign: "left",
    fontWeight: "bold",
  },
});
