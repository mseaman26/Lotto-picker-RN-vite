// Toast.tsx
import React, { useState, useEffect } from 'react';
import { Text, Animated, StyleSheet, Dimensions, Platform, TouchableWithoutFeedback, Pressable } from 'react-native-web';

const isWeb = Platform.OS === 'web';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onClose?: () => void;
  type?: 'default' | 'success' | 'error' | 'warning';
  position?: 'top' | 'bottom' | 'center';
  setToastVisible?: any;
}

const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 300000,
  onClose,
  type = 'default',
  position = 'bottom',
  setToastVisible,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade in/out
  const { height } = Dimensions.get('window'); // Get window height for positioning

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Automatically hide the toast after the specified duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose(); // Call the onClose callback after fade-out
    });
  };

  if (!visible) return null; // If not visible, don't render anything

  // Determine background color based on the type of toast
  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      default:
        return '#333';
    }
  };

  // Determine position style based on the position prop
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: 50 }; // Toast at the top
      case 'center':
        return {
          top: '40%' as const, // Center toast vertically
          bottom: 0,
          justifyContent: 'center' as const, // Valid flexbox value for justifyContent
        }; 
      default:
        return { bottom: 50 }; // Toast at the bottom
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClose}>
      <Animated.View
        style={[
          styles.toastContainer,
          getPositionStyle(),
          { backgroundColor: getBackgroundColor(), opacity: fadeAnim },
        ]}
      >
        <Text style={styles.toastText}>{message}</Text>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.toastText}>X</Text>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '90%',
    height: '100%',
    zIndex: 9999,
    cursor: 'pointer',
    margin: 10,
  },
  toastContainer: {
    position: 'absolute',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    height: 50,
    maxWidth: 900,
    width: '100%',
    left: isWeb ? '50%' : 'auto',
    transform: [{ translateX: isWeb ? '-50%' : 0 }],
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
  }
});

export default Toast;
