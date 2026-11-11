import { View, Text, Linking } from "react-native";

import styles from "./styles";
import { useGetUserInfoQuery, useGetUserQuery } from "../../state/apis/authApi";
import Btn from "../reusable/Btn";

const Help = () => {
  const { data: user } = useGetUserQuery();
  const { data: userInfo } = useGetUserInfoQuery();

  const userIsHomeChef = userInfo?.homeChefStatus === "Active";
  const userHasTextPermission = userIsHomeChef || user?.busDriver;

  const linkToPortal = () =>
    Linking.openURL("https://portal.ckoakland.org/forms/volunteer");

  if (!userHasTextPermission) {
    return (
      <View style={styles.homeInfo}>
        <Text style={styles.homeInfoTitle}>
          You must be a CK Home Chef and/or a CK Delivery Driver to use this
          app.
        </Text>
        <Btn onPress={linkToPortal} style={styles.signOutBtn}>
          <Text style={styles.signOutBtnText}>
            Go to the CK Volunteer Portal
          </Text>
        </Btn>
      </View>
    );
  }

  return (
    <View style={styles.homeInfo}>
      <Text style={styles.homeInfoTitle}>
        Use the navigation buttons at the bottom of the screen to:
      </Text>
      <View style={styles.homeInfoItems}>
        <Text style={styles.homeInfoText}>
          {"\u2022 Send a Text Alert about your Town Fridge delivery"}
        </Text>
        {userIsHomeChef && (
          <>
            <Text style={styles.homeInfoText}>
              {"\u2022 Sign Up for Town Fridge Deliveries"}
            </Text>
            <Text style={styles.homeInfoText}>
              {"\u2022 See and edit your upcoming and past deliveries"}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Help;
