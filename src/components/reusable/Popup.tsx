import {View, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {setError} from '../../state/slices/errorSlice';
import {setAlert} from '../../state/slices/alertSlice';
import styles from './styles';
import {RootState} from '../../state/store';

const Popup = () => {
  const error = useSelector((state: RootState) => state.error);
  const alert = useSelector((state: RootState) => state.alert);

  const dispatch = useDispatch();

  const clear = () => {
    dispatch(setError(''));
    dispatch(setAlert(''));
  };

  const renderMessage = () => {
    if (error.message) {
      return (
        <View style={[styles.popup, styles.error]}>
          <Text style={styles.popupText}>{error.message}</Text>
        </View>
      );
    }
    if (alert.message) {
      return (
        <View style={[styles.popup, styles.alert]}>
          <Text style={styles.popupText}>{alert.message}</Text>
        </View>
      );
    }
  };

  if (error.message || alert.message) {
    return (
      <Pressable style={styles.popupBackground} onPress={clear}>
        {renderMessage()}
      </Pressable>
    );
  }
};

export default Popup;
