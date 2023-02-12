import { StyleSheet, View, Modal } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'
import colors from '../config/colors';

const UploadScreen = ({ progress = 0, visible  =false }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <ProgressBar color={colors.primary} progress={progress} width={200} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default UploadScreen;
