import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function ProductDetails({route}) {
  const {product} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{uri: product.image}} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: width * 0.05,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: width * 0.7,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: width * 0.04,
  },
  details: {
    marginTop: 10,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#388E3C',
    marginBottom: 10,
  },
  category: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: width * 0.04,
    lineHeight: 22,
    color: '#444',
    marginTop: 10,
  },
});
