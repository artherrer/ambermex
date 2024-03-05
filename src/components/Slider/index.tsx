import React, { useState } from 'react';
import { View, PanResponder, Text, StyleSheet, Dimensions } from 'react-native';

interface SliderProps {
  onSlideComplete?: () => void;
}

const Slider = ({ onSlideComplete }: SliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const { width } = Dimensions.get('window');
  const containerWidth = width * 0.8; // Adjust the width as needed
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (evt, gestureState) => {
      const newPosition = Math.max(0, Math.min(1, gestureState.dx / (containerWidth - 40))); // 40 is the width of the slider
      setSliderPosition(newPosition);
    },
    onPanResponderRelease: () => {
      if (sliderPosition === 1 && onSlideComplete) {
        onSlideComplete();
      }
      setSliderPosition(0);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View
          style={[styles.slider, { left: `${sliderPosition * 100}%` }]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sosText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderContainer: {
    width: '80%',
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
  },
  slider: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
  },
});

export default Slider;