import { useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

const ImageInputList = ({
  imageUris = [],
  onRemoveImage = () => {},
  onAddImage = () => {},
}) => {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri, i) => (
            <View key={i} style={styles.image}>
              <ImageInput imageUri={uri} onChangeImage={(uri) => onRemoveImage(uri)} />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
