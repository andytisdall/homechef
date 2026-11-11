import { format, utcToZonedTime } from "date-fns-tz";
import { useCallback, useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VolunteerShift } from "@community-kitchens/apiinterfaces";
import { SignupStackParamsList } from "./Signup";
import styles from "./styles";
import Loading from "../reusable/Loading";
import Btn from "../reusable/Btn";
import { useGetShiftsQuery } from "../../state/apis/volunteerApi";

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, "Fridge">;

const VolunteerJob = ({ route, navigation }: ScreenProps) => {
  const { jobId } = route.params;

  const { data, isLoading } = useGetShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;
  const job = jobs?.find((j) => j.id === jobId);

  const renderShift = useCallback(
    ({ item }: { item: VolunteerShift }) => {
      return (
        <View style={styles.shift} key={item.id}>
          <View style={styles.shiftSignupBtnContainer}>
            {item.open ? (
              <Btn
                style={styles.smallBtn}
                onPress={() =>
                  navigation.navigate("ShiftDetail", { shiftId: item.id })
                }
              >
                <Text style={styles.smallBtnText}>Sign Up</Text>
              </Btn>
            ) : (
              <Text style={styles.fullShift}>full</Text>
            )}
          </View>

          <Text style={styles.jobDate}>
            {format(
              utcToZonedTime(item.startTime, "America/Los_Angeles"),
              "M/d/yy",
            )}
          </Text>
          <Text>
            {format(
              utcToZonedTime(item.startTime, "America/Los_Angeles"),
              "eeee",
            )}
          </Text>
        </View>
      );
    },
    [navigation],
  );

  const renderShifts = useMemo(() => {
    if (!job || !shifts) {
      return;
    }
    const jobShifts = [...job.shifts].sort((a, b) =>
      a.startTime > b.startTime ? 1 : -1,
    );

    return (
      <FlatList
        contentContainerStyle={[styles.shiftList]}
        data={jobShifts}
        renderItem={renderShift}
      />
    );
  }, [job, renderShift, shifts]);

  if (isLoading) {
    return <Loading />;
  }

  if (!job || !shifts) {
    return (
      <View>
        <Text>Data not found</Text>
      </View>
    );
  }

  return (
    // <View style={styles.scrollView}>
    <View style={styles.homeChef}>
      <View style={styles.jobHeader}>
        <Text style={[styles.signupTitle, styles.signupMain]}>{job.name}</Text>
      </View>
      <View style={styles.fridgeInfo}>
        <View style={styles.address}>
          {!!job.location && (
            <Text style={styles.location}>{job.location}</Text>
          )}
          {!!job.locationCity && (
            <Text style={styles.location}>, {job.locationCity}</Text>
          )}
        </View>
        {!!job.notes && <Text style={styles.location}>Note: {job.notes}</Text>}
      </View>
      {job.active ? renderShifts : <Text>Out of Service</Text>}
    </View>
    // </View>
  );
};

export default VolunteerJob;
