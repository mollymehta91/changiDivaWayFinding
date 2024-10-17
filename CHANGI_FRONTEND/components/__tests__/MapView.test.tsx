// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import { Map, MapLoading } from '@/components/MapView'; // Update the path accordingly
// import { ActivityIndicator } from 'react-native';
// import WebView from 'react-native-webview';

// jest.mock('react-native-webview', () => {
//     return jest.fn().mockImplementation(() => {
//         return <div>WebView</div>;
//     });
// });

// describe('MapLoading Component', () => {
//     it('renders loading indicator when loading is true and error is false', () => {
//         const { getByTestId } = render(<MapLoading loading={true} error={false} />);
        
//         expect(getByTestId('loader')).toBeTruthy(); // Ensure loader is present
//     });

//     // it('does not render anything when loading is false', () => {
//     //     const { container } = render(<MapLoading loading={false} error={false} />);
        
//     //     expect(container.children.length).toBe(0); // Ensure nothing is rendered
//     // });

//     // it('does not render loader when there is an error', () => {
//     //    render(<MapLoading loading={true} error={true} />);
        
        

//     //     expect(container.children.length).toBe(0); // Ensure nothing is rendered
//     // });
// });

// describe('Map Component', () => {
//     it('renders without crashing (smoke test)', () => {
//         const { getAllByRole } = render(<Map />);
//         expect(getAllByRole).toBeTruthy(); // Ensure the component renders
//     });

//     it('displays loading indicator on WebView load start', () => {
//         const { getByTestId } = render(<Map />);
        
//         // Simulate loading start
//         fireEvent(getByTestId('webview'), 'loadStart');
        
//         expect(getByTestId('loader')).toBeTruthy(); // Check that the loader is displayed
//     });

//     it('hides loading indicator on WebView load end', () => {
//         const { getByTestId, queryByTestId } = render(<Map />);
        
//         // Simulate loading start
//         fireEvent(getByTestId('webview'), 'loadStart');
        
//         // Simulate load end
//         fireEvent(getByTestId('webview'), 'loadEnd');
        
//         expect(queryByTestId('loader')).toBeNull(); // Ensure loader is not present
//     });

//     it('displays error message on WebView load error', () => {
//         const { getByText, getByTestId } = render(<Map />);
        
//         // Simulate error
//         fireEvent(getByTestId('webview'), 'error');
        
//         expect(getByText('Failed to load the page')).toBeTruthy(); // Check for error message
//     });
// });
