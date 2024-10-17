/**
 * @description
 * This hook is used to record audio and upload it to the server, then get the transcribed text and process the directions.
 * It also handles the cases of no permission, recording failure, upload failure, and successful upload and transcription.
 * @author
 * @license
 * MIT
 * @version
 * 1.0
 * @since
 * 1.0
 * @see
 * https://docs.expo.dev/versions/latest/react-native/audio/
 * https://docs.expo.dev/versions/latest/react-native/audio-recording/?redirected
 * https://docs.expo.dev/versions/latest/react-native/audio-recording/#recordingoptions
 * @example
 * const {startRecording, stopRecording, isRecording, isSucceed, responseMessage, from, to, instructions} = useAudioRecording();
 * 
 * // Start recording
 * startRecording();
 * 
 * // Stop recording and upload
 * stopRecording();
 * 
 * // Get the transcribed text
 * const {isSucceed, responseMessage, from, to, instructions} = useAudioRecording();
 * if (isSucceed) {
 *   console.log(`Transcribed text: ${responseMessage}`);
 *   console.log(`From: ${from}`);
 *   console.log(`To: ${to}`);
 *   console.log(`Instructions: ${instructions}`);
 * }
 * @requires
 * @provides
 * @interface
 * @exports
 * @returns
 * 
 * @example
 * const {startRecording, stopRecording, isRecording, isSucceed, responseMessage, from, to, instructions} = useAudioRecording();
 */
import { renderHook, act } from '@testing-library/react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import useAudioRecording from '@/hooks/useAudioRecording'; // Update with correct path
import Logger from '@/utils/Logger';

/**
 * Function to flush promises in testing
 * @returns {Promise<void>} A promise that resolves when all promises are resolved
 */
const flushPromises = () => new Promise(setImmediate);

/**
 * Describe the useAudioRecording hook
 */
describe('useAudioRecording Hook', () => {

    const INFO = jest.fn<void, [string]>();
    const ERROR = jest.fn<void, [string, any, boolean]>();

    jest.mocked(Logger).mockImplementation(() => {
        return {
            INFO: INFO,
            ERROR: ERROR,
        }
    });

    /**
     * Test that it requests permission and starts recording
     */
    it('should request permission and start recording', async () => {

        const { result } = renderHook(() => useAudioRecording());

        await act(async () => {
            await result.current.startRecording();
        });

        expect(result.current.permissionResponse?.status).toBe('granted');
        expect(INFO).toHaveBeenCalledWith('Starting recording..');
        expect(result.current.recording).toBeDefined();
        expect(INFO).toHaveBeenCalledWith('Recording started');
    });

    /**
     * Test that it handles upload failure
     */
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

    /**
     * Test that it sends transcribed text and processes directions
     */
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

    /**
     * Test that it stops recording and uploads audio
     */
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
        expect(result.current.recording?.getURI()).toHaveReturned();
        expect(result.current.recording).toBeUndefined();
    });
});