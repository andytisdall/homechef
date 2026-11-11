import { FlatList, View, PermissionsAndroid, Platform } from "react-native";
import { useEffect } from "react";
import { Notifications } from "react-native-notifications";

// import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
// import {
//   useNavigation,
//   CompositeNavigationProp,
// } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// import { checkPermission } from "../permissions";
import Title from "../reusable/Title";
import {
  useGetUserQuery,
  useGetUserInfoQuery,
  useRegisterDeviceTokenMutation,
} from "../../state/apis/authApi";
import NotificationsList from "./NotificationsList";
import styles from "./styles";
import User from "./User";
import Help from "./Help";
// import { RootTabParamsList } from "../MainNavigator";
// import { SignupStackParamsList } from "../shiftSignup/Signup";
import Loading from "../reusable/Loading";
// import { PERMISSIONS, requestNotifications } from "react-native-permissions";

// interface NotificationData {
//   screen: keyof RootTabParamsList;
//   subScreen?: keyof SignupStackParamsList;
//   params?: Record<string, string>;
// }

const Home = () => {
  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const { data: userInfo, isLoading: userInfoIsLoading } =
    useGetUserInfoQuery();

  const userIsHomeChef = userInfo?.homeChefStatus === "Active";
  // const userHasTextPermission = userIsHomeChef || user?.busDriver;

  const isLoading = userIsLoading || userInfoIsLoading;

  // const navigation =
  //   useNavigation<
  //     CompositeNavigationProp<
  //       BottomTabNavigationProp<RootTabParamsList, "Home">,
  //       NativeStackNavigationProp<SignupStackParamsList>
  //     >
  //   >();

  // useEffect(() => {
  //   const listenerKey = Notifications.listen((notification: Notification) => {
  //     try {
  //       const { screen, subScreen, params } =
  //         notification.data as NotificationData;

  //       if (subScreen && params) {
  //         // @ts-ignore
  //         navigation.navigate(screen, {
  //           screen: subScreen,
  //           params: params,
  //         });
  //       } else if (subScreen) {
  //         // @ts-ignore
  //         navigation.navigate(screen, {
  //           screen: subScreen,
  //         });
  //       } else {
  //         // @ts-ignore
  //         navigation.navigate(screen);
  //       }
  //     } catch (err) {
  //       console.log("Malformed notification data");
  //     }
  //   });
  //   return () => Notifications.remove(listenerKey);
  // }, [navigation]);

  const [registerToken] = useRegisterDeviceTokenMutation();

  useEffect(() => {
    const registerNotifications = async () => {
      if (user) {
        if (Platform.OS === "android") {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          Notifications.setNotificationChannel({
            channelId: "home-chef-app",
            name: "CK Home Chef app channel",
            importance: 5,
            description: "Notifications from Community Kitchens",
            enableLights: true,
            enableVibration: true,
            showBadge: true,
            vibrationPattern: [200, 1000, 500, 1000, 500],
          });
        }
        Notifications.events().registerRemoteNotificationsRegistered(
          ({ deviceToken }) => {
            const existingToken = user.homeChefNotificationToken;

            if (deviceToken !== existingToken) {
              registerToken(deviceToken).unwrap();
            }
          }
        );

        Notifications.registerRemoteNotifications();
      }
    };
    registerNotifications();
  }, [user, registerToken]);

  const headerText = userIsHomeChef ? "Home Chef App" : "Meal Delivery";

  const data = isLoading
    ? [
        <View style={styles.home}>
          <Loading />
        </View>,
      ]
    : [
        <Title headerText={headerText} />,
        <Help />,
        !userIsHomeChef ? <></> : <NotificationsList />,
        <User />,
      ];

  return (
    <FlatList
      contentContainerStyle={styles.home}
      data={data}
      renderItem={({ item }) => item}
      keyExtractor={(item, i) => i.toString()}
    />
  );
};

export default Home;
