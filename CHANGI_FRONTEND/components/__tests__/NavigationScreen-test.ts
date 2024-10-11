import { renderHook, act } from '@testing-library/react-hooks';
import useAudioRecording from '../../hooks/useAudioRecording'; // Adjust the import path
import { Audio } from 'expo-av';
import axios from 'axios';

// Mocking the Audio module and axios
jest.mock('expo-av');
jest.mock('axios');

// Mocking necessary functions
const mockRequestPermission = jest.fn();
const mockStopAndUnloadAsync = jest.fn();
const mockGetURI = jest.fn();
const mockAxiosPost = jest.spyOn(axios, 'post');

// Setting up the audio permissions
(Audio.usePermissions as jest.Mock).mockReturnValue([
  { status: 'granted' },
  mockRequestPermission,
]);

// Mock implementation for creating a recording
(Audio.Recording.createAsync as jest.Mock).mockImplementation(() => {
  return Promise.resolve({ recording: { stopAndUnloadAsync: mockStopAndUnloadAsync, getURI: mockGetURI } });
});

// Clear all mock calls before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('useAudioRecording', () => {
  it('should start recording successfully', async () => {
    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockRequestPermission).not.toHaveBeenCalled();
    expect(Audio.Recording.createAsync).toHaveBeenCalled();
  });

  it('should request permission if not granted', async () => {
    (Audio.usePermissions as jest.Mock).mockReturnValue([
      { status: 'undetermined' },
      mockRequestPermission,
    ]);

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
      await result.current.startRecording();
    });

    expect(mockRequestPermission).toHaveBeenCalled();
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
    
    // Mock upload response
    const mockUploadResponse = { data: { text: 'mock text' } };
    mockAxiosPost.mockResolvedValueOnce(mockUploadResponse); // For audio upload

    // Mock transcription response with valid directions
    const mockTranscriptionResponse = {
        data: {
            isSucceed: true,
            directions: [
                { from: 'A', to: 'B', instructions: [] },
            ],
        },
    };
    mockAxiosPost.mockResolvedValueOnce(mockTranscriptionResponse); // For transcribed text

    const { result } = renderHook(() => useAudioRecording());

    await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
    });

    expect(mockStopAndUnloadAsync).toHaveBeenCalled();
    expect(mockGetURI).toHaveBeenCalled();
    expect(mockAxiosPost).toHaveBeenCalledTimes(2); 
    expect(result.current.from).toBe('A');
    expect(result.current.to).toBe('B');
    expect(result.current.instructions).toEqual([]); // Check if instructions are set correctly
    expect(result.current.responseMessage).toBe(null); // Check if response message is cleared
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
    mockAxiosPost.mockRejectedValueOnce(new Error('Upload failed'));

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
  
    // Mock upload response
    const mockUploadResponse = { data: { text: 'mock text' } };
    mockAxiosPost.mockResolvedValueOnce(mockUploadResponse); // First call for upload
  
    // Mock transcription response with no directions
    const mockTranscriptionResponse = {
      data: {
        isSucceed: true,
        message: 'No directions found',
        directions: [],
      },
    };
  
    mockAxiosPost.mockResolvedValueOnce(mockTranscriptionResponse); // Second call for transcription
  
    const { result } = renderHook(() => useAudioRecording());
  
    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });
  
    expect(result.current.responseMessage).toBe('No directions found');
  });
  
  it('should handle errors when sending transcribed text', async () => {
    const uri = 'mock-uri';
    mockGetURI.mockReturnValue(uri);
  
    const mockUploadResponse = { data: { text: 'mock text' } };
    mockAxiosPost.mockResolvedValueOnce(mockUploadResponse); // Mock upload response
  
    // Mock transcription response
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
      },
    };
  
    // Simulate an error when sending transcribed text
    mockAxiosPost.mockRejectedValueOnce(new Error('Transcription failed'));
  
    const { result } = renderHook(() => useAudioRecording());
  
    await act(async () => {
      await result.current.startRecording();
      await result.current.stopRecording();
    });
  
    
  
    expect(result.current.responseMessage).toBe('Failed to Transcript: Transcription failed');
  });
});
