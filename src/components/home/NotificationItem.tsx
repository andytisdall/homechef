import {View, Text} from 'react-native';
import {format} from 'date-fns';

import {Notification} from '../../state/apis/notificationApi';
import styles from './styles';

const NotificationItem = ({notification}: {notification: Notification}) => {
  return (
    <View style={styles.notificationsItem}>
      <View style={styles.notificationDate}>
        <Text style={styles.notificationDateText}>{'\u2022'}</Text>
        <Text style={styles.notificationDateText}>
          {format(new Date(notification.date), 'M/dd/yyyy')}
        </Text>
      </View>
      <Text>{notification.payload.title}</Text>
      <Text>{notification.payload.body}</Text>
    </View>
  );
};

export default NotificationItem;
