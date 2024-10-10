import LeftArrow from "@/icons/LeftArrow";
import RightArrow from "@/icons/RightArrow";
import UpArrow from "@/icons/UpArrow";
import { StyleSheet, View, Text } from "react-native";
import VoiceButton from "../button/VoiceButton";

type NavigationContentProps = {
    instructions:  string,
    pathDirection: string
}

const NavigationContentPath = ({pathDirection}: {pathDirection: string}) => {
    
    if (pathDirection === "straight") {
      return (
          <UpArrow />
      )  
    }

    if (pathDirection === "left") {
        return (
            <LeftArrow />
        )
    }

    if (pathDirection === "right") {
        return (
            <RightArrow />
        )
    }
}

export default function NavigationContent ({instructions, pathDirection}: NavigationContentProps) {

    return (
        <View style={styles.container}>
            <View style={styles.pathContainer}>
                <NavigationContentPath pathDirection={pathDirection} />
            </View>
            
            <View style={styles.body}>
                <Text style={styles.bodyText}>{instructions}</Text>
                {/* <VoiceButton /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    pathContainer: {
        width: 70,
        height: 70,
        borderRadius: 3,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 30
    },
    bodyText: {
        fontFamily: 'Inter_18pt-Medium',
        fontSize: 15,
        color: 'black',
        marginBottom: 5
    }
})