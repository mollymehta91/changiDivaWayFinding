import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import axios from 'axios';
import { OPENAI, FORM_DATA, RECORDING, DIRECTION }  from '@/constants/enum';
import LOGGER from '@/utils/Logger';

const useAudioRecording = () => {
    // state for the variable
    const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [responseMessage, setResponseMessage] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [from, setFrom] = useState<any>('');
    const [to, setTo] = useState<any>('');
    const [mins, setMins] = useState<number | null>(null); 
    const [instructions, setInstructions] = useState<{
      text: string;
      direction: string;
    }[]>([]);
    const Logger = LOGGER();


    // Function to start recording audio
  const startRecording = async () => {
    try {
      // Check for recording permission
      if (permissionResponse?.status !== RECORDING.GRANTED) {
        Logger.INFO('Requesting permission..');
        await requestPermission(); // Request permission if not granted
      }
      Logger.INFO('Starting recording..');
      
      // Start the recording with high quality settings
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording); // Store the recording instance
      Logger.INFO('Recording started');
    } catch (err) {
      // Handle error and log it
      setResponseMessage(`Failed to start recording: ${err}`);
      Logger.ERROR('Failed to start recording', err, true);
    }
  };

  // Function to stop recording audio
  const stopRecording = async () => {
    Logger.INFO('Stopping recording..');
    
    if (recording) {
      // Stop and unload the recording
      await recording.stopAndUnloadAsync();
      
      // Get the URI of the recorded audio
      const uri = recording.getURI();

      if (uri) {
        Logger.INFO('Uploading audio...');
        await uploadAudio(uri); // Upload the audio to the server
      } else {
        setResponseMessage('Failed to get the audio URI.');
        Logger.ERROR('Recording URI is null', null, true);
      }

      setRecording(undefined); // Reset recording state
    }
  };

  // Function to upload audio to the server
  const uploadAudio = async (uri: string) => {
    const formData = new FormData(); // Create a new FormData object

    // Append audio file details to the FormData
    formData.append(FORM_DATA.FORM_DATA_FILE, {
      uri,
      name: FORM_DATA.FORM_DATA_NAME,
      type: FORM_DATA.FORM_DATA_TYPE,
    } as any);
    
    // Append additional data required for the upload
    formData.append('model', FORM_DATA.FORM_DATA_MODEL);
    formData.append('language', FORM_DATA.FORM_DATA_LANGUAGE);

    setIsLoading(true); // Show loading indicator

    try {

      // console.log(OPENAI.AUTHORIZATION)

      // Send a POST request to upload audio
      const response = await axios.post(OPENAI.URL?? '', formData, {
        headers: {
          'Authorization': OPENAI.AUTHORIZATION, // Set authorization header
          'Content-Type': OPENAI.CONTENT_TYPE, // Set content type
        },
      });

      Logger.INFO(`Response from server openai: ${JSON.stringify(response.data.text)}`);
      sendTranscribedText(JSON.stringify(response.data.text)); // Send the transcribed text
    } catch (error: any) {
      // Handle error and log it
      

    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const sendTranscribedText = async (transcribedText: string) => {
    Logger.INFO(`transcribedText: ${transcribedText}`);
    
    try {
      // Send a POST request with the transcribed text
      const response = await axios.post(DIRECTION.URL?? '', {
        transcribed_text: transcribedText,
      }, {
        headers: {
          'Authorization': DIRECTION.AUTHORIZATION, // Set authorization header
          'Content-Type': DIRECTION.CONTENT_TYPE, // Set content type
        },
      });

      Logger.INFO(`Response from backend server: ${response.data.directions[0].from}`);
      // setResponseMessage(response.data.directions[0].from); // Update response message

      setFrom(response.data.directions[0].from)
      setTo(response.data.directions[0].to)
      setInstructions(response.data.directions[0].instructions)
      // setMin(response.data.directions[0].mins)

    } catch (error: any) {
      console.error('Network error:', error);
      if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
      } else if (error.request) {
          console.error('Request made but no response received:', error.request);
      } else {
          console.error('Error setting up request:', error.message);
      }
  }
  };

  return {
    recording,
    permissionResponse,
    responseMessage,
    isLoading,
    from,
    to,
    instructions,
    mins,
    startRecording,
    stopRecording,
  };
};

export default useAudioRecording;