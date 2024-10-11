import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
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
    isSucceed,
    to,
    from,
    instructions,
    responseMessage,
    startRecording,
    stopRecording,
  } = useAudioRecording();
  
  // // Show the modal if there's an error message
  // const [errorModalVisible, setErrorModalVisible] = useState(false);
  // if (!isSucceed && responseMessage) {
  //   setErrorModalVisible(true);
  // }

  // // Show the modal if there's no direction
  // const [messageModalVisible, setMessageModalVisible] = useState(false);
  // if (isSucceed && responseMessage) {
  //   setMessageModalVisible(true);
  // }

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

      {/* Modal for message */}
      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={messageModalVisible}
        onRequestClose={() => {
          setMessageModalVisible(!messageModalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorMessage}>{responseMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMessageModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      {/* Modal for error message */}
      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!errorModalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorMessage}>{responseMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setErrorModalVisible(false)}>
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
});
