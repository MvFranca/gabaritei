// SubjectOptionsModal.tsx
import Modal from '@/src/components/modal';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SubjectOptionsModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
};

const options = ['Álgebra', 'Geometria', 'Trigonometria', 'Estatística'];

const SubjectOptionsModal: React.FC<SubjectOptionsModalProps> = ({
  visible,
  onClose,
  onSelectOption,
}) => {
  if (!visible) return null;

  return (
    <Modal
      title="Selecione a área"
      subtitle="Escolha uma área da Matemática"
      onRequestClose={onClose}
      
    >
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.option}
            onPress={() => {
              onSelectOption(option);
              onClose();
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default SubjectOptionsModal;

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 12,
    width: '100%',
  },
  option: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
