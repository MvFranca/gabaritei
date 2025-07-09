import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { REGISTER_USER } from "../../../api/auth/mutations";

export function useRegister() {
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleRegister = async ({ name, email, password }: { name:string, email: string; password: string }) => {
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });

      const token = data?.signup?.token;

      if (token) {
        await SecureStore.setItemAsync("token", token);
        router.replace("/quiz");
      }
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  return { handleRegister, loading, error };
}
