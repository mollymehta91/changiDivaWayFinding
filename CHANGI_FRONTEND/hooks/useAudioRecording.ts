import { useState } from 'react';
import { Audio } from 'expo-av';
import axios from 'axios';
import { OPENAI, FORM_DATA, RECORDING, DIRECTION } from '@/constants/enum';
import LOGGER from '@/utils/Logger';

/**
 * Custom hook for handling audio recording and processing.
 *
 * This hook manages the recording state, permissions, and audio uploading
 * while handling responses from the server regarding transcription and directions.
 *
 * @returns {Object} - An object containing the state and functions for audio recording.
 */
const useAudioRecording = () => {
    // State variables
    const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined); // Current recording instance
    const [permissionResponse, requestPermission] = Audio.usePermissions(); // Permission response for audio recording
    const [responseMessage, setResponseMessage] = useState<string | null>(''); // Message for responses
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const [isSucceed, setIsSucceed] = useState<boolean>(false); // Success state for transcription
    const [currentDirectionIndex, setCurrentDirectionIndex] = useState<number>(0); // Index of current direction
    const [directions, setDirections] = useState<any[]>([]); // Array of directions
    const [from, setFrom] = useState<string>(''); // Starting location
    const [to, setTo] = useState<string>(''); // Destination location
    const [instructions, setInstructions] = useState<{ text: string; direction: string;  mins: string }[]>([]); // List of instructions
    const [originDisclaimer, setOriginDisclaimer] = useState<string>(''); // Origin disclaimer
    const [destinationDisclaimer, setDestinationDisclaimer] = useState<string>(''); // Destination disclaimer
    const Logger = LOGGER(); // Logger instance

    /**
     * Starts the audio recording process.
     * Requests permission if not already granted and initializes recording.
     */
    const startRecording = async () => {
        try {
            // Check for recording permission
            if (permissionResponse?.status !== RECORDING.GRANTED) {
                Logger.INFO('Requesting permission..');
                await requestPermission(); // Request permission
            }
            Logger.INFO('Starting recording..');
            // Start recording with high-quality settings
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording); // Save recording instance
            Logger.INFO('Recording started');
        } catch (err: any) {
            setIsSucceed(false);
            setResponseMessage(`Error occured. Please try again.`); // Set error message
        }
    };

    /**
     * Stops the audio recording process.
     * Unloads the recording and uploads the audio to the server.
     */
    const stopRecording = async () => {
        Logger.INFO('Stopping recording..');
        if (recording) {
            await recording.stopAndUnloadAsync(); // Stop and unload recording
            const uri = recording.getURI(); // Get URI of recorded audio

            if (uri) {
                Logger.INFO('Uploading audio...');
                await uploadAudio(uri); // Upload the audio
            } else {
                Logger.ERROR('Recording URI is null', null, true);
                setResponseMessage('Error occured. Please try again.'); // Set error message
            }
            setRecording(undefined); // Reset recording state
        }
    };

    /**
     * Uploads the recorded audio to the server.
     * @param {string} uri - The URI of the audio file to upload.
     */
    const uploadAudio = async (uri: string) => {
        const formData = new FormData(); // Create FormData object
        // Append audio file details to FormData
        formData.append(FORM_DATA.FORM_DATA_FILE, {
            uri,
            name: FORM_DATA.FORM_DATA_NAME,
            type: FORM_DATA.FORM_DATA_TYPE,
        } as any);

        // Append additional data for the upload
        formData.append('model', FORM_DATA.FORM_DATA_MODEL);
        formData.append('language', FORM_DATA.FORM_DATA_LANGUAGE);

        setIsLoading(true); // Set loading state

        try {
            // Send POST request to upload audio
            const response = await axios.post(OPENAI.URL ?? '', formData, {
                headers: {
                    'Authorization': OPENAI.AUTHORIZATION, // Set authorization header
                    'Content-Type': OPENAI.CONTENT_TYPE, // Set content type
                },
            });
            Logger.INFO(`Response from server openai: ${JSON.stringify(response.data.text)}`);
            await sendTranscribedText(JSON.stringify(response.data.text)); // Send transcribed text for further processing
        } catch (error: any) {
            setIsSucceed(false);
            setResponseMessage(`Error occured. Please try again.`); // Set error message
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    /**
     * Sends the transcribed text to the server for processing.
     * @param {string} transcribedText - The text that was transcribed from audio.
     */
    const sendTranscribedText = async (transcribedText: string) => {
        Logger.INFO(`Transcribed text: ${transcribedText}`);

        try {
            const response = await axios.post(
                DIRECTION.URL ?? '',
                {
                    "transcribed_text": transcribedText,
                    "language": DIRECTION.LANGUAGE // Specify language for processing
                },
                {
                    headers: {
                        'x-api-key': DIRECTION.AUTHORIZATION, // Set authorization header
                        'Content-Type': DIRECTION.CONTENT_TYPE, // Set content type
                    },
                }
            );
            Logger.INFO(`response: ${JSON.stringify(response.data)}`);

            // Handle the response from the server
            if (response.data.isSucceed) {
                if (response.data.directions && response.data.directions.length > 0) {
                    const selectedDirection = response.data.directions[currentDirectionIndex]; // Get the current direction
                    selectedDirection.isSucceed = response.data.isSucceed;
                    
                    setIsSucceed(selectedDirection.isSucceed);
                    setDirections(selectedDirection.directions);
                    // Set the from, to, mins and instructions based on the current direction
                    setFrom(selectedDirection.from);
                    setTo(selectedDirection.to);
                    setInstructions(selectedDirection.instructions);
                    
                    if (selectedDirection.from == "Sunglass Hut") {
                      setOriginDisclaimer("Sunglass Hut is set as the default current location.");
                    } else {
                      setOriginDisclaimer('');
                    }

                    if (selectedDirection.to == "Gate D49") {
                      setDestinationDisclaimer("Gate D49 is set as the default end location.");
                    } else {
                      setDestinationDisclaimer('');
                    }
                    

                    setResponseMessage(null); // Clear any previous error messages
                } else {
                    setIsSucceed(response.data.isSucceed);
                    setResponseMessage(response.data.message); // Set message if no directions found
                }
            } else {
                setIsSucceed(response.data.isSucceed);
                setResponseMessage(response.data.message); // Set error message
            }


            if (response.data.message == "Please enter the correct destination.") {
              setResponseMessage("It looks like the landmarks you provided don’t exist in Changi. Could you please share the correct landmarks with us? Thank you!");
            }

        } catch (error: any) {
            setIsSucceed(false);
            setResponseMessage(`An error has occurred. Please try again.`); // Set error message
        }
    };

    return {
        recording,
        permissionResponse,
        responseMessage,
        isSucceed,
        isLoading,
        from,
        to,
        instructions,
        originDisclaimer,
        destinationDisclaimer,
        startRecording,
        stopRecording,
    };
};

export default useAudioRecording;
