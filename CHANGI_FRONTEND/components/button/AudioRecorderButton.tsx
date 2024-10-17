import { ActivityIndicator, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Microphone from '@/icons/MicrophoneIcon';
import {
  MaterialIndicator,
  PulseIndicator,
} from 'react-native-indicators';
import colors from '@/constants/colors';

// Type definition for the callback functions used in the component
// type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined;

/**
 * Component: AudioRecorderButton
 * 
 * This component represents a button that toggles audio recording functionality. 
 * It displays a microphone icon when not recording, a loading indicator while 
 * processing, and a pulse indicator when recording is active. The button's 
 * action changes based on the `recording` state: it starts or stops recording 
 * when pressed.
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.recording - Indicates if recording is currently active
 * @param {boolean} props.isLoading - Indicates if the button is in a loading state
 * @param {CallbackFunctions} props.startRecording - Function to start audio recording
 * @param {CallbackFunctions} props.stopRecording - Function to stop audio recording
 * @returns {JSX.Element} The rendered audio recorder button
 */
const AudioRecorderButton = ({ recording, isLoading, startRecording, stopRecording }: any) => {
    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
                {isLoading ? <MaterialIndicator size={30} /> : recording ? <PulseIndicator /> : <Microphone />}
            </TouchableOpacity>
            <Text style={styles.text}>Voice command</Text>
        </View>
    );
};

export default AudioRecorderButton;

// Styles for the AudioRecorderButton component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        marginLeft: 30,
        backgroundColor: colors.black,
        borderRadius: 100,
        padding: 10,
        paddingRight: 30,
        alignItems: 'center',
        gap: 20,
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize: 17,
        color: colors.white,
    },
    button: {
        backgroundColor: colors.white,
        zIndex: 1,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});
