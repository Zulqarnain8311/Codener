import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function ProductListScreen({navigation}) {
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For storing photoUri from camera screen
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // When camera sends photoUri
  useEffect(() => {
    if (route.params?.photoUri) {
      setPhotoUri(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('https://fakestoreapi.com/products');
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={styles.centered} />;
  if (error)
    return <Text style={[styles.centered, styles.error]}>{error}</Text>;

  return (
    <View style={styles.container}>
      {photoUri && (
        <View style={styles.photoPreviewContainer}>
          <Text style={styles.previewLabel}>Captured Photo:</Text>
          <Image source={{uri: photoUri}} style={styles.photoPreview} />
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', {product: item})
            }
          />
        )}
        contentContainerStyle={{paddingBottom: height * 0.15}} // responsive padding bottom
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.openCameraButton}
          onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.openCameraText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: width * 0.03, backgroundColor: '#fff'},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  error: {color: 'red', fontSize: 16},

  bottomBar: {
    position: 'absolute',
    bottom: height * 0.03,
    left: width * 0.05,
    right: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },

  openCameraButton: {
    backgroundColor: '#2196F3',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },

  openCameraText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },

  photoPreviewContainer: {
    marginBottom: height * 0.02,
    alignItems: 'center',
  },

  previewLabel: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },

  photoPreview: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
