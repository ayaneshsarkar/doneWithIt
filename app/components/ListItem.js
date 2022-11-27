import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';
import AppText from './AppText';
import colors from '../config/colors';

const ListItem = ({
  image,
  IconComonent,
  title,
  subTitle,
  onPress = () => {},
  renderRightActions,
}) => {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {IconComonent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.detailsContainer}>
              <AppText style={styles.title}>{title}</AppText>
              { subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText> }
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center'
  }, 
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: '500',
  },
});

export default ListItem;
