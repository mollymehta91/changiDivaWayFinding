import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import NavigationList from '@/components/navigation/NavigationList';
import response from '@/data/response.json';
import AudioRecorderButton from '@/components/button/AudioRecorderButton';
import useAudioRecording from '@/hooks/useAudioRecording';
import { useState } from 'react';
import { Image } from 'expo-image';
import Cross from '@/icons/Cross';
import SideNavigation, { SideNavigationHeader } from '@/components/navigation/SideNavigation';

export default function NavigationScreen() {
  const data = response["directions"][0]["instructions"];
  const {
    recording,
    isLoading,
    isSucceed,
    to,
    from,
    instructions,
    errorMessage,
    startRecording,
    stopRecording,
  } = useAudioRecording();
  
  // const [modalVisible, setModalVisible] = useState(false);

  // // Show the modal if there's an error message
  // if (isSucceed && errorMessage) {
  //   setModalVisible(true);
  // }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/map.png")}
        contentFit="cover"
      />      
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
        <SideNavigation 
        data={instructions}
        from={from}
        to={to}
        />
      ) : (
        <SideNavigationHeader subtitle={"Talk to the mic for directions."} title={"Where to?"} />
      )}

      {/* Modal for error message */}
      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'grey',
  },
  mapContainer: {
    // flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: 'grey',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 20,
    fontSize: 18,
    color: 'red',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0553',
  },
});
