import { View, Text, ScrollView, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { zonedTimeToUtc, format } from "date-fns-tz";
import { useMemo } from "react";

import styles from "./styles";
import { SignupStackParamsList } from "./Signup";
import { useGetShiftsQuery } from "../../state/apis/volunteerApi";
import Loading from "../reusable/Loading";
import { Job, LowercaseRegion } from "@community-kitchens/apiinterfaces";

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, "DateDetail">;

const DateDetail = ({ route, navigation }: ScreenProps) => {
  const { data, isLoading } = useGetShiftsQuery();

  const { shiftIds, date } = route.params;
  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const dateShifts = shifts ? shiftIds.map((id) => shifts[id]) : [];
  const dateJobs = jobs?.filter((job) =>
    dateShifts.some((shift) => shift.job === job.id),
  );

  const renderShifts = (fridge: Job) => {
    const regionShifts = dateShifts.filter((shift) => shift.job === fridge.id);
    return regionShifts.map((shift) => {
      const renderLocation = () => {
        if (fridge?.location) {
          return (
            <View style={styles.address}>
              <Text>{fridge.location}</Text>
              {!!fridge.locationCity && (
                <Text>
                  {", "}
                  {fridge.locationCity}
                </Text>
              )}
            </View>
          );
        }
      };
      return (
        <Pressable
          key={shift.id}
          onPress={() =>
            navigation.navigate("ShiftDetail", { shiftId: shift.id })
          }
        >
          {({ pressed }) => {
            const btnStyle: any[] = [styles.jobContainer];
            if (pressed) {
              btnStyle.push(styles.highlight);
            }
            return (
              <View style={btnStyle}>
                <Text style={styles.jobName}>{fridge?.name}</Text>
                {renderLocation()}
              </View>
            );
          }}
        </Pressable>
      );
    });
  };

  const regions = useMemo(
    () =>
      Array.from(new Set(jobs?.filter((j) => j.region).map((j) => j.region!))),
    [jobs],
  );

  const renderRegion = (region: LowercaseRegion) => {
    if (jobs) {
      const regionJobs = dateJobs?.filter((fridge) => fridge.region === region);
      return (
        <View key={region}>
          <Text style={styles.regionHeader}>{region}</Text>
          <View>{regionJobs?.map(renderShifts)}</View>
        </View>
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (shifts && !dateShifts.length) {
    return <View>Shifts Not Found</View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={styles.dateDetailHeader}>
          <Text>Available Fridges</Text>

          <Text style={[styles.signupTitle]}>
            {format(
              zonedTimeToUtc(date, "America/Los_Angeles"),
              "eeee, M/d/yy",
            )}
          </Text>
        </View>
        {regions
          .filter((r) => dateJobs?.some((j) => j.region === r))
          .map((region) => renderRegion(region))}
      </View>
    </ScrollView>
  );
};

export default DateDetail;
