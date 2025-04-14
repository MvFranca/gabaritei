import { Item } from "@/src/types/quiz.types";

export const getOrderedTitles = (
  items: Item[],
  positions: number[]
): string[] => {
  return positions.map((i) => items[i]?.title || "");
};