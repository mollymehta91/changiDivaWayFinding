import { StyleSheet, View, Text } from "react-native";
import FromToDotTrailsIcon from "@/icons/FromToDotTrailsIcon";
import WalkingManIcon from "@/icons/WalkingManIcon";
import colors from "@/constants/colors";

const LocationContainer = ({locationName, disclaimer}: any) => {

  if (!disclaimer || disclaimer === "") {
    <View style={styles.locationContainer}>
      <Text style={styles.title}>
          {locationName}
      </Text>
    </View>
  }

  return (
    <View style={styles.locationContainer}>
      <Text style={styles.title}>
          {locationName}
      </Text>
      <Text style={styles.disclaimer}>
          {disclaimer}
      </Text>
    </View>
  );
}

/**
 * Component: SideNavigationHead
 * 
 * This component displays the header of the side navigation with 
 * the origin and destination of the route, along with the total 
 * duration of the journey. It includes visual elements such as 
 * icons and text to provide a clear overview of the navigation details.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.origin - The starting point of the journey
 * @param {string} props.destination - The endpoint of the journey
 * @param {string} props.totalDuration - Estimated time to reach the destination
 * @param {function} props.onPressExitButton - Function to handle exit button press
 * @returns {JSX.Element} The rendered side navigation header
 */
export default function SideNavigationHead ({origin, destination, totalDuration, onPressExitButton }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <FromToDotTrailsIcon 
                numberOfSmallCircles={origin.disclaimer ? 7 : 6}
                style={styles.titleIcon} />
                <View style={styles.content}>
                    <View style={{
                        ...styles.titleContent,
                        gap: origin.disclaimer ? 20 : 10
                    }}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.subtitle}>
                                From
                            </Text>
                            <LocationContainer locationName={origin.locationName} disclaimer={origin.disclaimer} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.subtitle}>
                                To
                            </Text>
                            <View style={styles.destinationContainer}>
                                <LocationContainer locationName={destination.locationName} disclaimer={destination.disclaimer} />
                                <View style={styles.totalDurationContainer}>
                                    <WalkingManIcon />
                                    <Text style={styles.totalDurationText}>{totalDuration} min away</Text>                              
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

// Styles for the SideNavigationHead component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 500,
        borderBottomWidth: 0.5,
        borderColor: colors.primary.darkGrey,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    body: {
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        marginRight: 40,
        flexDirection: 'column',
        gap: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    titleContent: {
        flexDirection: 'column',
        gap: 9,
    },
    titleContainer: {
        flexDirection: 'column',
    },
    titleIcon: {
        marginTop: 3,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        flexWrap: 'wrap',
        width: 200,
        color: colors.black,
    },
    subtitle: {
        fontFamily: 'Lato-Regular',
        fontSize: 17,
        color: colors.black,
        opacity: 0.7,
        lineHeight: 17,
    },
    destinationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalDurationContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        backgroundColor: colors.primary.whiteGrey,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        height: 40
    },
    totalDurationText: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
    },
    locationContainer: {
        flexDirection: 'column',
        gap: 5,
    },
    disclaimer: {
        fontFamily: 'Lato-Italic',
        fontSize: 14,
        color: colors.black,
        opacity: 0.7,
        lineHeight: 14,
        width: 230,
        flexWrap: 'wrap'
    },
});