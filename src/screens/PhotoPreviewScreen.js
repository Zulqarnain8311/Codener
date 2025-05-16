import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function PhotoPreviewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {photoUri} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📸 Captured Preview</Text>

      <View style={styles.imageWrapper}>
        <Image source={{uri: photoUri}} style={styles.image} />
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>🔙 Back to Camera</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.6,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1c1c1c',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
