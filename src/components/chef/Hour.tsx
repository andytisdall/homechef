import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, utcToZonedTime } from "date-fns-tz";
import { VolunteerHours } from "@community-kitchens/apiinterfaces";

import Btn from "../reusable/Btn";
import { useGetShiftsQuery } from "../../state/apis/volunteerApi";
import styles from "../shiftSignup/styles";
import chefStyles from "./styles";
import { ChefStackParamsList } from "./Chef";

type NavProp = NativeStackNavigationProp<ChefStackParamsList, "ChefShifts">;

const Hour = ({ hour }: { hour: VolunteerHours }) => {
  const { data } = useGetShiftsQuery();
  const jobs = data?.jobs;
  const job = jobs?.find((j) => j.id === hour.job);

  const navigation = useNavigation<NavProp>();

  if (!job) {
    return (
      <View key={hour.id} style={chefStyles.chefRow}>
        <View>
          <Text>Job not found</Text>
        </View>
      </View>
    );
  }
  return (
    <View key={hour.id} style={chefStyles.chefRow}>
      <Btn
        style={styles.smallBtn}
        onPress={() => {
          navigation.navigate("EditShift", { hoursId: hour.id });
        }}
      >
        <Text style={styles.smallBtnText}>edit</Text>
      </Btn>
      <View style={styles.hour}>
        <Text style={chefStyles.chefTextDate}>
          {format(
            utcToZonedTime(new Date(hour.time), "America/Los_Angeles"),
            "eee, M/d/yy",
          )}
        </Text>
        <Text>{job.name}</Text>
        <Text>{hour.mealCount || 0} Meals</Text>
      </View>
    </View>
  );
};

export default Hour;
