import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import response from '@/data/response.json';
import AudioRecorderButton from '@/components/button/AudioRecorderButton';
import useAudioRecording from '@/hooks/useAudioRecording';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import SideNavigation from '@/components/side-navigation/SideNavigation';
import SideNavigationHeader from '@/components/side-navigation/SideNavigationHead';
import { WebView } from 'react-native-webview';

export default function NavigationScreen() {
  const data = response["directions"][0];
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

  // console.log(isSucceed);
  // console.log('Hi: ', instructions)

  const runFirst = `
  document.querySelector('.camap-search-box').outerHTML = "";
  document.querySelector('.navigate').outerHTML = "";
  document.querySelector('.share-icon').outerHTML = "";

  const style = document.createElement('style');
  style.innerHTML = '.cb-d-md-inline-flex { display: flex !important; flex-direction: column; gap: 10px; } ';
  style.innerHTML += '#terminals-list .camap-terminal-icon { margin: 0 !important; } ';
  style.innerHTML += '.camap-navigation-control { position: static !important; justify-content: flex-start !important; } ';
  style.innerHTML += '#terminals-list { margin-top: 30px !important; } ';
  style.innerHTML += '.camap-terminal-icon .icon { width: 100px !important; } ';
  style.innerHTML += '.changi-map { top: 0px !important; } ';
  document.head.appendChild(style);

  true; // note: this is required, or you'll sometimes get silent failures
  `
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: 'https://www.changiairport.com/en/maps.html#t1.l2/103.99034656584263/1.3623674000421175' }}
          onMessage={(event) => {}}
          injectedJavaScript={runFirst}
        />
        <AudioRecorderButton 
          recording={recording}
          isLoading={isLoading}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </View>

      <SideNavigation 
      isRecording={recording}
      data={{
        isSucceed: isSucceed,
        error: responseMessage,
        message: {
          from: from,
          to: to,
          totalDuration: instructions.reduce((total, instruction) => total + parseInt(instruction.mins), 0),
          instructions: instructions
        }
      }}
      />

      {/* {
      recording ? (<SideNavigationHeader subtitle={"Talk to the mic for directions."} title={"Where to?"} />)  :
      instructions && instructions.length > 0 ? (
        <SideNavigation 
        data={instructions}
        from={from}
        to={to}
        />
      ) : (
        <SideNavigationHeader subtitle={"Talk to the mic for directions."} title={"Where to?"} />
      )} */}

      {/* <SideNavigation 
        isRecording={recording}
        data={{
          isSucceed: isSucceed,
          error: responseMessage,
          message: {
            from: from,
            to: to,
            totalDuration: instructions.reduce((total, instruction) => total + parseInt(instruction.mins), 0),
            instructions: instructions
          }
        }}
      /> */}


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
    flexDirection: 'row',
    
    // backgroundColor: 'grey',
  },
  mapContainer: {
    flex: 1,
    // justifyContent: 'flex-start',
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
