import {ActivityIndicator, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Microphone from '@/icons/Microphone';
import useAudioRecording from '@/hooks/useAudioRecording';

type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined

const AudioRecorderButton = () => {

  const {
    recording,
    permissionResponse,
    responseMessage,
    audioUri,
    isLoading,
    startRecording,
    stopRecording,
  } = useAudioRecording();


  return (
    <TouchableOpacity style={styles.cont} onPress={recording ? stopRecording : startRecording}>
        {isLoading? <ActivityIndicator size="small" color="#000" /> : <Microphone />} 
    </TouchableOpacity>
  );
};

export default AudioRecorderButton;

const styles = StyleSheet.create({
  cont: {
    position: 'absolute',
    bottom: 30,
    marginLeft: 30,
    backgroundColor: "white",
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});