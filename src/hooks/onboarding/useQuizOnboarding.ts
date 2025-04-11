import { useLazyQuery } from '@apollo/client';
import { ONBOARDING_QUIZ } from '@/src/api/onboarding/mutations';

export function useQuizOnboarding() {
  const [fetchQuestions, { loading, error, data }] = useLazyQuery(ONBOARDING_QUIZ);

  const handleGetQuestions = async () => {
    try {
      const { data } = await fetchQuestions(); 

      if (data?.questions) {
        console.log('Perguntas:', data.questions);
      }
    } catch (e) {
      console.error('Erro ao buscar perguntas:', e);
    }
  };

  return { handleGetQuestions, loading, error, data };
}
