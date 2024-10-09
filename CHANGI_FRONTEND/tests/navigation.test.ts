import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationScreen from '../app/(tabs)/navigation/index'; // Adjust the import path as necessary

describe('NavigationScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<NavigationScreen />);

    // Check if the main texts are rendered
    expect(getByText('Direction to')).toBeTruthy();
    expect(getByText('GATE C21 | TERMINAL 1')).toBeTruthy();
    expect(getByText('Steps')).toBeTruthy();

    // Check if the bottom sheet is rendered
    const bottomSheet = getByTestId('bottom-sheet'); // You can add a testID to your BottomSheet
    expect(bottomSheet).toBeTruthy();
  });

  it('handles sheet changes', () => {
    const { getByTestId } = render(<NavigationScreen />);
    const bottomSheet = getByTestId('bottom-sheet');

    // Assuming you want to test the handleSheetChanges callback,
    // you can simulate a change and check the console output if necessary.
    // Note: This may require a mock or spy on console.log if you're checking the output.
    // For example:
    // const consoleSpy = jest.spyOn(console, 'log');
    // fireEvent.press(bottomSheet); // simulate an event that would change the sheet
    // expect(consoleSpy).toHaveBeenCalledWith('handleSheetChanges', expect.any(Number));
    // consoleSpy.mockRestore();
  });
});
