import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

const initalMessages = [
  {
    id: 1,
    title: 'T1',
    description: 'D1',
    image: require('../assets/ayanesh.jpg'),
  },
  {
    id: 2,
    title: 'T2',
    description: 'D2',
    image: require('../assets/ayanesh.jpg'),
  },
];

const MessagesScreen = () => {
  const [messages, setMessages] = useState(initalMessages)
  const [refreshing, setRefreshing] = useState(false)

  const handleDelete = message => setMessages(messages.filter(m => m.id !== message.id))

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log('Message Selected', item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          // setMessages()
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
