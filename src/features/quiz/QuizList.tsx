import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { StyleSheet, Dimensions } from 'react-native';
import { Item } from '@/src/types/quiz.types';
import { SortableItem } from './SortableItem';
import { theme } from '@/src/theme';

export const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export const ITEM_HEIGHT = 70;

export const QuizList = () => {
  const initialData: Item[] = [
    { key: '1', title: 'Matemática Financeira' },
    { key: '2', title: 'Estatística e Probabilidade' },
    { key: '3', title: 'Álgebra' },
    { key: '4', title: 'Geometria' },
    { key: '5', title: 'Cálculo' },
  ];
  
  const [items, setItems] = useState<Item[]>(initialData);
  
  const positions = useSharedValue<number[]>(initialData.map((_, i) => i));

  const move = (from: number, to: number) => {
    const newPositions = [...positions.value];
    const item = newPositions.splice(from, 1)[0];
    newPositions.splice(to, 0, item);
    positions.value = newPositions;
  };

  const getOrder = () => positions.value.map(i => items[i].key);

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Ordene os conteúdos que você tem mais dificuldade em{' '}
        <Text style={styles.question}>matemática.</Text>
      </Text>

      <View style={{ flex: 1, paddingBottom: 100 }}>
        {items.map((item: Item, index: number) => (
          <SortableItem
            key={item.key}
            index={index}
            item={item}
            positions={positions}
            dataLength={items.length}
            onSwap={(from: number, to: number) => runOnJS(move)(from, to)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Nova ordem:', getOrder())}
      >
        <Text style={styles.buttonText}>AVANÇAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingTop: 40,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  question: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
});
