import { useMutation } from '@apollo/client';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LOGIN_USER } from '../../api/auth/mutations';

export function useLogin() {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      const token = data?.signin?.token;

      console.log('token', token);

      if (token) {
        await SecureStore.setItem('token', token);
        router.replace('/quiz');
      }
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  return { handleLogin, loading, error };
}
