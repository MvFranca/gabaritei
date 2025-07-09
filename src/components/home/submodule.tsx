import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  description: string;
  theme?: string;
};

const CardSubModule = ({ title, description, theme = 'primary' }: Props) => {
  const gradientColors =
    theme === 'primary'
      ? ['#407BFF', '#3ABAFF']
      : ['#B0B0B0', '#C0C0C0'];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#f0f8ff',
    fontSize: 14,
    opacity: 0.9,
  },
});

export default CardSubModule;
