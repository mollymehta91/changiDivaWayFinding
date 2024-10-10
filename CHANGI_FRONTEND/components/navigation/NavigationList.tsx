import { StyleSheet, ScrollView, View, Text } from "react-native";
import NavigationContent from "./NavigationContent";

export default function NavigationList ({ data }: any) {

    return (
    <ScrollView style={styles.navigationContentList}>
        {
            data.map((item: any, index: number) => {             
                console.log(item)
                return (
                    <NavigationContent instructions={item.text} pathDirection={item.direction} key={index}/>
                )
            })
        }
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    navigationContentList: {
        marginVertical: 10,
        marginRight: 100,
        flexDirection: 'column',
        paddingRight: 50,
        width: '100%'
    }
})