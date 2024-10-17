import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpeakerIcon from '@/icons/SpeakerIcon';
import colors from '@/constants/colors';

/**
 * Component: ExitNavigationButton
 * 
 * This component represents a button that allows users to exit navigation mode. 
 * It displays a text label indicating the action and is styled with a distinctive 
 * background color. When pressed, it triggers the `onPress` function provided via props.
 * 
 * @param {Object} props - Component properties
 * @param {function} props.onPress - Callback function to be called when the button is pressed
 * @returns {JSX.Element} The rendered exit navigation button
 */
export default function NavigationButton({ onPress }: any) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>End navigation</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.primary.purple,
        borderWidth: 2.5,
        gap: 10,
        width: 400,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.white, // Red background to signify an exit action
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: colors.primary.purple, // White text for contrast against the red background
    },
});
