// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import AudioRecorderButton from '@/components/button/AudioRecorderButton'; // Update the path as needed
// import { MaterialIndicator, PulseIndicator } from 'react-native-indicators';
// import Microphone from '@/icons/MicrophoneIcon';
// import { View } from 'react-native';


// // jest.mock('react-native-indicators', () => ({
// //   MaterialIndicator: jest.fn(() => <View></View>),
// //   PulseIndicator: jest.fn(() => <View></View>),
// // }));

// describe('AudioRecorderButton Component', () => {
//   const startRecordingMock = jest.fn();
//   const stopRecordingMock = jest.fn();

//   it('renders without crashing (smoke test)', () => {
//     const { getAllByRole } = render(
//       <AudioRecorderButton
//         recording={false}
//         isLoading={false}
//         startRecording={startRecordingMock}
//         stopRecording={stopRecordingMock}
//       />
//     );
//     expect(getAllByRole).toBeTruthy(); // Ensure the component renders
//   });

//   it('displays the microphone icon when not recording and not loading', () => {
//     const { getByText } = render(
//       <AudioRecorderButton
//         recording={false}
//         isLoading={false}
//         startRecording={startRecordingMock}
//         stopRecording={stopRecordingMock}
//       />
//     );
//     expect(getByText('Loading...')).toBeFalsy();
//     expect(getByText('Recording...')).toBeFalsy();
//   });

//   it('displays the loading indicator when isLoading is true', () => {
//     const { getByText } = render(
//       <AudioRecorderButton
//         recording={false}
//         isLoading={true}
//         startRecording={startRecordingMock}
//         stopRecording={stopRecordingMock}
//       />
//     );
//     expect(getByText('Loading...')).toBeTruthy(); // Check if loading indicator is shown
//   });

//   it('displays the pulse indicator when recording', () => {
//     const { getByText } = render(
//       <AudioRecorderButton
//         recording={true}
//         isLoading={false}
//         startRecording={startRecordingMock}
//         stopRecording={stopRecordingMock}
//       />
//     );
//     expect(getByText('Recording...')).toBeTruthy(); // Check if pulse indicator is shown
//   });

//   it('calls startRecording when pressed and not recording', () => {
//     const { getByRole } = render(
//       <AudioRecorderButton
//         recording={false}
//         isLoading={false}
//         startRecording={startRecordingMock}
//         stopRecording={stopRecordingMock}
//       />
//     );
//     fireEvent.press(getByRole('button'));
//     expect(startRecordingMock).toHaveBeenCalled(); // Ensure startRecording is called
//     expect(stopRecordingMock).not.toHaveBeenCalled(); // Ensure stopRecording is not called
//   });

//   it('calls stopRecording when pressed and recording', () => {
//     const { getByRole } = render(
//       <AudioRecorderButton
//         recording={true}
//         isLoading={false}
//         startRecording={startRecordingMock}
//         stopRecording={stopRecordingMock}
//       />
//     );
//     fireEvent.press(getByRole('button'));
//     expect(stopRecordingMock).toHaveBeenCalled(); // Ensure stopRecording is called
//     expect(startRecordingMock).not.toHaveBeenCalled(); // Ensure startRecording is not called
//   });
// });
