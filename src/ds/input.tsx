import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showToggleVisibility?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showToggleVisibility = false,
  containerStyle,
  ...props
}: InputFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  const isPassword = secureTextEntry && showToggleVisibility;

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        style={[styles.input, isPassword && styles.inputWithIcon]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isVisible}
        autoCapitalize="none"
        {...props}
      />

      {isPassword && (
        <Pressable
          style={styles.icon}
          onPress={() => setIsVisible((prev) => !prev)}
        >
          <Ionicons
            name={isVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#999"
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    height: 45,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 45,
  },
  inputWithIcon: {
    paddingRight: 45,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
});
