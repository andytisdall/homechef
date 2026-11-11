import { format, utcToZonedTime } from "date-fns-tz";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";

import Btn from "../reusable/Btn";
import { ChefStackParamsList } from "./Chef";

import Loading from "../reusable/Loading";
import styles from "../shiftSignup/styles";
import {
  useEditHoursMutation,
  useGetHoursQuery,
  useGetShiftsQuery,
} from "../../state/apis/volunteerApi";
import chefStyles from "./styles";
import { colors } from "../shiftSignup/styles";
import { setAlert } from "../../state/slices/alertSlice";

type ScreenProps = NativeStackScreenProps<ChefStackParamsList, "EditShift">;

const EditShift = ({ navigation, route }: ScreenProps) => {
  const { hoursId } = route.params;
  const [cancel, setCancel] = useState(false);

  const { data: hoursState } = useGetHoursQuery();
  const { data, isLoading: shiftsLoading } = useGetShiftsQuery();
  const [editHours, { isLoading }] = useEditHoursMutation();

  const hour = hoursState ? hoursState[hoursId] : undefined;

  const [mealCount, setMealCount] = useState(hour?.mealCount || "");
  const [mealType, setMealType] = useState(hour?.mealType || "Entree");

  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (data && hour) {
      const fridge = data.jobs.find((j) => j.id === hour?.job)!.name;
      await editHours({
        id: hoursId,
        mealCount,
        cancel,
        fridge,
        date: hour?.time,
        mealType,
      }).unwrap();
      navigation.navigate("ChefShifts");
      dispatch(setAlert("Shift Updated"));
    }
  };

  const renderCancel = () => {
    let text;
    if (hour?.status === "Confirmed") {
      text = "Check here to cancel this delivery";
    }
    if (hour?.status === "Completed") {
      text = "Check here if you did not make this delivery";
    }
    return (
      <View>
        <Text style={styles.mealEntryText}>Cancel:</Text>
        <View style={styles.signupField}>
          <BouncyCheckbox
            onPress={(isChecked: boolean) => setCancel(isChecked)}
            fillColor={colors.red}
            unfillColor="white"
            style={styles.checkbox}
          />
          <Text style={[styles.confirmText, chefStyles.cancelText]}>
            {text}
          </Text>
        </View>
      </View>
    );
  };

  const meals = cancel ? 0 : mealCount;
  const disabled = (!mealCount || parseInt(mealCount, 10) < 1) && !cancel;

  if (shiftsLoading) {
    return <Loading />;
  }

  if (!hour) {
    return <Text>This shift cannot be edited.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={[styles.signupMain]}>
          <View style={styles.signupField}>
            <Text style={styles.confirmLabel}>Date: </Text>
            <Text style={styles.confirmText}>
              {format(
                utcToZonedTime(new Date(hour.time), "America/Los_Angeles"),
                "M/d/yy",
              )}
            </Text>
          </View>
          <View style={styles.signupField}>
            <Text style={styles.confirmLabel}>Number of Meals:</Text>
            <TextInput
              keyboardType="numeric"
              value={meals.toString()}
              onChangeText={setMealCount}
              style={styles.mealCountInput}
              textColor="black"
              autoFocus
            />
          </View>
          <View style={styles.signupField}>
            <View>
              <Text style={styles.mealEntryText}>Type of Meal:</Text>
              <View style={styles.signupField}>
                <BouncyCheckbox
                  onPress={(checked) => {
                    if (checked) {
                      setMealType("Entree");
                    }
                  }}
                  isChecked={mealType === "Entree"}
                  fillColor="rgb(100,100,250)"
                  unfillColor="white"
                  style={styles.checkbox}
                  disableBuiltInState
                />
                <Text style={styles.confirmText}>Entree</Text>
              </View>
              <View style={styles.signupField}>
                <BouncyCheckbox
                  onPress={(checked) => {
                    if (checked) {
                      setMealType("Soup");
                    }
                  }}
                  isChecked={mealType === "Soup"}
                  fillColor="rgb(100,100,250)"
                  unfillColor="white"
                  style={styles.checkbox}
                />
                <Text style={styles.confirmText}>Soup</Text>
              </View>
            </View>
          </View>
          {renderCancel()}
        </View>
        <View style={styles.submitContainer}>
          {isLoading ? (
            <Loading />
          ) : (
            <Btn
              onPress={onSubmit}
              style={styles.signupBtn}
              disabled={disabled}
            >
              <Text style={styles.signupBtnText}>Submit</Text>
            </Btn>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default EditShift;
