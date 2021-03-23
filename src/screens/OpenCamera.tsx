import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Validation, {ValidationRefProps} from '../components/Validation';
import Menu from '../components/Menu';
import {Props} from '../routes/app.routes';

import Camera, {
  Aspect,
  TorchMode,
  RotateMode,
  CaptureQuality,
} from 'react-native-openalpr';

const OpenCamera: React.FC<Props> = ({route}) => {
  const {visibleMenu} = route.params;
  const [currentPlate, setCurrentPlate] = useState('');
  const [flashEnable, setFlashEnable] = useState(false);
  const [landscapeEnable, setLandscapeEnable] = useState(true);

  const validation_ref = useRef<ValidationRefProps>(null);

  const onPlateRecognized = ({plate}: any) => {
    setCurrentPlate(plate);
  };

  const onValidationModal = (plate: string) => {
    if (currentPlate) {
      validation_ref.current?.open(plate);
    }
  };

  return (
    <View style={styles.container}>
      {visibleMenu && (
        <Menu
          flashEnable={flashEnable}
          setFlashEnable={setFlashEnable}
          landscapeEnable={landscapeEnable}
          setLandscapeEnable={setLandscapeEnable}
        />
      )}
      <Camera
        country="eu"
        touchToFocus
        showPlateOutline
        aspect={Aspect.fill}
        style={styles.camera}
        rotateMode={landscapeEnable ? RotateMode.on : RotateMode.off}
        torchMode={flashEnable ? TorchMode.on : TorchMode.off}
        plateOutlineColor="#b900e7"
        onPlateRecognized={onPlateRecognized}
        captureQuality={CaptureQuality.medium}
      />

      <Text style={styles.plateText}>{currentPlate}</Text>

      <View style={styles.takePictureContainer}>
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => onValidationModal(currentPlate)}>
          <Icon name="camera" size={42} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Validation ref={validation_ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  plateText: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 30,
    color: '#b900e7',
  },
  takePictureContainer: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  takePictureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b900e7',
  },
});

export default OpenCamera;
