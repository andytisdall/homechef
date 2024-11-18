import {View, Text, Pressable, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {SignupStackParamsList} from './Signup';
import styles from './styles';
import Loading from '../reusable/Loading';
import {useGetShiftsQuery} from '../../state/apis/volunteerApi';

export interface Job {
  id: string;
  name: string;
  location: string;
  shifts: string[];
  active: boolean;
  ongoing: boolean;
  description: string;
  campaign: string;
}

export interface Shift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  restaurantMeals: boolean;
  duration: number;
}

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'ShiftSignup'>;

const RegionHeader = ({title}: {title: string}) => {
  return <Text style={styles.regionHeader}>{title}</Text>;
};

const VolunteerJobsList = ({navigation}: ScreenProps) => {
  const {data, isLoading} = useGetShiftsQuery();
  const jobs = data?.jobs;

  const sortedJobs = jobs
    ?.filter(job => job.ongoing)
    .sort(a => (a.active ? -1 : 1));

  const eastFridges = sortedJobs?.filter(j => j.region === 'East Oakland');
  const westFridges = sortedJobs?.filter(j => j.region === 'West Oakland');

  const renderJob = ({item}: {item: Job}) => {
    const nameStyle: any[] = [styles.jobName];
    if (!item.active) {
      nameStyle.push(styles.jobInactiveText);
    }
    return (
      <Pressable
        onPress={() => navigation.navigate('Fridge', {jobId: item.id})}
        key={item.id}
        disabled={!item.active}>
        {({pressed}) => {
          const btnStyle: any[] = [styles.jobContainer];
          if (pressed) {
            btnStyle.push(styles.highlight);
          }
          return (
            <View style={btnStyle}>
              <Text style={nameStyle}>{item.name}</Text>
              {item.active ? (
                <Text>{item.location}</Text>
              ) : (
                <Text style={styles.jobInactiveText}>Out of Service</Text>
              )}
            </View>
          );
        }}
      </Pressable>
    );
  };

  const eastList = (
    <FlatList
      data={eastFridges}
      renderItem={renderJob}
      style={styles.flatList}
      ListHeaderComponent={<RegionHeader title="East Oakland" />}
    />
  );

  const westList = (
    <FlatList
      data={westFridges}
      renderItem={renderJob}
      style={styles.flatList}
      ListHeaderComponent={<RegionHeader title="West Oakland" />}
    />
  );

  return (
    <View style={[styles.jobList, styles.scrollView]}>
      {isLoading ? (
        <Loading />
      ) : !jobs?.length ? (
        <Text>No jobs could be found.</Text>
      ) : (
        <FlatList data={[eastList, westList]} renderItem={({item}) => item} />
      )}
    </View>
  );
};

export default VolunteerJobsList;
