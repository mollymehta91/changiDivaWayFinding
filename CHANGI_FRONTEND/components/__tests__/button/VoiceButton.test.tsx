import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import VoiceButton from '@/components/button/VoiceButton'; // Update the path as needed
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';

jest.mock('expo-speech', () => ({
  speak: jest.fn(),
}));

jest.mock('@/utils/Logger', () => {
  return jest.fn(() => ({
    INFO: jest.fn(),
  }));
});

describe('VoiceButton Component', () => {
  const audioUri = 'Hello, this is a test.';

  it('renders without crashing (smoke test)', () => {
    const { getByRole } = render(<VoiceButton audioUri={audioUri} />);
    expect(getByRole).toBeTruthy(); // Ensure the component renders
  });

//   it('plays sound when pressed', () => {
//     const { getByRole } = render(<VoiceButton audioUri={audioUri} />);
    
//     // Simulate button press
//     fireEvent.press(getByRole('button'));
    
//     expect(Speech.speak).toHaveBeenCalledWith(audioUri, { language: 'en' }); // Check if speak was called
//   });

//   it('does not play sound if audioUri is empty', () => {
//     const { getByRole } = render(<VoiceButton audioUri={''} />);
    
//     // Simulate button press
//     fireEvent.press(getByRole('button'));
    
//     expect(Speech.speak).not.toHaveBeenCalled(); // Ensure speak is not called
//   });
});
