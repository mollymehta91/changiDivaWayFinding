// components/AudioRecorder.tsx

import React from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import useAudioRecording from '../../hooks/useAudioRecording';
import AudioPlayer from './AudioPlayer'; // Import the AudioPlayer component

const AudioRecorder = () => {
  const {
    recording,
    permissionResponse,
    responseMessage,
    // audioUri,
    isLoading,
    startRecording,
    stopRecording,
  } = useAudioRecording();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Audio Recorder</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
          color="#1E90FF"
        />
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      </View>
      {responseMessage ? <Text style={styles.response}>{responseMessage}</Text> : null}
      
      {/* Add AudioPlayer here */}
      {/* <AudioPlayer audioUri={audioUri} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default AudioRecorder;