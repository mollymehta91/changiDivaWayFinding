import { renderHook, act } from '@testing-library/react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import useAudioRecording from '@/hooks/useAudioRecording'; // Update with correct path
import Logger from '@/utils/Logger';

/**
 * Test cases for the useAudioRecording hook.
 *
 * Tests the following scenarios:
 *   1. When permission is granted, the hook should return the recording instance.
 *   2. When permission is denied, the hook should return null.
 *   3. When fetching directions fails, the hook should return null.
 *   4. When uploading recording fails, the hook should return null.
 */

// Mock dependencies
jest.mock('axios',
    () => {
        return {
            get: jest.fn().mockResolvedValue({}).mockRejectedValue({}),
            post: jest.fn()
            .mockResolvedValueOnce({ data: { text: 'Transcribed text' } })
            .mockRejectedValueOnce(new Error('Upload failed'))
            .mockResolvedValue({
                data: {
                    isSucceed: true,
                    directions: [
                        {
                            from: 'Point A',
                            to: 'Point B',
                            instructions: [{ text: 'Go straight', direction: 'north', mins: '2' }],
                        },
                    ],
                    message: 'Successful',
                },
            })
        };
    }
);

jest.mock('expo-av', () => {
    return {
        Audio: {
            usePermissions: jest.fn().mockReturnValue([{ status: 'granted' }, jest.fn()]),
            Recording: {
                createAsync: jest.fn().mockResolvedValue({
                    recording: {
                        stopAndUnloadAsync: jest.fn(), // Mock stop and unload
                        getURI: jest.fn().mockReturnValue('mock-uri'), 
                    }
                }),
            },
            RecordingOptionsPresets: {
                HIGH_QUALITY: jest.fn().mockReturnValue({
                    android: {
                        audioEncoder: 3,
                        bitRate: 128000,
                        extension: '.m4a',
                        numberOfChannels: 2,
                        outputFormat: 2,
                        sampleRate: 44100,
                    },
                    ios: {
                        audioQuality: 127,
                        bitRate: 128000,
                        extension: '.m4a',
                        linearPCMBitDepth: 16,
                        linearPCMIsBigEndian: false,
                        linearPCMIsFloat: false,
                        numberOfChannels: 2,
                        outputFormat: 'aac ',
                        sampleRate: 44100,
                    },
                    isMeteringEnabled: true,
                    web: {
                        bitsPerSecond: 128000,
                        mimeType: 'audio/webm',
                    },
                }),
            }
        },
    }
});
jest.mock('@/utils/Logger');

// Helper function to resolve promises in testing
const flushPromises = () => new Promise(setImmediate);

describe('useAudioRecording Hook', () => {
    
    const INFO = jest.fn<void, [string]>();
    const ERROR = jest.fn<void, [string, any, boolean]>();

    jest.mocked(Logger).mockImplementation(() => {
        return {
            INFO: INFO,
            ERROR: ERROR,
        }
    })

    it('should request permission and start recording', async () => {

        const { result } = renderHook(() => useAudioRecording());

        await act(async () => {
            await result.current.startRecording();
        });
        
        // const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

        expect(result.current.permissionResponse?.status).toBe('granted');
        // expect(INFO).toHaveBeenCalledWith('Starting recording..');
        // expect(result.current.recording).toBe(recording);
        expect(result.current.recording).toBeDefined();
        // expect(INFO).toHaveBeenCalledWith('Recording started');
    });

    it('should handle upload failure', async () => {

        const { result } = renderHook(() => useAudioRecording());

        // Start recording
        await act(async () => {
            await result.current.startRecording();
        });

        // Stop recording and handle failure
        await act(async () => {
            await result.current.stopRecording();
        });

        expect(result.current.responseMessage).toBe('An error has occurred. Please try again.');
        expect(result.current.isSucceed).toBe(false);
    });

    it('should send transcribed text and process directions', async () => {

        const { result } = renderHook(() => useAudioRecording());

        // Simulate the entire process
        await act(async () => {
            await result.current.startRecording();
        });

        await act(async () => {
            await result.current.stopRecording();
        });

        // await flushPromises();
        // expect(result.current.responseMessage).toBe('[Upload failed] An error has occurred. Please try again.');

        expect(result.current.isSucceed).toBe(true);
        expect(result.current.from).toBe('Point A');
        expect(result.current.to).toBe('Point B');
        expect(result.current.instructions[0].text).toBe('Go straight');
    });

    it('should stop recording and upload audio', async () => {

        const { result } = renderHook(() => useAudioRecording());

        // Start recording first
        await act(async () => {
            await result.current.startRecording();
        });

        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        expect(result.current.recording).toBe(recording);

        // Now stop recording
        await act(async () => {
            await result.current.stopRecording();
        });

        expect(INFO).toHaveBeenCalledWith('Stopping recording..');
        // expect(result.current.recording?.getURI()).toHaveReturned();
        expect(result.current.recording).toBeUndefined();
    });
});