import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {setError} from '../../state/slices/errorSlice';
import {setAlert} from '../../state/slices/alertSlice';
import styles from './styles';
import {RootState} from '../../state/store';

const Popup = () => {
  const error = useSelector((state: RootState) => state.error);
  const alert = useSelector((state: RootState) => state.alert);

  const dispatch = useDispatch();

  const renderMessage = () => {
    if (error.message) {
      setTimeout(() => dispatch(setError('')), 5000);

      return (
        <View style={[styles.popup, styles.error]}>
          <Text style={styles.popupText}>{error.message}</Text>
        </View>
      );
    }
    if (alert.message) {
      setTimeout(() => dispatch(setAlert('')), 5000);

      return (
        <View style={[styles.popup, styles.alert]}>
          <Text style={styles.popupText}>{alert.message}</Text>
        </View>
      );
    }
  };
  return <View>{renderMessage()}</View>;
};

export default Popup;
