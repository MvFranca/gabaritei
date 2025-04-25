import React, { useState, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import BottomSheetCustom from '../bottomSheetCustom';
import { theme } from '@/src/theme';

const subjects = ['Matemática', 'Português', 'História'];

const HeaderHome = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Matemática');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleSelectSubject = (subject: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setSelectedSubject(subject);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
      setIsSheetOpen(false);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('@/assets/level/silver.svg')}
              style={{ width: 26, height: 26 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subjectButton}
            onPress={() => setIsSheetOpen(true)}
          >
            <Animated.Text style={[styles.subjectText, { opacity: fadeAnim }]}>
              {selectedSubject}
            </Animated.Text>
            <Ionicons name="chevron-down" size={16} color={theme.colors.surface}  />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.arrowCount}>4</Text>
          <MaterialCommunityIcons
            name="bow-arrow"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      <BottomSheetCustom
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}

      >
        <View style={styles.bottomSheetHeaderContainer}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={20}
            color={theme.colors.textPrimary}
          />
          <Text style={styles.sheetTitle}>Escolha uma matéria</Text>
        </View>

        {subjects.map(subject => {
          const isSelected = selectedSubject === subject;

          return (
            <TouchableOpacity
              key={subject}
              style={[
                styles.sheetButton,
                isSelected && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => handleSelectSubject(subject)}
            >
              <View style={styles.subjectRow}>
                <Text
                  style={[
                    styles.sheetButtonText,
                    isSelected && { color: theme.colors.surface },
                  ]}
                >
                  {subject}
                </Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color="#fff"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheetCustom>
    </>
  );
};

const styles = StyleSheet.create({
container: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: Dimensions.get('window').width,
  height: 114,
  backgroundColor: theme.colors.surface,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingTop: 40,
  elevation: 5,
  shadowColor: theme.colors.textPrimary,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

  iconButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#eee',
    width: 46,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 1,
  },
  subjectText: {
    color: theme.colors.surface,
    fontWeight: '500',
    marginRight: 4,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 10,
    height: 35,
  },
  arrowCount: {
    color: '#7F40FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSheetHeaderContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  sheetButton: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  sheetButtonText: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
    fontSize: 16,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HeaderHome;
