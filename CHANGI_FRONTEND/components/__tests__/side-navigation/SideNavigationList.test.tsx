import React from 'react';
import { render } from '@testing-library/react-native';
import SideNavigationList from '@/components/side-navigation/SideNavigationList'; // Update the path accordingly

describe('SideNavigationList Component', () => {
    it('renders without crashing (smoke test)', () => {
        const { getByRole } = render(
            <SideNavigationList data={[]} />
        );

        // Check that the component rendered
        expect(getByRole).toBeTruthy();
    });

    it('renders a list of navigation instructions correctly', () => {
        const mockData = [
            { text: "Go straight", direction: "North", mins: 5 },
            { text: "Turn left", direction: "West", mins: 3 },
            { text: "Arrive at destination", direction: "End", mins: 0 },
        ];

        const { getByText } = render(
            <SideNavigationList data={mockData} />
        );

        // Check that each instruction is rendered
        mockData.forEach(item => {
            expect(getByText(item.text)).toBeTruthy();
        });
    });

    it('renders an empty list when no data is provided', () => {
        const { getByText } = render(
            <SideNavigationList data={[]} />
        );

        // Check that no instructions are rendered
        expect(() => getByText("Go straight")).toThrow();
        expect(() => getByText("Turn left")).toThrow();
    });
});
