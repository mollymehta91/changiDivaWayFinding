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
                    <Text style={styles.bodyText}>{instructions}</Text>
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
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginLeft: 30,
        flex: 1,
    },
    bodyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyText: {
        fontFamily: 'Inter_18pt-Medium',
        fontSize: 15,
        color: 'black',
        width: 200,
        flexWrap: 'wrap',
    }
})