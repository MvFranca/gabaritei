import { SharedValue } from 'react-native-reanimated';

export interface Item {
  key: string;
  title: string;
}

export interface SortableItemProps {
  item: Item;
  index: number;
  positions: SharedValue<number[]>;
  dataLength: number;
  onSwap: (from: number, to: number) => void;
}

export type OrderedAnswer = {
  name: string;
  options: string[];
};