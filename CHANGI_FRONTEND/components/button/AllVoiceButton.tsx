import { ActivityIndicator, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MicrophoneIcon from '@/icons/MicrophoneIcon';
import useAudioRecording from '@/hooks/useAudioRecording';
import SpeakerIcon from '@/icons/SpeakerIcon';
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';
import colors from '@/constants/colors';

// Type definition for callback functions
type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined;

/**
 * Component: AllVoiceButton
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
export default function VoiceButton ({ data }: any) {
  const Logger = LOGGER();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (audioUri: any) => {
    if (audioUri) {
      Logger.INFO('Playing Sound');
      setIsPlaying(true);
      Speech.speak(audioUri, {
        language: 'en',
      });
      setIsPlaying(false);
    }
  };

  const playAllSound = (data: any) => {

    for (let i = 0; i < data.length; i++) {
        playSound(data[i].text);
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => {
        playAllSound(data)
    }}>
      <SpeakerIcon size={"medium"} />
    </TouchableOpacity>
  );
};

// Styles for the VoiceButton component
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary.purple, // Dark background for the button
    paddingVertical: 8, // Padding for the button
    paddingHorizontal: 25,
    borderRadius: 30, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  }
});
