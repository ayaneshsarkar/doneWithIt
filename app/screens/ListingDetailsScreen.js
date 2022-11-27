import { StyleSheet, TouchableWithoutFeedback, View, Image } from 'react-native';
import React from 'react';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';

const ListingDetailsScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => navigation.push('ListingEdit')}>
        <Image style={styles.image} source={require('../assets/jacket.jpg')} />
      </TouchableWithoutFeedback>
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Red Jacket for sale</AppText>
        <AppText style={styles.price}>$100</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require('../assets/ayanesh.jpg')}
            title='Ayanesh Sarkar'
            subTitle='7 Listings'
            onPress={() => navigation.push('Account')}
          />
        </View>
      </View>
    </View>
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
    marginVertical: 40
  }
});

export default ListingDetailsScreen;
