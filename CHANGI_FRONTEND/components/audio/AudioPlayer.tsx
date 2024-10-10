// components/AudioPlayer.tsx

import React from 'react';
import { View, Button } from 'react-native';
import * as Speech from 'expo-speech';
import LOGGER from '@/utils/Logger';

interface AudioPlayerProps {
  audioUri: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUri }) => {
  const Logger = LOGGER();

  const playSound = () => {
    if (audioUri) {
      Logger.INFO('Playing Sound');
      Speech.speak(audioUri, {
        language: 'en',
      });
    }
  };

  return (
    <View>
      {audioUri && (
        <Button
          title="Play Sound"
          onPress={playSound}
          color="#32CD32"
        />
      )}
    </View>
  );
};

export default AudioPlayer;