import {View, Text, ScrollView, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {zonedTimeToUtc, format} from 'date-fns-tz';

import styles from './styles';
import {SignupStackParamsList} from './Signup';
import {useGetShiftsQuery} from '../../state/apis/volunteerApi';
import Loading from '../reusable/Loading';

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'DateDetail'>;

const DateDetail = ({route, navigation}: ScreenProps) => {
  const {data, isLoading} = useGetShiftsQuery();

  const {shiftIds, date} = route.params;
  const shifts = data?.shifts;
  const jobs = data?.jobs;
  if (!shifts) {
    return <View>Shift Not Found</View>;
  }

  const dateShifts = shiftIds.map(id => shifts[id]);
  if (shifts && !dateShifts.length) {
    return <View>Shift Not Found</View>;
  }

  const renderShifts = () => {
    if (jobs) {
      return dateShifts.map(shift => {
        const job = jobs.find(j => j.id === shift.job);
        return (
          <Pressable
            key={shift.id}
            onPress={() =>
              navigation.navigate('ShiftDetail', {shiftId: shift.id})
            }>
            {({pressed}) => {
              const btnStyle: any[] = [styles.jobContainer];
              if (pressed) {
                btnStyle.push(styles.highlight);
              }
              return (
                <View style={btnStyle}>
                  <Text style={styles.jobName}>{job?.name}</Text>
                  <Text>{job?.location}</Text>
                </View>
              );
            }}
          </Pressable>
        );
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <Text style={[styles.jobContainer, styles.signupTitle]}>
          {format(zonedTimeToUtc(date, 'America/Los_Angeles'), 'eeee, M/d/yy')}
        </Text>
        <Text style={styles.signupTitle}>Available Fridges</Text>
        {renderShifts()}
      </View>
    </ScrollView>
  );
};

export default DateDetail;
