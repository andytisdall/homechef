import {View, Text} from 'react-native';

import styles from './styles';
import {useGetUserInfoQuery} from '../../state/apis/authApi';

const Help = () => {
  const {data: userInfo} = useGetUserInfoQuery();

  return (
    <View style={styles.homeInfo}>
      <Text style={styles.homeInfoTitle}>
        Use the navigation buttons at the bottom of the screen to:
      </Text>
      <View style={styles.homeInfoItems}>
        <Text style={styles.homeInfoText}>
          {'\u2022 Send a Text Alert about your Town Fridge delivery'}
        </Text>
        {userInfo?.homeChefStatus === 'Active' && (
          <>
            <Text style={styles.homeInfoText}>
              {'\u2022 Sign Up for Town Fridge Deliveries'}
            </Text>
            <Text style={styles.homeInfoText}>
              {'\u2022 See and edit your upcoming and past deliveries'}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Help;
