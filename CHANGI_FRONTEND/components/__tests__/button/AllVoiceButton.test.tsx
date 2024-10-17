import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AllVoiceButton from '@/components/button/AllVoiceButton'; // Adjust the import based on your file structure
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';

// Mock the Speech API and Logger
jest.mock('expo-speech', () => ({
  speak: jest.fn(),
}));

jest.mock('@/utils/Logger', () => () => ({
  INFO: jest.fn(),
}));

describe('AllVoiceButton Component', () => {
  const mockData = [
    { text: 'Hello' },
    { text: 'Welcome to Changi Airport' },
  ];

  // Smoke Test
  it('renders correctly', () => {
    const { getByRole } = render(<AllVoiceButton data={mockData} />);
    const button = getByRole('button');
    expect(button).toBeTruthy();
  });

  it('plays audio when pressed', () => {
    const { getByRole } = render(<AllVoiceButton data={mockData} />);
    const button = getByRole('button');

    // Simulate button press
    fireEvent.press(button);

    // Check that Speech.speak is called with the correct arguments
    expect(Speech.speak).toHaveBeenCalledTimes(mockData.length);
    expect(Speech.speak).toHaveBeenCalledWith('Hello', { language: 'en' });
    expect(Speech.speak).toHaveBeenCalledWith('Welcome to Changi Airport', { language: 'en' });
  });

  it('logs when playing sound', () => {
    const { getByRole } = render(<AllVoiceButton data={mockData} />);
    const button = getByRole('button');

    // Simulate button press
    fireEvent.press(button);

    // Check that the logger's INFO method is called
    const logger = LOGGER();
    expect(logger.INFO).toHaveBeenCalledWith('Playing Sound');
  });

  it('does not call Speech.speak if no audioUri is provided', () => {
    const { getByRole } = render(<AllVoiceButton data={[]} />);
    const button = getByRole('button');

    // Simulate button press
    fireEvent.press(button);

    // Check that Speech.speak is not called
    expect(Speech.speak).not.toHaveBeenCalled();
  });
});
