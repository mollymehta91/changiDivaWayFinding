import React, { useRef, useState, useCallback } from 'react';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';

export default function NavigationScreen() {

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapPointIndex, setSnapPointIndex] = useState(1);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <View style={styles.container}>
      <View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
        index={snapPointIndex}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{ borderRadius: 10 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetContainer}
        >
         <View style={styles.sideHeader}>
           <Text
           style={{
            fontFamily: 'Inter_18pt-Medium',
            fontSize: 18,
            color: 'black',
            opacity: 0.7
           }}
           >Direction to</Text>
           <Text
           style={{
            fontFamily: 'Inter_24pt-Bold',
            fontSize: 24,
            color: 'black',
           }}
           >GATE C21 | TERMINAL 1</Text>
         </View>
         <View style={styles.sideBody}>
            <Text
            style={{
              fontFamily: 'Inter_18pt-Medium',
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold'
            }}
            >Steps</Text>
            <ScrollView style={styles.navigationContentList}>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                  <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                  <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                  <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
              <View style={styles.navigationContent}>
                <View style={styles.navigationContentPicture}></View>
                <View style={styles.navigationContentBody}>
                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Medium',
                    fontSize: 15,
                    color: 'black',
                    marginBottom: 5
                  }}
                  >Walk straight along the alley into <Text style={{fontWeight: 'bold'}}>the shopping center</Text></Text>
                  <Text>2 min</Text>
                </View>
              </View>
            </ScrollView>
         </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-Regular',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomSheetContainer: {
  },
  sideBody: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  sideHeader: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#C8C8C8',
    flexDirection: 'column',
  },
  navigationContent: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  navigationContentPicture: {
    width: 70,
    height: 70,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
  },
  navigationContentBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 30,
  },
  navigationContentList: {
    marginVertical: 10,
    marginRight: 100,
    flexDirection: 'column',
  }
});
