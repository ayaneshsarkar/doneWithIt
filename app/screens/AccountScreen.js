import { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';
import ListItemSeperator from '../components/ListItemSeperator';
import colors from '../config/colors';
import AuthContext from '../auth/context';
import authStorage from '../services/auth';

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext)

  const menuItems = [
    {
      title: 'My Listings',
      icon: {
        name: 'format-list-bulleted',
        backgroundColor: colors.primary,
      },
      onPress: () => navigation.navigate('Listings')
    },
    {
      title: 'My Messages',
      icon: {
        name: 'email',
        backgroundColor: colors.secondary,
      },
      onPress: () => navigation.navigate('Messages')
    },
  ];
  
  const handleLogout = async () => {
    setUser(null)
    authStorage.removeToken()
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
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
        onPress={handleLogout}
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
