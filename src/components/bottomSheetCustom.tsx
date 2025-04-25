import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { theme } from '../theme';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const BottomSheetCustom = ({ children, isOpen, onClose }: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  useEffect(() => {
    isOpen ? sheetRef.current?.expand() : sheetRef.current?.close();
  }, [isOpen]);

  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
      style={StyleSheet.absoluteFillObject}
    />
  ), []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.indicator}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10, // aumento para sobrepor o backdrop se necessário
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  indicator: {
    backgroundColor: '#ccc',
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 999, // certifique-se que está no topo
  },
});

export default BottomSheetCustom;
