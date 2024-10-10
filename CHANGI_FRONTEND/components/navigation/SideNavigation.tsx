import { StyleSheet, ScrollView, View, Text } from "react-native";
import SideNavigationList from "./SideNavigationList";
import { useState } from "react";
import CloseSideNavigationButton from "../button/CloseSideNavigationButton";
import OpenSideNavigationButton from "../button/OpenSideNavigationButton";

export const SideNavigationHeader = ({children, subtitle, title}: any) => {
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
            {children}
        </View>
    )
}

export default function SideNavigation ({ data, from, to }: any) {

    const [isOpen, setIsOpen] = useState(false);


    const openSideNavigation = () => {
        setIsOpen(true);
    }

    const closeSideNavigation = () => {
        setIsOpen(false);
    }


    return (
        <View style={
            {
                ...styles.sideNavigationContainer,
                height: isOpen ? '50%' : '11%'
            }
        }>
            <View>
                <SideNavigationHeader 
                subtitle={"Direction to"} 
                title={`${ from } | ${ to }`}>
                    { isOpen ? <CloseSideNavigationButton onPress={closeSideNavigation} /> : <OpenSideNavigationButton onPress={openSideNavigation} /> }
                </SideNavigationHeader>
                <View style={styles.sideBody}>
                    <Text style={{
                        fontFamily: 'Inter_18pt-Medium',
                        fontSize: 15,
                        color: 'black',
                        fontWeight: 'bold'
                    }}>
                        Steps
                    </Text>
                    <SideNavigationList data={data} />
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