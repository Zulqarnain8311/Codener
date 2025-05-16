import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductListScreen from './src/screens/ProductList';
import ProductDetailScreen from './src/screens/ProductDetails';
import CameraScreen from './src/screens/CameraScreen';
import PhotoPreviewScreen from './src/screens/PhotoPreviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{title: 'Products'}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{title: 'Product Detail'}}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{title: 'Camera'}}
        />
        <Stack.Screen
          name="PhotoPreview"
          component={PhotoPreviewScreen}
          options={{title: 'Photo Preview'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
