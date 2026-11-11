import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView } from "react-native";
import { format, utcToZonedTime } from "date-fns-tz";

import Btn from "../reusable/Btn";
import styles from "./styles";
import { RootTabParamsList } from "../MainNavigator";
import { SignupStackParamsList } from "./Signup";
import Loading from "../reusable/Loading";
import {
  useGetHoursQuery,
  useGetShiftsQuery,
} from "../../state/apis/volunteerApi";

type ScreenProps = NativeStackScreenProps<
  SignupStackParamsList & RootTabParamsList,
  "SignupConfirm"
>;

// interface Hours {
//   id: string;
//   mealCount: string;
//   time: string;
//   job: string;
//   status: string;
//   shift: string;
//   campaign?: string;
// }

const Confirmation = ({ navigation, route }: ScreenProps) => {
  const { hoursId } = route.params;
  const { data: hours, isLoading: hoursLoading } = useGetHoursQuery();
  const { data, isLoading: shiftsLoading } = useGetShiftsQuery();

  const hour = hours && hoursId ? hours[hoursId] : null;
  const jobs = data?.jobs;

  const isLoading = hoursLoading || shiftsLoading;

  const renderShiftDetails = () => {
    const job = jobs?.find((j) => j.id === hour?.job);
    if (hour && job) {
      return (
        <View style={[styles.confirmDetail]}>
          <Text style={styles.confirmTextHeader}>
            You have successfully signed up for this shift:
          </Text>
          <View style={[styles.signupDetailInfo]}>
            <View style={styles.confirmLine}>
              <Text style={styles.confirmLabel}>Date:</Text>
              <Text style={styles.confirmText}>
                {format(
                  utcToZonedTime(new Date(hour.time), "America/Los_Angeles"),
                  "eeee, M/d/yy"
                )}
              </Text>
            </View>
            <View style={styles.confirmLine}>
              <Text style={styles.confirmLabel}>Fridge:</Text>
              <Text style={styles.confirmText}>{job.name}</Text>
            </View>
            {!!job.location && (
              <View style={styles.confirmLine}>
                <Text style={styles.confirmLabel}>Location:</Text>
                <Text style={styles.confirmText}>{job.location}</Text>
                {!!job.locationCity && (
                  <Text style={styles.confirmText}>{job.locationCity}</Text>
                )}
              </View>
            )}
            {!!job.notes && (
              <View style={styles.confirmLine}>
                <Text style={styles.confirmText}>{job.notes}</Text>
              </View>
            )}
          </View>
          <Text style={styles.confirmText2}>
            You have been sent an email with this information.
          </Text>
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        {isLoading ? <Loading /> : renderShiftDetails()}
        <View style={styles.confirmNav}>
          <Btn
            onPress={() => navigation.navigate("ShiftSignup")}
            style={styles.navBtn}
          >
            <Text style={styles.signupBtnText}>Sign Up for More Shifts</Text>
          </Btn>
          <Btn
            onPress={() => navigation.navigate("Deliveries")}
            style={styles.navBtn}
          >
            <Text style={styles.signupBtnText}>
              See your future and past shifts
            </Text>
          </Btn>
        </View>
      </View>
    </ScrollView>
  );
};

export default Confirmation;
