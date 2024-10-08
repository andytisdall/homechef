import PushNotification, {
  ReceivedNotification,
} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  AppState,
  Platform,
  AppStateStatus,
  PermissionsAndroid,
} from 'react-native';
import {checkNotifications, RESULTS} from 'react-native-permissions';

// BIIIIG WARNING: in iOS you'll get a token ONLY if you request permission for it.
// Therefore, a call for PushNotification.requestPermissions() is required.

// Android doesn't need the user's consent to send notifications, whereas iOS does
// but Android's user can still turn off notifications in the system settings

export type Notification = Omit<ReceivedNotification, 'userInfo'>;

class NotificationService {
  public token?: string;
  public initNotification?: Notification;
  public listeners: Record<string, (notification: Notification) => void>;
  public channelId: string;

  constructor() {
    this.listeners = {};
    this.channelId = 'PUSH-LOCAL-NOTIFICATIONS';
  }

  delete = () => {
    PushNotificationIOS.removeEventListener('registrationError');
  };

  register = async (registerToken: (token: string) => void) => {
    await this.checkAndGetPermissionIfAlreadyGiven();
    if (this.token) {
      registerToken(this.token);
    }
  };

  async configure() {
    PushNotification.configure({
      onNotification: this.handleNotification,
      onRegister: ({token}: {token: string}) => (this.token = token),
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      // requestPermissions: true, // set to true if you want to request iOS notification when the app starts
    });
    this.initAndroidLocalScheduledNotifications();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener(
        'registrationError',
        this.failIOSToken,
      );
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (newState: AppStateStatus) => {
    if (newState === 'active') {
      this.checkAndGetPermissionIfAlreadyGiven();
    }
  };

  failIOSToken = ({message}: {message: string}) => {
    if (Platform.OS === 'android') {
      return;
    }
    console.log(message);
  };

  checkPermission = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    const authStatus = await checkNotifications().then(({status}) => status);
    // …'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked'
    let permission: {granted: boolean; canAsk?: boolean} = {
      granted: false,
      canAsk: false,
    };
    switch (authStatus) {
      case RESULTS.UNAVAILABLE:
        // This feature is not available (on this device / in this context)
        permission = {granted: false, canAsk: false};
        break;
      case RESULTS.DENIED:
        // The permission has not been requested / is denied but requestable;
        // That's where you show your custom screen if you want
        permission = {granted: false, canAsk: true};
        break;
      case RESULTS.LIMITED:
        // The permission is limited: some actions are possible
        permission = {granted: true};
        break;
      case RESULTS.GRANTED:
        // The permission is granted
        permission = {granted: true};
        break;
      case RESULTS.BLOCKED:
        // The permission is denied and not requestable anymore
        // The only way to get the user turn on notifications again
        // is to bring him/her to the app system settings
        // with Linking.openSettings()
        permission = {granted: false, canAsk: false};
        break;
    }
    return permission;
  };

  // one of these two following methods need to be called when the app starts
  // so that the iOS token is returned and saved to your DB

  checkAndGetPermissionIfAlreadyGiven = async () => {
    // useful if you want to control when you ask the user for notifications
    // and if you want to show your own screen/popup to explain
    // why it would be great for the user to have notifications
    const {granted} = await this.checkPermission();
    if (!granted) {
      return true;
    }
    const permission = await PushNotification.requestPermissions();
    return permission;
  };

  checkAndAskForPermission = async () => {
    // useful if you want to request the user's permission without further explanation when the app starts
    const {granted, canAsk} = await this.checkPermission();
    if (granted) {
      return true;
    }
    if (!canAsk) {
      return false;
    }
    const permission = await PushNotification.requestPermissions();
    return permission;
  };

  // LOCAL NOTIFICATIONS

  initAndroidLocalScheduledNotifications = () => {
    PushNotification.createChannel(
      {
        channelId: this.channelId, // (required)
        channelName: 'Push local notifications', // (required)
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };

  localNotification(
    {
      title,
      message,
      playSound = true,
      soundName = 'default',
    }: {
      title?: string;
      message: string;
      playSound?: boolean;
      soundName?: string;
    } = {message: 'default message'},
  ) {
    PushNotification.localNotification({
      title,
      message,
      playSound,
      soundName,
      channelId: this.channelId,
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  // PUSH NOTIFICATIONS
  getInitNotification() {
    PushNotification.popInitialNotification(notification => {
      if (notification) {
        this.handleNotification(notification);
      }
    });
  }

  handleNotification = (notification: Notification) => {
    // console.log('handle Notification', JSON.stringify(notification, null, 2));

    /* ANDROID FOREGROUND */

    if (Platform.OS === 'android') {
      // if not the line below, the notification is launched without notifying
      // with the line below, there is a local notification triggered
      if (notification.foreground && !notification.userInteraction) {
        return;
      }
    }
    /* LISTENERS */

    const listenerKeys = Object.keys(this.listeners);
    //  handle initial notification if any, if no listener is mounted yet
    if (!listenerKeys.length) {
      this.initNotification = notification;
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return;
    }
    this.initNotification = undefined;

    // handle normal notification
    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const notificationHandler = this.listeners[listenerKeys[i]];
      notificationHandler(notification);
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  };

  listen = (callback: (notification: Notification) => void) => {
    const listenerKey = `listener_${Date.now()}`;
    this.listeners[listenerKey] = callback;
    if (this.initNotification) {
      this.handleNotification(this.initNotification);
    }
    return listenerKey;
  };

  remove = (listenerKey: string) => {
    delete this.listeners[listenerKey];
  };
}

const Notifications = new NotificationService();

export default Notifications;
