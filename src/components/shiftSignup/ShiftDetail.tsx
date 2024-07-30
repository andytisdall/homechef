import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView} from 'react-native';
import {format, zonedTimeToUtc} from 'date-fns-tz';
import {TextInput} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Btn from '../reusable/Btn';
import Loading from '../reusable/Loading';
import {SignupStackParamsList} from './Signup';
import styles from './styles';
import reusableStyles from '../reusable/styles';
import {placeholderColor} from '../text/styles';
import {
  useGetShiftsQuery,
  useCreateHoursMutation,
} from '../../state/apis/volunteerApi';

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'ShiftDetail'>;

const ShiftDetail = ({navigation, route}: ScreenProps) => {
  const [mealCount, setMealCount] = useState('');
  const [soup, setSoup] = useState(false);

  const {data, isLoading} = useGetShiftsQuery();
  const [signUpForShift, {isLoading: signupLoading}] = useCreateHoursMutation();

  const {shiftId} = route.params;

  const shifts = data?.shifts;
  const jobs = data?.jobs;

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
  const job = jobs.find(j => j.id === shift.job);

  const disabled =
    !mealCount || isNaN(parseInt(mealCount, 10)) || parseInt(mealCount, 10) < 1;

  const onSubmit = () => {
    if (!disabled && job) {
      signUpForShift({
        shiftId,
        mealCount,
        jobId: job.id,
        date: shift.startTime,
        soup,
      })
        .unwrap()
        .then(hours =>
          navigation.navigate('SignupConfirm', {hoursId: hours.id}),
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
        <View style={[styles.signupDetail]}>
          <View style={styles.signupDetailInfo}>
            <View style={styles.signupField}>
              <Text style={styles.confirmLabel}>Date:</Text>
              <Text style={styles.confirmText}>
                {format(
                  zonedTimeToUtc(shift.startTime, 'America/Los_Angeles'),
                  'eeee, M/d/yy',
                )}
              </Text>
            </View>

            <View style={styles.signupField}>
              <Text style={styles.confirmLabel}>Fridge:</Text>
              <Text style={styles.confirmText}>{job.name}</Text>
            </View>
            <Text>{job.location}</Text>

            <View style={styles.signupFields}>
              <View style={styles.signupMealEntry}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="25"
                  placeholderTextColor={placeholderColor}
                  value={mealCount}
                  onChangeText={setMealCount}
                  style={styles.mealCountInput}
                  autoFocus
                  textColor="black"
                />
                <View style={styles.signupMealEntry}>
                  <Text style={styles.mealEntryText}>
                    Number of Meals You Plan to Deliver
                  </Text>
                  <Text>(You can change this later)</Text>
                </View>
              </View>
              <View style={styles.signupField}>
                <BouncyCheckbox
                  onPress={(isChecked: boolean) => setSoup(isChecked)}
                  fillColor="rgb(100,100,250)"
                  unfillColor="white"
                  style={styles.checkbox}
                />
                <Text style={styles.confirmText}>This meal is soup</Text>
              </View>
            </View>
          </View>

          <Text style={styles.signupSubmitText}>
            Click submit to sign up for this slot
          </Text>
          <View style={styles.submitContainer}>
            {signupLoading ? (
              <Loading />
            ) : (
              <Btn
                style={[styles.submitBtn]}
                onPress={onSubmit}
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

export default ShiftDetail;
