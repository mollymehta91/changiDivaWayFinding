import {GestureResponderEvent, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CrossIcon from '@/icons/CrossIcon';

type CallbackFunctions = ((event: GestureResponderEvent) => void) | undefined

const CloseSideNavigationButton = ({ onPress } : any) => {
  
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
        <CrossIcon />
    </TouchableOpacity>
  );
};

export default CloseSideNavigationButton;

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});