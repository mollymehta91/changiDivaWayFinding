import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import SpeakerIcon from '@/icons/SpeakerIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '@/constants/colors';

/**
 * Component: AudioButton
 * 
 * This component represents a button that indicates audio functionality 
 * is enabled. It displays a speaker icon alongside a text label. The 
 * button is styled to have rounded corners and a light background color. 
 * 
 * It can be further enhanced by adding an `onPress` prop to handle 
 * user interactions (e.g., toggling audio settings).
 * 
 * @returns {JSX.Element} The rendered audio button
 */
export default function AudioButton() {
    return (
        <TouchableOpacity style={styles.container}>
            <SpeakerIcon size="big" />
            <Text style={styles.text}>Audio enabled</Text>
        </TouchableOpacity>
    );
}

// Styles for the AudioButton component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        backgroundColor: colors.primary.whiteGrey,
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
    },
});
