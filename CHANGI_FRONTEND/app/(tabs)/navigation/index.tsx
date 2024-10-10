import { StyleSheet, View, Text } from 'react-native';
import NavigationList from '@/components/navigation/NavigationList';
import response from '@/data/response.json';
import AudioRecorderButton from '@/components/button/AudioRecorderButton';
import AudioRecorder from '@/components/audio/AudioRecorder';
import VoiceButton from '@/components/button/VoiceButton';

export default function NavigationScreen() {

  const data = response["directions"][0]["instructions"]

  return (
    <View style={styles.container}>
      {/* <AudioRecorder /> */}
      
      <View style={styles.mapContainer}>
        <AudioRecorderButton />
      </View>
      <View style={styles.sideNavigationContainer}>
        <View
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
            <NavigationList data={data} />
         </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
    width: '35%'
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
});
