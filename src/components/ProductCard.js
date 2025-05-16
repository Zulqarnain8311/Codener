import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function ProductCard({product, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: width * 0.04,
    marginBottom: width * 0.03,
    borderRadius: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: width * 0.18,
    height: width * 0.18,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: width * 0.04,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: width * 0.04,
    fontWeight: '600',
    marginBottom: width * 0.01,
    color: '#333',
  },
  price: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#388E3C',
  },
});
