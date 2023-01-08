import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../config/colors';

const ImageInput = ({ imageUri, onChangeImage = () => {} }) => {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert('Please give permission');
    }
  };

  useEffect(() => {
    requestPermission()
  }, []);

  const selectImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.cancelled) {
        onChangeImage(res.uri);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        { text: 'Yes', onPress: () => onChangeImage(imageUri) },
        { text: 'No' },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name='camera'
            size={40}
          />
        )}
        <Image
          source={imageUri ? { uri: imageUri } : null}
          style={imageUri ? styles.image : {}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;
