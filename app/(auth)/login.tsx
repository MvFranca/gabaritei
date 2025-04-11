"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "@/src/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário ou E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#999"
              />
            </Pressable>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.7}
            onPress={() => router.push('/quiz')}
          >
            <Text style={styles.loginButtonText}>AVANÇAR</Text>
          </TouchableOpacity>

          <View style={styles.socialLoginContainer}>
            <Text style={styles.socialLoginText}>Ou realize o login com:</Text>
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.socialButton, styles.googleButton]}
              >
                <FontAwesome name="google" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.socialButton, styles.facebookButton]}
              >
                <FontAwesome name="facebook" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>
              Não possui conta?
              <Text style={styles.createAccountLink}> Criar conta</Text>
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
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  logoG: {
    fontSize: 40,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
    height: 45,
  },
  input: {
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 45,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 45,
    fontSize: 16,
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
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
    marginBottom: 20,
    marginTop: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialLoginContainer: {
    alignItems: "center",
    marginBottom: 20,
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
  },
});
