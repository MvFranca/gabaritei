// Modal.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../theme";
import { BlurView } from "expo-blur";

type ModalProps = {
  title?: string;
  subtitle?: string;
  imageSource?: ImageSourcePropType;
  primaryButtonText?: string;
  onPrimaryPress?: (event: GestureResponderEvent) => void;
  secondaryButtonText?: string;
  onSecondaryPress?: (event: GestureResponderEvent) => void;
  onRequestClose?: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  imageSource,
  primaryButtonText,
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
  onRequestClose,
  children,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start();
  }, []);

  const animateClose = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback?.();
    });
  };

  const handleButtonClose =
    (callback?: (event: GestureResponderEvent) => void) =>
    (event: GestureResponderEvent) => {
      animateClose(() => callback?.(event));
    };

  const handleOutsidePress = () => {
    animateClose(onRequestClose);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <BlurView intensity={90} tint="dark" style={styles.container}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.modal,
              {
                opacity,
                transform: [{ scale }],
              },
            ]}
          >
            {children ? (
              children
            ) : (
              <>
                {title && <Text style={styles.title}>{title}</Text>}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                {imageSource && (
                  <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
                <View style={styles.buttonContainer}>
                  {primaryButtonText && (
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={handleButtonClose(onPrimaryPress)}
                    >
                      <Text style={styles.primaryText}>{primaryButtonText}</Text>
                    </TouchableOpacity>
                  )}
                  {secondaryButtonText && (
                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={handleButtonClose(onSecondaryPress)}
                    >
                      <Text style={styles.secondaryText}>
                        {secondaryButtonText}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </BlurView>
    </TouchableWithoutFeedback>
  );
};

export default Modal;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    minWidth: 250,
  },
  title: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.primary,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
    width: 280,
  },
  image: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  secondaryButton: {
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  secondaryText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
