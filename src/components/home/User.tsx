import {View, Text} from 'react-native';

import Btn from '../reusable/Btn';
import styles from './styles';
import {
  useSignOutMutation,
  useGetUserInfoQuery,
} from '../../state/apis/authApi';

const User = () => {
  const [signOut] = useSignOutMutation();
  const {data: userInfo} = useGetUserInfoQuery();

  return (
    <View>
      <Text style={styles.homeTitleText}>Signed in as</Text>
      <Text style={styles.homeTitleText}>
        {userInfo?.firstName} {userInfo?.lastName}
      </Text>
      <Btn style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutBtnText}>Sign Out</Text>
      </Btn>
    </View>
  );
};

export default User;
