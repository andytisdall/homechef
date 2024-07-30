import {FlatList, View, Text} from 'react-native';

import {
  useGetNotificationsQuery,
  Notification,
} from '../../state/apis/notificationApi';
import Loading from '../reusable/Loading';
import NotificationItem from './NotificationItem';
import styles from './styles';

const NotificationsList = () => {
  const {data: notifications, isLoading} = useGetNotificationsQuery();

  const renderItem = ({item}: {item: Notification}) => (
    <NotificationItem notification={item} />
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!notifications?.length) {
    return <></>;
  }
  return (
    <View>
      <Text style={styles.notificationsTitle}>Recent Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        style={styles.notificationsList}
      />
    </View>
  );
};

export default NotificationsList;
