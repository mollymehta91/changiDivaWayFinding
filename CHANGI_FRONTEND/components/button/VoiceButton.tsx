import { ActivityIndicator, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MicrophoneIcon from '@/icons/MicrophoneIcon';
import useAudioRecording from '@/hooks/useAudioRecording';
import SpeakerIcon from '@/icons/SpeakerIcon';
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';

// Type definition for callback functions
type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined;

/**
 * Component: VoiceButton
 * 
 * This component represents a button that plays audio using the Expo Speech API. 
 * It accepts an `audioUri` prop, which is the text or speech content to be played.
 * When the button is pressed, it triggers the `playSound` function that uses 
 * the Speech API to vocalize the provided audio URI. The button is styled as a 
 * small circular icon.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.audioUri - The URI of the audio content to be played
 * @returns {JSX.Element} The rendered voice button
 */
const VoiceButton = ({ audioUri }: any) => {
  const Logger = LOGGER();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    if (audioUri) {
      Logger.INFO('Playing Sound');
      setIsPlaying(true);
      Speech.speak(audioUri, {
        language: 'en',
      });
      setIsPlaying(false);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={playSound}>
      <SpeakerIcon />
    </TouchableOpacity>
  );
};

export default VoiceButton;

// Styles for the VoiceButton component
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black", // Dark background for the button
    width: 20, // Fixed width
    height: 20, // Fixed height
    borderRadius: 30, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  }
});
