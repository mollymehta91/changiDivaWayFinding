import { StyleSheet, ScrollView, View, Text } from "react-native";
import SideNavigationContent from "./SideNavigationContent";

export default function SideNavigationList ({ data }: any) {

    return (
    <ScrollView style={styles.navigationContentList} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
            {
                data.map((item: any, index: number) => {             
                    return (
                        <SideNavigationContent instructions={item.text} pathDirection={item.direction} mins={item.mins} key={index}/>   
                    )
                })
            }
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    navigationContentList: {
        marginVertical: 10,
        paddingBottom: 10,
        marginRight: 100,
        flexDirection: 'column',
        width: '100%',
    },
    listContainer: {
        paddingBottom: 180
    }
})