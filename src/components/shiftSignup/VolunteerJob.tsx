import {format, utcToZonedTime} from 'date-fns-tz';
import {useCallback, useMemo} from 'react';
import {View, Text, Platform, UIManager, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {SignupStackParamsList} from './Signup';
import styles from './styles';
import {Shift} from './VolunteerJobsList';
import Loading from '../reusable/Loading';
import Btn from '../reusable/Btn';
import {useGetShiftsQuery} from '../../state/apis/volunteerApi';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'Fridge'>;

const VolunteerJob = ({route, navigation}: ScreenProps) => {
  const {jobId} = route.params;

  const {data, isLoading} = useGetShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const job = jobs?.find(j => j.id === jobId);

  const renderShift = useCallback(
    ({item}: {item: Shift}) => {
      return (
        <View style={styles.shift} key={item.id}>
          <View style={styles.shiftSignupBtnContainer}>
            {item.open ? (
              <Btn
                style={styles.signupBtn}
                onPress={() =>
                  navigation.navigate('ShiftDetail', {shiftId: item.id})
                }>
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </Btn>
            ) : (
              <Text style={styles.fullShift}>full</Text>
            )}
          </View>

          <Text style={styles.jobDate}>
            {format(
              utcToZonedTime(item.startTime, 'America/Los_Angeles'),
              'M/d/yy',
            )}
          </Text>
          <Text>
            {format(
              utcToZonedTime(item.startTime, 'America/Los_Angeles'),
              'eeee',
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
    const jobShifts = job.shifts
      .map(id => shifts[id])
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

    return (
      <FlatList
        style={[styles.shiftList, styles.flatList]}
        data={jobShifts}
        renderItem={renderShift}
      />
    );
  }, [job, renderShift, shifts]);

  if (!isLoading) {
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
    <View style={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={styles.jobHeader}>
          <Text style={[styles.signupTitle, styles.signupMain]}>
            {job.name}
          </Text>
        </View>
        {!!job.location && (
          <Text style={styles.location}>Location: {job.location}</Text>
        )}
        {job.active ? renderShifts : <Text>Out of Service</Text>}
      </View>
    </View>
  );
};

export default VolunteerJob;
