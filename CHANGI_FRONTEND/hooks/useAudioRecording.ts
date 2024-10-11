import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import axios from 'axios';
import { OPENAI, FORM_DATA, RECORDING, DIRECTION } from '@/constants/enum';
import LOGGER from '@/utils/Logger';

const useAudioRecording = () => {
    const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [responseMessage, setResponseMessage] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSucceed, setIsSucceed] = useState<boolean>(false);
    const [currentDirectionIndex, setCurrentDirectionIndex] = useState<number>(0);
    const [directions, setDirections] = useState<any[]>([]);
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [mins, setMins] = useState<number | null>(null);
    const [instructions, setInstructions] = useState<{ text: string; direction: string }[]>([]);
    const Logger = LOGGER();

    const startRecording = async () => {
        try {
            if (permissionResponse?.status !== RECORDING.GRANTED) {
                Logger.INFO('Requesting permission..');
                await requestPermission();
            }
            Logger.INFO('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            Logger.INFO('Recording started');
        } catch (err: any) {
            setIsSucceed(false);
            setResponseMessage(`Failed to start recording: ${err.message}`);
        }
    };

    const stopRecording = async () => {
        Logger.INFO('Stopping recording..');
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();

            if (uri) {
                Logger.INFO('Uploading audio...');
                await uploadAudio(uri);
            } else {
                Logger.ERROR('Recording URI is null', null, true);
                setResponseMessage('Failed to Transcript: Failed to get the audio URI.');
            }
            setRecording(undefined);
        }
    };

    const uploadAudio = async (uri: string) => {
        const formData = new FormData();
        formData.append(FORM_DATA.FORM_DATA_FILE, {
            uri,
            name: FORM_DATA.FORM_DATA_NAME,
            type: FORM_DATA.FORM_DATA_TYPE,
        } as any);

        formData.append('model', FORM_DATA.FORM_DATA_MODEL);
        formData.append('language', FORM_DATA.FORM_DATA_LANGUAGE);

        setIsLoading(true);

        try {
            const response = await axios.post(OPENAI.URL ?? '', formData, {
                headers: {
                    'Authorization': OPENAI.AUTHORIZATION,
                    'Content-Type': OPENAI.CONTENT_TYPE,
                },
            });
            Logger.INFO(`Response from server openai: ${JSON.stringify(response.data.text)}`);
            await sendTranscribedText(JSON.stringify(response.data.text));
        } catch (error: any) {
            setIsSucceed(false);
            setResponseMessage(`Failed to upload: ${error.response?.data || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const sendTranscribedText = async (transcribedText: string) => {
        Logger.INFO(`Transcribed text: ${transcribedText}`);

        try {
          console.log('hello in here')
          const response = await axios.post(
              DIRECTION.URL?? '',
              {
                "transcribed_text": transcribedText,
                "language": "English"
              },
              {
                headers: {
                  'x-api-key': DIRECTION.AUTHORIZATION, // Set authorization header
                  'Content-Type': DIRECTION.CONTENT_TYPE, // Set content type
                },
              }
            );
            Logger.INFO(`response: ${JSON.stringify(response.data)}`)
            
            if (response.data.isSucceed) {
              if (response.data.directions && response.data.directions.length > 0) {
                const selectedDirection = response.data.directions[currentDirectionIndex];
                setIsSucceed(selectedDirection.isSucceed);
                setDirections(selectedDirection.directions);

                setFrom(selectedDirection.from);
                setTo(selectedDirection.to);
                setInstructions(selectedDirection.instructions);
                setResponseMessage(null);
              }
              else {
                setResponseMessage(response.data.message);
              }
            }
            else {
              setResponseMessage(response.data.message);
            }

        } catch (error: any) {
            setIsSucceed(false);
            setResponseMessage(`Failed to Transcript: ${error.response?.data || error.message || error}`);
        }
    };

    // Function to change the current direction if needed
    // const changeDirection = (index: number) => {
    //   if (directions[index]) {
    //     setCurrentDirectionIndex(index);
    //     const selectedDirection = directions[index];
    //     setFrom(selectedDirection.from);
    //     setTo(selectedDirection.to);
    //     setInstructions(selectedDirection.instructions);
    //   }
    // };

    return {
        recording,
        permissionResponse,
        responseMessage,
        isSucceed,
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
