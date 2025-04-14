import { OrderedAnswer } from "@/src/types/quiz.types";

export const saveOrderedAnswer = (
  answers: OrderedAnswer[],
  newAnswer: OrderedAnswer
): OrderedAnswer[] => {
  return [...answers, newAnswer];
};