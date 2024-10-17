import React from 'react';
import { render } from '@testing-library/react-native';
import SideNavigationHead from '@/components/side-navigation/SideNavigationHead'; // Update the path accordingly

describe('SideNavigationHead Component', () => {
    it('renders without crashing (smoke test)', () => {
        const { getByRole } = render(
            <SideNavigationHead 
                origin={{ locationName: "Terminal 1", disclaimer: "" }} 
                destination={{ locationName: "Terminal 3", disclaimer: "" }} 
                totalDuration="15"
            />
        );
        
        // Check that the component rendered
        expect(getByRole).toBeTruthy();
    });

    it('should display the origin, destination, and total duration correctly', () => {
        const { getByText } = render(
            <SideNavigationHead 
                origin={{ locationName: "Terminal 1", disclaimer: "" }} 
                destination={{ locationName: "Terminal 3", disclaimer: "" }} 
                totalDuration="15"
            />
        );
        
        expect(getByText('From')).toBeTruthy();
        expect(getByText('Terminal 1')).toBeTruthy();
        expect(getByText('To')).toBeTruthy();
        expect(getByText('Terminal 3')).toBeTruthy();
        expect(getByText('15 min away')).toBeTruthy();
    });

    it('should display the disclaimer when provided', () => {
        const { getByText } = render(
            <SideNavigationHead 
                origin={{ locationName: "Terminal 1", disclaimer: "Important: Check security" }} 
                destination={{ locationName: "Terminal 3", disclaimer: "Note: Gate changes possible" }} 
                totalDuration="15"
            />
        );

        expect(getByText('Important: Check security')).toBeTruthy();
        expect(getByText('Note: Gate changes possible')).toBeTruthy();
    });
});
