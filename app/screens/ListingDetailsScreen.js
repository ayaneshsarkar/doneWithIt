import { StyleSheet, TouchableWithoutFeedback, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ContactSellerForm from '../components/ContactSellerForm';

const ListingDetailsScreen = ({ route }) => {
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
    >
      <View>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Image
            style={styles.image}
            tint='light'
            preview={{ uri: listing.images[0].thumbnailUrl }}
            uri={listing.images[0].url}
          />
        </TouchableWithoutFeedback>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>${listing.price}</AppText>
          <View style={styles.userContainer}>
            <ListItem
              image={require('../assets/ayanesh.jpg')}
              title='Ayanesh Sarkar'
              subTitle='7 Listings'
              onPress={() => {}}
            />
          </View>
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
