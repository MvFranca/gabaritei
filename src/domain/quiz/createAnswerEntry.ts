import { OrderedAnswer } from "@/src/types/quiz.types";

export const createAnswerEntry = (
  questionName: string,
  orderedTitles: string[]
): OrderedAnswer => ({
  name: questionName,
  options: orderedTitles,
});