import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Camera, {
  Aspect,
  RotateMode,
  CaptureQuality,
} from 'react-native-openalpr';

const OpenCamera = () => {
  const [currentPlate, setPlate] = useState();
  const [currentConfidence, setConfidence] = useState();

  const onPlateRecognized = ({plate, confidence}: any) => {
    setPlate(plate);
    setConfidence(confidence);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentPlate} {currentConfidence}
      </Text>
      <Camera
        country="eu"
        touchToFocus
        showPlateOutline
        aspect={Aspect.fill}
        style={styles.camera}
        rotateMode={RotateMode.on}
        plateOutlineColor="#ff0000"
        onPlateRecognized={onPlateRecognized}
        captureQuality={CaptureQuality.medium}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  camera: {
    flex: 0.8,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ff0000',
  },
});

export default OpenCamera;
