import { StyleSheet, ScrollView, View } from "react-native";
import SideNavigationListItem from "./SideNavigationListItem";
import colors from "@/constants/colors";
import React from "react";

/**
 * Component: SideNavigationList
 * 
 * This component renders a scrollable list of navigation instructions. 
 * Each instruction is represented as an item, displaying the text, 
 * direction, and estimated time to reach the next point. It utilizes 
 * the SideNavigationListItem component for rendering individual list items.
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.data - Array of navigation instruction objects, each containing:
 *   - {string} text - Instruction text to display
 *   - {string} direction - Direction of the navigation
 *   - {number} mins - Estimated time in minutes for the instruction
 * @returns {JSX.Element} The rendered scrollable list of navigation instructions
 */
export default function SideNavigationList({ data }: any) {
    return (
        <ScrollView style={styles.navigationContentList} showsVerticalScrollIndicator={false}>
            <View style={styles.listContainer}>
                {
                    data.map((item: any, index: number) => {
                        return (
                            <SideNavigationListItem 
                                instructions={item.text} 
                                pathDirection={item.direction} 
                                mins={item.mins} 
                                key={index} 
                            />   
                        );
                    })
                }        
            </View>
        </ScrollView>
    );
}

// Styles for the SideNavigationList component
const styles = StyleSheet.create({
    navigationContentList: {
        marginTop: 10,
        // height: 320,
        height: 410,
        marginRight: 100,
        flexDirection: 'column',
        width: '100%',
    },
    listContainer: {
        gap: 24,
    },
});
