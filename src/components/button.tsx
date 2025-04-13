import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../theme';

type HomeButtonProps = {
  text: string;
  backgroundColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  text,
  backgroundColor = theme.colors.primary,
  onPress,
  style,
}: HomeButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
