import {View, Text} from 'react-native';

import styles from './styles';

const DayNames = () => {
  return (
    <View style={styles.calendarWeekdays}>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Sun</Text>
      </View>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Mon</Text>
      </View>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Tue</Text>
      </View>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Wed</Text>
      </View>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Thu</Text>
      </View>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Fri</Text>
      </View>
      <View style={styles.calendarWeekday}>
        <Text style={styles.calendarWeekdayText}>Sat</Text>
      </View>
    </View>
  );
};

export default DayNames;
