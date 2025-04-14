import { useLazyQuery } from '@apollo/client';
import { ONBOARDING_QUIZ } from '@/api/onboarding/mutations';

export function useQuizOnboarding() {
  const [getQuestions, { data, loading, error }] = useLazyQuery(ONBOARDING_QUIZ);

  const handleGetQuestions = async () => {
    try {
      await getQuestions();
    } catch (e) {
      console.error('Erro ao buscar perguntas:', e);
    }
  };

  return { data, loading, error, handleGetQuestions };
}
