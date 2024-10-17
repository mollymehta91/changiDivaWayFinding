import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import response from '@/data/response.json';
import AudioRecorderButton from '@/components/button/AudioRecorderButton';
import useAudioRecording from '@/hooks/useAudioRecording';
import React from 'react';
import SideNavigation from '@/components/side-navigation/SideNavigation';
import MapView from '@/components/MapView';
import colors from '@/constants/colors';


export default function NavigationScreen() {
  const data = response["directions"][0];
  const {
    recording,
    isLoading,
    isSucceed,
    to,
    from,
    instructions,
    responseMessage,
    originDisclaimer,
    destinationDisclaimer,
    startRecording,
    stopRecording,
  } = useAudioRecording();

  return (
    <View style={styles.container}>
      <MapView>
        <AudioRecorderButton 
        recording={recording}
        isLoading={isLoading}
        startRecording={startRecording}
        stopRecording={stopRecording}
        />
      </MapView>

      <SideNavigation 
        isRecording={recording != undefined ? true : false}
        data={{
          isSucceed: isSucceed,
          errorMessage: responseMessage,
          directions: {
            from: {
              locationName: from,
              disclaimer: originDisclaimer
            },
            to: {
              locationName: to,
              disclaimer: destinationDisclaimer
            },
            totalDuration: instructions.reduce((total, instruction) => total + parseInt(instruction.mins), 0),
            instructions: instructions
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 20,
    fontSize: 18,
    color: 'red',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});
