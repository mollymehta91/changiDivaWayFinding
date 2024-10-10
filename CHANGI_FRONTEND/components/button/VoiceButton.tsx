import {ActivityIndicator, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import MicrophoneIcon from '@/icons/MicrophoneIcon';
import useAudioRecording from '@/hooks/useAudioRecording';
import SpeakerIcon from '@/icons/SpeakerIcon';
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';

type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined

const VoiceButton = ({audioUri}: any) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: 20,
    height: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});