import { StyleSheet, ScrollView, View, Text } from "react-native";
import SideNavigationList from "./SideNavigationList";
import { useState } from "react";
import SideNavigationHead from "./SideNavigationHead";
import ChangiLogoIcon from "@/icons/ChangiLogoIcon";
import colors from "@/constants/colors";
import NavigationButton from "../button/NavigationButton";
import AllVoiceButton from "../button/AllVoiceButton";
import React from "react";

/**
 * Component: SideNavigationContainer
 * 
 * This component serves as a wrapper for the side navigation UI. 
 * It includes a header with a logo and renders any child components 
 * passed to it. The container provides a consistent style for the 
 * side navigation layout.
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to render within the container
 */

const SideNavigationHeader = ({ children }: any) => (
    <View style={styles.header}>
        <View style={styles.headerLogoContainer}>
            <ChangiLogoIcon />
        </View>
        {children}
    </View>
)

function SideNavigationContainerWithAllAudioButton ({ children, data }: any) { 
    return (
        <View style={styles.container}>
            <SideNavigationHeader>
                <View style={styles.allVoiceButtonContainer}>
                    <AllVoiceButton data={data} />
                </View>
            </SideNavigationHeader>
            {children}
        </View>   
   )
}

const SideNavigationContainer = ({ children }: any) => (
    <View style={styles.container}>
        <SideNavigationHeader />
        {children}
    </View>    
);

/**
 * Component: SideNavigationHomePage
 * 
 * This component represents the home page of the side navigation. 
 * It displays a welcome message and instructions for users on how 
 * to interact with the navigation system. It utilizes the 
 * SideNavigationContainer to maintain consistent layout.
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to render within the container
 */
const SideNavigationHomePage = ({ children }: any) => (
    <SideNavigationContainer>
        <View style={homeStyles.body}>
            <View style={homeStyles.textContainer}>
                <Text style={homeStyles.title}>Welcome to Changi</Text>
                <Text style={homeStyles.subtitle}>Get directions by pressing and talking to the mic.</Text>
            </View>
        </View>            
    </SideNavigationContainer>    
);

/**
 * Component: SideNavigation
 * 
 * This is the main component for the side navigation, which renders 
 * different views based on the recording state and the data provided. 
 * It handles different scenarios, such as when the user is recording, 
 * encountering an error, or viewing navigation instructions.
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.isRecording - Indicates if audio recording is in progress
 * @param {Object} props.data - Contains navigation data and error messages
 * @returns {JSX.Element} The rendered side navigation component
 */
export default function SideNavigation({ isRecording, data }: any) {

    // If there are no successful directions or instructions, render the home page
    if (isRecording || (!data.errorMessage && !data.isSucceed && data.directions.instructions && data.directions.instructions.length === 0)) {
        return (
            <SideNavigationHomePage />
        );
    }

    // If there's an error message in the data, display it
    if (data.errorMessage) {
        return (
            <SideNavigationContainer>
                <View style={errorStyles.body}>
                    <Text style={errorStyles.title}>{data.errorMessage}</Text>
                </View>
            </SideNavigationContainer>
        );
    }
    
    // Render the main content of the side navigation when data is valid
    return (
        <SideNavigationContainerWithAllAudioButton data={data.directions.instructions}>
            <View style={styles.content}>
                <SideNavigationHead 
                    origin={data.directions.from} 
                    destination={data.directions.to} 
                    totalDuration={data.directions.totalDuration} 
                />
                <View style={styles.body}>
                    <View style={styles.bodyHeader}>
                        <Text style={styles.bodyHeaderText}>STEPS</Text>
                    </View>
                    <SideNavigationList data={data.directions.instructions} />
                </View>
                {/* <View style={styles.navigationButtonContainer}>
                    <NavigationButton />
                </View> */}
            </View>
        </SideNavigationContainerWithAllAudioButton>
    );
}

// Styles for the side navigation container and its components
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: colors.white,
        width: 450,
        height: '100%',
        top: 24,
        position: 'absolute',
        left: 830,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 30,
        paddingTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLogoContainer: {
        flexDirection: 'row',
    },
    body: {
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 0,
        // borderBottomWidth: 0.5,
        // borderColor: colors.primary.darkGrey,
    },
    content: {
        flexDirection: 'column',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        width: 500,
        borderColor: colors.primary.smokeGrey,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    bodyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bodyHeaderText: {
        fontFamily: 'Lato-Bold',
        letterSpacing: 2,
        fontSize: 15,
        color: colors.black,
        fontWeight: 'bold',
    },
    navigationButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
    },
    allVoiceButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    }
});

// Styles for error display
const errorStyles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
        color: colors.primary.purple,
        fontSize: 20,
        width: 300,
    }
});

// Styles for the home page display
const homeStyles = StyleSheet.create({
    body: {
        flex: 1,
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 50,
        marginLeft: 30,
    },
    title: {
        flexWrap: 'wrap',
        fontFamily: 'Lato-Bold',
        color: colors.black,
        lineHeight: 40,
        fontSize: 30,
        width: 400,
    },
    subtitle: {
        flexWrap: 'wrap',
        fontFamily: 'Lato-Regular',
        color: colors.black,
        fontSize: 17,
        lineHeight: 20,
        width: 400,
    },
});
