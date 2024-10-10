/**
 * Unit tests for the useAudioRecording custom hook.
 *
 * This file contains tests that validate the functionality of the useAudioRecording hook,
 * including starting and stopping audio recording, handling permissions, and uploading audio
 * files. Mock implementations for Expo's Audio module and Axios are used to isolate the 
 * hook's behavior.
 */

import { renderHook, act } from '@testing-library/react-hooks';
import useAudioRecording from '../../hooks/useAudioRecording'; // Adjust the import path
import { Audio } from 'expo-av';
import axios from 'axios';

// Mocking the necessary modules
jest.mock('expo-av');
jest.mock('axios');

// Define mock functions for permissions and recording
const mockRequestPermission = jest.fn();
const mockStopAndUnloadAsync = jest.fn();
const mockGetURI = jest.fn();

// Set up mock return values for the audio permissions
(Audio.usePermissions as jest.Mock).mockReturnValue([
  { status: 'granted' },
  mockRequestPermission,
]);

// Mock implementation for creating a recording
(Audio.Recording.createAsync as jest.Mock).mockImplementation(() => {
  return Promise.resolve({
    recording: {
      stopAndUnloadAsync: mockStopAndUnloadAsync,
      getURI: mockGetURI,
    },
  });
});

// Clear all mock calls before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('useAudioRecording', () => {
  /**
   * Test case: should start recording successfully.
   * This test verifies that when recording is started, 
   * the proper methods are called, and the recording state is updated.
   */
  it('should start recording', async () => {
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockRequestPermission).not.toHaveBeenCalled();
    expect(Audio.Recording.createAsync).toHaveBeenCalled();
    expect(result.current.recording).toBeDefined();
  });

  /**
   * Test case: should handle errors when starting recording.
   * This test checks that if an error occurs while starting the recording,
   * the error message is set correctly in the response.
   */
  it('should handle errors when starting recording', async () => {
    (Audio.Recording.createAsync as jest.Mock).mockImplementationOnce(() => {
      return Promise.reject(new Error('Recording failed'));
    });

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.responseMessage).toBe('Failed to start recording: Error: Recording failed');
  });

  /**
   * Test case: should stop recording and upload audio.
   * This test ensures that when the recording is stopped, the audio is uploaded
   * and the relevant state properties are updated.
   */
  it('should stop recording and upload audio', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
    const mockResponse = { data: { text: 'mock text' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(mockStopAndUnloadAsync).toHaveBeenCalled();
    expect(mockGetURI).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
    expect(result.current.from).toBeDefined();
    expect(result.current.to).toBeDefined();
    expect(result.current.instructions).toHaveLength(0); // Adjust based on expected structure
  });

  /**
   * Test case: should handle errors when stopping recording due to null URI.
   * This test checks that if stopping the recording results in a null URI,
   * an appropriate error message is set.
   */
  it('should handle errors when stopping recording due to null URI', async () => {
    mockGetURI.mockReturnValue(null);
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(result.current.responseMessage).toBe('Failed to get the audio URI.');
  });

  /**
   * Test case: should handle errors during audio upload.
   * This test verifies that if an error occurs during the audio upload,
   * it is correctly logged, and no specific response message is set.
   */
  it('should handle errors during audio upload', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Upload failed'));
    
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    // Check that no specific response message is set, but error logging occurs
    expect(result.current.responseMessage).toBe('');
  });

  /**
   * Test case: should send transcribed text correctly.
   * This test checks that after successfully uploading audio,
   * a second POST request is made to send the transcribed text.
   */
  it('should send transcribed text correctly', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
    const mockResponse = { data: { text: 'mock text' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    // Verify that the transcribed text is sent after upload
    expect(axios.post).toHaveBeenCalledTimes(2); // Once for upload, once for transcribed text
  });
});
