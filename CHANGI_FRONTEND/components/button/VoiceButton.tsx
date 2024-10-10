import {ActivityIndicator, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Microphone from '@/icons/Microphone';
import useAudioRecording from '@/hooks/useAudioRecording';
import Speaker from '@/icons/Speaker';
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';

type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined

const VoiceButton = ({audioUri}: any) => {
  const Logger = LOGGER();

  const playSound = () => {
    if (audioUri) {
      Logger.INFO('Playing Sound');
      Speech.speak(audioUri, {
        language: 'en',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.cont} onPress={playSound}>
        <Speaker />
    </TouchableOpacity>
  );
};

export default VoiceButton;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "black",
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});