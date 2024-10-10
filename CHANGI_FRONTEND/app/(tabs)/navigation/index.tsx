import { StyleSheet, View, Text } from 'react-native';
import NavigationList from '@/components/navigation/NavigationList';
import response from '@/data/response.json';
import AudioRecorderButton from '@/components/button/AudioRecorderButton';
import useAudioRecording from '@/hooks/useAudioRecording';
import { useState } from 'react';

export default function NavigationScreen() {
  const data = response["directions"][0]["instructions"];
  const {
    recording,
    isLoading,
    to,
    from,
    instructions,
    startRecording,
    stopRecording,
  } = useAudioRecording();
  
  // console.log('instruction in index: ', instructions);
  // console.log('from in index: ', from);
  // console.log('to in index: ', to);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <AudioRecorderButton 
          recording={recording}
          isLoading={isLoading}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </View>

      {/* Check if instructions is not empty before rendering */}
      {instructions && instructions.length > 0 ? (
        <View style={styles.sideNavigationContainer}>
          <View>
            <View style={styles.sideHeader}>
              <Text style={{
                fontFamily: 'Inter_18pt-Medium',
                fontSize: 18,
                color: 'black',
                opacity: 0.7
              }}>
                Direction to
              </Text>
              <Text style={{
                fontFamily: 'Inter_24pt-Bold',
                fontSize: 24,
                color: 'black',
              }}>
                { from } | { to }
              </Text>
            </View>
            <View style={styles.sideBody}>
              <Text style={{
                fontFamily: 'Inter_18pt-Medium',
                fontSize: 15,
                color: 'black',
                fontWeight: 'bold'
              }}>
                Steps
              </Text>
              <NavigationList data={instructions} />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
  },
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#C8C8C8',
    flexDirection: 'column',
  },
});
