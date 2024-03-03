import {format, utcToZonedTime} from 'date-fns-tz';
import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Btn from '../reusable/Btn';
import {ChefStackParamsList} from './Chef';

import Loading from '../reusable/Loading';
import styles from '../shiftSignup/styles';
import reusableStyles from '../reusable/styles';
import {
  useEditHoursMutation,
  useGetHoursQuery,
  useGetShiftsQuery,
} from '../../state/apis/volunteerApi';

type ScreenProps = NativeStackScreenProps<ChefStackParamsList, 'EditShift'>;

const EditShift = ({route}: ScreenProps) => {
  const {hoursId} = route.params;
  const [cancel, setCancel] = useState(false);

  const {data: hoursState} = useGetHoursQuery();
  const {data, isLoading: shiftsLoading} = useGetShiftsQuery();
  const [editHours, {isLoading}] = useEditHoursMutation();

  const hour = hoursState ? hoursState[hoursId] : undefined;

  const [mealCount, setMealCount] = useState(hour?.mealCount || '');

  const onSubmit = () => {
    if (data) {
      const fridge = data.jobs.find(j => j.id === hour?.job)?.name;
      editHours({id: hoursId, mealCount, cancel, fridge, date: hour?.time});
    }
  };

  const renderCancel = () => {
    let text;
    if (hour?.status === 'Confirmed') {
      text = 'Check here to cancel this delivery';
    }
    if (hour?.status === 'Completed') {
      text = 'Check here if you did not make this delivery';
    }
    return (
      <View style={styles.signupField}>
        <BouncyCheckbox
          onPress={(isChecked: boolean) => setCancel(isChecked)}
          fillColor="rgb(100,100,250)"
          unfillColor="white"
          style={styles.checkbox}
        />
        <View style={styles.signupFieldText}>
          <Text style={styles.confirmText}>{text}</Text>
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
        <View style={[styles.signupDetail, styles.signupMain]}>
          <Text style={styles.signupTitle}>
            Edit Home Chef Delivery Details
          </Text>
          <View style={styles.signupFields}>
            <View style={styles.signupField}>
              <Text style={styles.confirmLabel}>Date:</Text>
              <Text style={styles.confirmText}>
                {format(
                  utcToZonedTime(new Date(hour.time), 'America/Los_Angeles'),
                  'M/d/yy',
                )}
              </Text>
            </View>
            <View style={styles.signupField}>
              <TextInput
                keyboardType="numeric"
                value={meals.toString()}
                onChangeText={setMealCount}
                style={styles.mealCountInput}
                textColor="black"
                autoFocus
              />
              <View style={styles.signupFieldText}>
                <Text style={styles.confirmText}>Number of Meals</Text>
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
                style={styles.submitBtn}
                disabled={disabled}>
                <Text style={reusableStyles.btnText}>Submit</Text>
              </Btn>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditShift;
