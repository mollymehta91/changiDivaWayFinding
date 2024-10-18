/**
 * Component: NavigationScreen
 * 
 * This component represents the main screen for navigation within the application. 
 * It includes functionality for recording audio, displaying a map view, and showing 
 * navigation instructions. The component integrates audio recording capabilities 
 * and a side navigation panel to guide the user through the navigation process.
 * 
 * @returns {JSX.Element} The rendered navigation screen
 */
import { StyleSheet, View } from 'react-native';
import response from '@/data/response.json';
import AudioRecorderButton from '@/components/button/AudioRecorderButton';
import useAudioRecording from '@/hooks/useAudioRecording';
import React, { useState } from 'react';
import SideNavigation from '@/components/side-navigation/SideNavigation';
import MapView from '@/components/MapView';
import colors from '@/constants/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function NavigationScreen() {
  // State to manage whether the screen is in 'home' state
  const [isHome, setIsHome] = useState(true);

  // Extracting direction data from response
  const data = response["directions"][0];

  // Audio recording hooks for capturing audio inputs
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* MapView component wrapping the AudioRecorderButton */}
        <MapView>
          <AudioRecorderButton 
            recording={recording}
            isLoading={isLoading}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </MapView>

        {/* Side navigation component displaying navigation details */}
        <SideNavigation 
          isRecording={recording != undefined}
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
              totalDuration: instructions.reduce(
                (total, instruction) => total + parseInt(instruction.mins), 0),
              instructions: instructions
            }
          }}
      />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles for the NavigationScreen component
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

