import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

export default function CameraScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await Camera.requestCameraPermission();
    await Camera.requestMicrophonePermission();
  };

  const takePicture = async () => {
    try {
      const photo = await camera.current.takePhoto();
      setPhotoUri('file://' + photo.path);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
  };

  const confirmPhoto = () => {
    // Nayi screen pe navigate karte hue photoUri bhej rahe hain
    navigation.navigate('PhotoPreview', {photoUri});
  };

  if (device == null) return <Text>Loading camera...</Text>;

  return (
    <View style={styles.container}>
      {photoUri ? (
        <>
          <Image source={{uri: photoUri}} style={styles.preview} />
          <View style={styles.controls}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmPhoto}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  preview: {flex: 1, resizeMode: 'cover'},
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
    borderWidth: 3,
    borderColor: '#fff',
  },
  retakeButton: {
    padding: 15,
    backgroundColor: '#ff9800',
    borderRadius: 10,
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
  buttonText: {color: '#fff', fontSize: 16},
});
