import { StyleSheet, ScrollView, View, Text } from "react-native";
import NavigationContent from "./NavigationContent";
import Cross from "@/icons/Cross";
import NavigationList from "./NavigationList";

export const SideNavigationHeader = ({subtitle, title, icon}: any) => {
    return (
        <View style={styles.sideHeader}>
            <View style={styles.sideHeaderTitle}>
                <Text style={{
                fontFamily: 'Inter_18pt-Medium',
                fontSize: 18,
                color: 'black',
                opacity: 0.7
                }}>
                { subtitle }
                </Text>
                <Text style={{
                fontFamily: 'Inter_24pt-Bold',
                fontSize: 24,
                color: 'black',
                }}>
                { title }
                </Text>  
            </View>
            { icon?? null }
        </View>
    )
}

export default function SideNavigation ({ data, from, to }: any) {

    return (
        <View style={styles.sideNavigationContainer}>
            <View>
                <SideNavigationHeader subtitle={"Direction to"} title={`${ from } | ${ to }`} icon={<Cross />} />
                <View style={styles.sideBody}>
                    <Text style={{
                        fontFamily: 'Inter_18pt-Medium',
                        fontSize: 15,
                        color: 'black',
                        fontWeight: 'bold'
                    }}>
                        Steps
                    </Text>
                    <NavigationList data={data} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sideNavigationContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: '50%'
      },
      sideBody: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingHorizontal: 30,
        paddingVertical: 20,
      },
      sideHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#C8C8C8',
        paddingHorizontal: 30,
        paddingVertical: 20,
      },
      sideHeaderTitle: {
        flexDirection: 'column',
      },
})