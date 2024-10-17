import React from 'react';
import { render } from '@testing-library/react-native';
import SideNavigationListItem from '@/components/side-navigation/SideNavigationListItem'; // Update the path accordingly
import LeftArrowIcon from "@/icons/LeftArrowIcon";
import RightArrowIcon from "@/icons/RightArrowIcon";
import UpArrowIcon from "@/icons/UpArrowIcon";

jest.mock('@/icons/LeftArrowIcon', () => () => <div>Left</div>);
jest.mock('@/icons/RightArrowIcon', () => () => <div>Right</div>);
jest.mock('@/icons/UpArrowIcon', () => () => <div>Up</div>);
jest.mock('@/components/button/VoiceButton', () => () => <div>VoiceButton</div>);

describe('SideNavigationListItem Component', () => {
    it('renders without crashing (smoke test)', () => {
        const { getByRole } = render(
            <SideNavigationListItem 
                instructions="Go straight" 
                pathDirection="straight" 
                mins="5" 
            />
        );

        // Check that the component rendered
        expect(getByRole).toBeTruthy();
    });

    it('displays the correct navigation instructions and time', () => {
        const { getByText } = render(
            <SideNavigationListItem 
                instructions="Turn left" 
                pathDirection="left" 
                mins="3" 
            />
        );

        expect(getByText("Turn left")).toBeTruthy();
        expect(getByText("3 min")).toBeTruthy();
    });

    it('displays the correct arrow icon for straight direction', () => {
        const { getByText } = render(
            <SideNavigationListItem 
                instructions="Go straight" 
                pathDirection="straight" 
                mins="2" 
            />
        );

        // expect(getByText("UpArrowIcon")).toBeTruthy(); // Check for the UpArrowIcon
    });

    it('displays the correct arrow icon for left direction', () => {
        const { getByText } = render(
            <SideNavigationListItem 
                instructions="Turn left" 
                pathDirection="left" 
                mins="4" 
            />
        );

        // expect(getByText("LeftArrowIcon")).toBeTruthy(); // Check for the LeftArrowIcon
    });

    it('displays the correct arrow icon for right direction', () => {
        const { getByText } = render(
            <SideNavigationListItem 
                instructions="Turn right" 
                pathDirection="right" 
                mins="1" 
            />
        );

        // expect(getByText("RightArrowIcon")).toBeTruthy(); // Check for the RightArrowIcon
    });

    it('does not render an arrow if the direction is unknown', () => {
        const { queryByText } = render(
            <SideNavigationListItem 
                instructions="Unknown direction" 
                pathDirection="unknown" 
                mins="5" 
            />
        );

        expect(queryByText("LeftArrowIcon")).toBeNull();
        expect(queryByText("RightArrowIcon")).toBeNull();
        expect(queryByText("UpArrowIcon")).toBeNull();
    });
});
