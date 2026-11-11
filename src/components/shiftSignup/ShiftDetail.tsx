import { useState, useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView } from "react-native";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { TextInput } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Btn from "../reusable/Btn";
import Loading from "../reusable/Loading";
import { SignupStackParamsList } from "./Signup";
import styles from "./styles";
import { colors } from "../shiftSignup/styles";
import {
  useGetShiftsQuery,
  useCreateHoursMutation,
} from "../../state/apis/volunteerApi";
import { useGetUserQuery } from "../../state/apis/authApi";

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, "ShiftDetail">;

const ShiftDetail = ({ navigation, route }: ScreenProps) => {
  const [mealCount, setMealCount] = useState("");
  const [soup, setSoup] = useState(false);

  const { data: user } = useGetUserQuery();
  const { data, isLoading } = useGetShiftsQuery();
  const [signUpForShift, { isLoading: signupLoading }] =
    useCreateHoursMutation();

  const { shiftId } = route.params;

  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const entreeRef = useRef<BouncyCheckbox>(null);
  const soupRef = useRef<BouncyCheckbox>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (!jobs || !shifts) {
    return (
      <View>
        <Text>Data Not Found</Text>
      </View>
    );
  }

  const shift = shifts[shiftId];
  const job = jobs.find((j) => j.id === shift.job);

  const disabled =
    !mealCount || isNaN(parseInt(mealCount, 10)) || parseInt(mealCount, 10) < 1;

  const onSubmit = () => {
    if (!disabled && job && user) {
      const mealType = soup ? "Soup" : "Entree";
      console.log(mealType);
      signUpForShift({
        shiftId,
        mealCount: parseInt(mealCount),
        jobId: job.id,
        date: shift.startTime,
        mealType,
        contactId: user.id,
      })
        .unwrap()
        .then((hours) =>
          navigation.navigate("SignupConfirm", { hoursId: hours.id }),
        );
    }
  };

  if (!shift.open) {
    return <Text>This shift is not available for signup</Text>;
  }
  if (!job) {
    return (
      <View>
        <Text>Job Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={styles.signupDetailInfo}>
          <View style={styles.signupField}>
            <Text style={styles.confirmLabel}>Date: </Text>
            <Text style={styles.confirmText}>
              {format(
                zonedTimeToUtc(shift.startTime, "America/Los_Angeles"),
                "eeee, M/d/yy",
              )}
            </Text>
          </View>

          <View style={styles.signupField}>
            <Text style={styles.confirmLabel}>Fridge: </Text>
            <Text style={styles.confirmText}>{job.name}</Text>
          </View>
          <Text>{job.location}</Text>
          <Text>{job.locationCity}</Text>

          <View style={styles.signupField}>
            <View>
              <Text style={styles.mealEntryText}>Number of Meals:</Text>
              <Text>(You can change this later)</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              placeholder="25"
              placeholderTextColor={colors.grey}
              value={mealCount}
              onChangeText={setMealCount}
              style={styles.mealCountInput}
              autoFocus
              textColor="black"
            />
          </View>
          <Text style={styles.mealEntryText}>Type of Meal:</Text>
          <View style={styles.signupField}>
            <BouncyCheckbox
              onPress={(checked) => {
                if (checked) {
                  setSoup(false);
                  soupRef.current?.setState({ checked: false });
                } else {
                  soupRef.current?.setState({ checked: true });
                }
              }}
              isChecked={!soup}
              fillColor="rgb(100,100,250)"
              unfillColor="white"
              style={styles.checkbox}
              ref={entreeRef}
            />
            <Text style={styles.confirmText}>Entree</Text>
          </View>
          <View style={styles.signupField}>
            <BouncyCheckbox
              onPress={(checked) => {
                if (checked) {
                  setSoup(true);
                  entreeRef.current?.setState({ checked: false });
                } else {
                  entreeRef.current?.setState({ checked: true });
                }
              }}
              isChecked={soup}
              fillColor="rgb(100,100,250)"
              unfillColor="white"
              style={styles.checkbox}
              ref={soupRef}
            />
            <Text style={styles.confirmText}>Soup</Text>
          </View>
          {!!job.notes && (
            <View style={styles.signupNotes}>
              <Text>{job.notes}</Text>
            </View>
          )}
        </View>

        <View style={styles.submitContainer}>
          {signupLoading ? (
            <Loading />
          ) : (
            <Btn
              style={[styles.submitBtn]}
              onPress={onSubmit}
              disabled={disabled}
            >
              <Text style={styles.submitBtnText}>Sign Up</Text>
            </Btn>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ShiftDetail;
