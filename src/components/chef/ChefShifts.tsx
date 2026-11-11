import { useMemo } from "react";
import { View, Text, FlatList, Image, LayoutAnimation } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Btn from "../reusable/Btn";
import { RootTabParamsList } from "../MainNavigator";
import { ChefStackParamsList } from "./Chef";
import {
  useGetShiftsQuery,
  useGetHoursQuery,
} from "../../state/apis/volunteerApi";
import { useGetUserInfoQuery } from "../../state/apis/authApi";
import styles from "../shiftSignup/styles";
import chefStyles from "./styles";
import Loading from "../reusable/Loading";
import PastDeliveries from "./PastDeliveries";
import UpcomingDeliveries from "./UpcomingDeliveries";

type ScreenProps = NativeStackScreenProps<
  ChefStackParamsList & RootTabParamsList,
  "ChefShifts"
>;

export const animate = () => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      200,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.scaleX,
    ),
  );
};

const ChefShifts = ({ navigation }: ScreenProps) => {
  const { data: hours, isLoading } = useGetHoursQuery();
  const { data: userInfo } = useGetUserInfoQuery();
  useGetShiftsQuery();

  const totalMeals = useMemo(() => {
    if (hours) {
      return Object.values(hours)
        .filter((h) => h.status === "Completed")
        .reduce(
          (total, current) => total + parseInt(current.mealCount!, 10),
          0,
        );
    }
  }, [hours]);

  const header = () => {
    return (
      <View>
        <View style={chefStyles.chefHeader}>
          {userInfo?.firstName ? (
            <Text style={styles.signupTitle}>
              {userInfo.firstName}'s Town Fridge Deliveries
            </Text>
          ) : null}
          {totalMeals && totalMeals > 0 ? (
            <Text style={chefStyles.chefHeaderSubText}>
              You have delivered {totalMeals} total meals!
            </Text>
          ) : null}
        </View>

        <View style={chefStyles.chefInfo}>
          <View style={chefStyles.chefPhotos}>
            <Image
              source={{
                uri: "https://portal.ckoakland.org/images/home-chef/chef-shifts.jpeg",
              }}
              alt="Home Chef meals ready to go"
              style={chefStyles.chefPhoto}
            />
            <Image
              source={{
                uri: "https://portal.ckoakland.org/images/home-chef/town-fridge.jpg",
              }}
              alt="Home Chef meals ready to go"
              style={chefStyles.chefPhoto}
            />
            <Image
              source={{
                uri: "https://storage.googleapis.com/coherent-vision-368820.appspot.com/chef-shifts-3.jpg",
              }}
              alt="Home Chef meals ready to go"
              style={chefStyles.chefPhoto}
            />
          </View>
          <Btn
            style={chefStyles.signupBtn}
            onPress={() =>
              navigation.navigate("Signup", { screen: "ShiftSignup" })
            }
          >
            <Text style={styles.confirmText}>Sign Up to Deliver Meals</Text>
          </Btn>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.homeChef}>
        <Loading />
      </View>
    );
  }

  return (
    <FlatList
      data={[
        <FlatList
          data={[header(), <UpcomingDeliveries />, <PastDeliveries />]}
          renderItem={({ item }) => item}
          style={styles.jobList}
        />,
      ]}
      renderItem={({ item }) => item}
      contentContainerStyle={styles.homeChef}
    />
  );
};

export default ChefShifts;
