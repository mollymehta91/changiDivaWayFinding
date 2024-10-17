import React from 'react';
import { render } from '@testing-library/react-native';
import SideNavigation from '@/components/side-navigation/SideNavigation'; // Adjust the import path as necessary

describe('SideNavigation', () => {
    it('renders without crashing and displays the home page when isRecording is true', () => {
        const data = { directions: { instructions: [] }, errorMessage: null, isSucceed: false };

        const { getByText } = render(<SideNavigation isRecording={true} data={data} />);

        expect(getByText('Welcome to Changi')).toBeTruthy();
        expect(getByText('Get directions by pressing and talking to the mic.')).toBeTruthy();
    });

    it('renders without crashing and displays the home page when there are no instructions and no error', () => {
        const data = { directions: { instructions: [] }, errorMessage: null, isSucceed: false };

        const { getByText } = render(<SideNavigation isRecording={false} data={data} />);

        expect(getByText('Welcome to Changi')).toBeTruthy();
        expect(getByText('Get directions by pressing and talking to the mic.')).toBeTruthy();
    });

    it('renders the error message when there is an error', () => {
        const data = { directions: { instructions: [] }, errorMessage: 'An error occurred', isSucceed: false };

        const { getByText } = render(<SideNavigation isRecording={false} data={data} />);

        expect(getByText('An error occurred')).toBeTruthy();
    });

    it('renders navigation instructions when data is valid', () => {
        const data = {
            directions: {
                instructions: [{ text: 'Go to the gate', duration: '5 mins' }],
                from: 'Point A',
                to: 'Point B',
                totalDuration: '5 mins'
            },
            errorMessage: null,
            isSucceed: true
        };

        const { getByText } = render(<SideNavigation isRecording={false} data={data} />);

        expect(getByText('STEPS')).toBeTruthy();
        expect(getByText('Go to the gate')).toBeTruthy();
    });
});
