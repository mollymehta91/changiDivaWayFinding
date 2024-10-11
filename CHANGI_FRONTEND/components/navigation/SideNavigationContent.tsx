import LeftArrowIcon from "@/icons/LeftArrowIcon";
import RightArrowIcon from "@/icons/RightArrowIcon";
import UpArrowIcon from "@/icons/UpArrowIcon";
import { StyleSheet, View, Text } from "react-native";
import VoiceButton from "../button/VoiceButton";

type NavigationContentProps = {
    instructions:  string,
    pathDirection: string
}

const SideNavigationContentPath = ({pathDirection}: {pathDirection: string}) => {
    
    if (pathDirection === "straight") {
      return (
          <UpArrowIcon />
      )  
    }

    if (pathDirection === "left") {
        return (
            <LeftArrowIcon />
        )
    }

    if (pathDirection === "right") {
        return (
            <RightArrowIcon />
        )
    }
}

export default function SideNavigationContent ({instructions, pathDirection}: NavigationContentProps) {

    return (
        <View style={styles.container}>
            <View style={styles.pathContainer}>
                <SideNavigationContentPath pathDirection={pathDirection} />
            </View>
            
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.title}>{instructions}</Text>
                    <Text style={styles.subTitle}>2 mins</Text>
                </View>
                <View style={styles.voiceButtonContainer}>
                    <VoiceButton audioUri={instructions}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
        height: 70,
    },
    pathContainer: {
        width: 70,
        borderRadius: 3,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 30,
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: 'green'
    },
    bodyContent: {
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    title: {
        fontFamily: 'Inter_18pt-Medium',
        fontSize: 12.7,
        color: 'black',
        width: 200,
        flexWrap: 'wrap',
        // backgroundColor: 'blue',
    },
    subTitle: {
        fontFamily: 'Inter_18pt-Medium',
        fontSize: 12.7,
        color: 'black',
        opacity: 0.7,
        width: 200,
    },
    voiceButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})