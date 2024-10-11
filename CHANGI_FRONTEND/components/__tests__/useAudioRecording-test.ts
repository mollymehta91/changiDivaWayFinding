import { renderHook, act } from '@testing-library/react-hooks';
import useAudioRecording from '../../hooks/useAudioRecording';
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
  it('should start recording', async () => {
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockRequestPermission).not.toHaveBeenCalled();
    expect(Audio.Recording.createAsync).toHaveBeenCalled();
    expect(result.current.recording).toBeDefined();
  });

  it('should handle errors when starting recording', async () => {
    (Audio.Recording.createAsync as jest.Mock).mockImplementationOnce(() => {
      return Promise.reject(new Error('Recording failed'));
    });

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.responseMessage).toBe('Failed to start recording: Recording failed');
  });

  it('should stop recording and upload audio', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);

    const mockUploadResponse = { data: { text: 'mock text' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockUploadResponse); // First call for upload

    const mockTranscriptionResponse = {
      data: {
        isSucceed: true,
        directions: [
          {
            from: 'A',
            to: 'B',
            instructions: [],
          },
        ],
        message: ''
      }
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockTranscriptionResponse); // Second call for transcription

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(mockStopAndUnloadAsync).toHaveBeenCalled();
    expect(mockGetURI).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledTimes(2);

    expect(result.current.from).toBe('A');
    expect(result.current.to).toBe('B');
    expect(result.current.instructions).toEqual([]);
    expect(result.current.responseMessage).toBe(null);
  });

  it('should handle errors when stopping recording due to null URI', async () => {
    mockGetURI.mockReturnValue(null);
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(result.current.responseMessage).toBe('Failed to Transcript: Failed to get the audio URI.');
  });

  it('should handle errors during audio upload', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Upload failed'));

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(result.current.responseMessage).toBe('Failed to upload: Upload failed');
  });

  it('should handle unsuccessful transcription response', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
    const mockUploadResponse = { data: { text: 'mock text' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockUploadResponse); // First call for upload

    const mockTranscriptionResponse = {
      data: {
        isSucceed: false,
        message: 'error', // Providing an error message
        directions: []
      }
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockTranscriptionResponse); // Second call for transcription

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    expect(result.current.responseMessage).toBe('error');
  });

  it('should handle no directions available', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
    
    // Mocking the upload response
    const mockUploadResponse = { data: { text: 'mock text' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockUploadResponse); // First call for upload

    // Mocking the transcription response indicating no directions available
    const mockTranscriptionResponse = {
      data: {
        isSucceed: true,
        message: 'No directions found', // Message for no directions
        directions: [] // No directions available
      }
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockTranscriptionResponse); // Second call for transcription

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
    });

    // Check that the response message is correctly set
    expect(result.current.responseMessage).toBe('No directions found');
});

  it('should handle errors when sending transcribed text', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);

    // Mocking the successful upload response
    const mockUploadResponse = {
      data: { text: 'mock-response' } // Simulating the response structure
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockUploadResponse); // First call for upload

    // Mocking the failure for sending transcribed text
    const mockTranscriptionError = new Error('Transcription failed');
    (axios.post as jest.Mock).mockRejectedValueOnce('Transcription failed'); // Second call for transcription

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });

    // Check that the appropriate error message is set
    expect(result.current.responseMessage).toBe('Failed to Transcript: Transcription failed');
});

});
