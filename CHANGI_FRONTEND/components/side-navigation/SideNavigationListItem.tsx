import LeftArrowIcon from "@/icons/LeftArrowIcon";
import RightArrowIcon from "@/icons/RightArrowIcon";
import UpArrowIcon from "@/icons/UpArrowIcon";
import { StyleSheet, View, Text } from "react-native";
import VoiceButton from "../button/VoiceButton";
import colors from "@/constants/colors";

// Type definition for the props of SideNavigationListItem
type NavigationContentProps = {
    instructions: string,  // Instruction text for navigation
    pathDirection: string, // Direction for the navigation path (e.g., "left", "right", "straight")
    mins: string           // Estimated time in minutes for the instruction
};

/**
 * Component: SideNavigationListItemPathPictureArrow
 * 
 * This sub-component returns the appropriate arrow icon based on the 
 * provided path direction. It visually indicates the direction of 
 * the navigation.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.pathDirection - The direction for the navigation path
 * @returns {JSX.Element|null} The corresponding arrow icon or null if no match
 */
const SideNavigationListItemPathPictureArrow = ({pathDirection}: {pathDirection: string}) => {
    if (pathDirection === "straight") {
        return <UpArrowIcon />;
    }

    if (pathDirection === "left") {
        return <LeftArrowIcon />;
    }

    if (pathDirection === "right") {
        return <RightArrowIcon />;
    }

    return null; // Return null if no direction matches
};

/**
 * Component: SideNavigationListItem
 * 
 * This component represents a single item in the side navigation list. 
 * It displays navigation instructions, the estimated time to the next point, 
 * and a voice button for audio instructions. The path direction is indicated 
 * by an arrow icon.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.instructions - Instruction text for the navigation
 * @param {string} props.pathDirection - Direction of the navigation path
 * @param {string} props.mins - Estimated time in minutes for the instruction
 * @returns {JSX.Element} The rendered navigation list item
 */
export default function SideNavigationListItem({instructions, pathDirection, mins}: NavigationContentProps) {

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.voiceButtonContainer}>
                    <VoiceButton audioUri={instructions} />
                </View>
                <View style={styles.bodyContent}>
                    <Text style={styles.instructions}>{instructions}</Text>
                    <View style={styles.durationsContainer}>
                        <Text style={styles.durations}>{mins} min</Text>
                    </View>
                </View>
            </View>
            <View style={styles.pathPictureContainer}>
                <SideNavigationListItemPathPictureArrow pathDirection={pathDirection} />
            </View>
        </View>
    );
}

// Styles for the SideNavigationListItem component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 15,
    },
    pathPictureContainer: {
        width: 70,
        height: 70,
        borderRadius: 3,
        backgroundColor: colors.secondary.fadePurple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30,
        marginRight: 30,
        flex: 1,
    },
    bodyContent: {
        flexDirection: 'column',
        width: 240,
        gap: 8,
    },
    instructions: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: colors.black,
        flexWrap: 'wrap',
        lineHeight: 25,
    },
    durations: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.primary.blackGrey,
        opacity: 0.7,
    },
    durationsContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingTop: 0,
        paddingBottom: 4,
        borderRadius: 4,
        backgroundColor: colors.primary.whiteGrey,
    },
    voiceButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
