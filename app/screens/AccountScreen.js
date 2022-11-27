import { StyleSheet, View, FlatList } from 'react-native';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';
import ListItemSeperator from '../components/ListItemSeperator';
import colors from '../config/colors';

const AccountScreen = ({ navigation }) => {
  const menuItems = [
    {
      title: 'My Listings',
      icon: {
        name: 'format-list-bulleted',
        backgroundColor: colors.primary,
      },
      onPress: () => navigation.push('Listings')
    },
    {
      title: 'My Messages',
      icon: {
        name: 'email',
        backgroundColor: colors.secondary,
      },
      onPress: () => navigation.push('Messages')
    },
  ];
  
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title='Ayanesh Sarkar'
          subTitle='ayaneshsarkar101@gmail.com'
          image={require('../assets/ayanesh.jpg')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComonent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={item.onPress}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
        />
      </View>
      <ListItem 
        title="Log Out"
        IconComonent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => navigation.navigate('Home')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light
  },  
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
