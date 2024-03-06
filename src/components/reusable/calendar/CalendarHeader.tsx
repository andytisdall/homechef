import {View, Text, Pressable} from 'react-native';
import {addMonths, subMonths, format} from 'date-fns';

import styles from './styles';
import Arrow from '../../../assets/right-arrow.svg';

const CalendarHeader = ({
  month,
  setMonth,
}: {
  month: Date;
  setMonth: (date: Date) => void;
}) => {
  return (
    <View style={styles.monthHeader}>
      <Pressable
        onPress={() => {
          setMonth(subMonths(month, 1));
        }}
        style={[styles.arrow, styles.left]}>
        <Arrow />
      </Pressable>
      <Text style={styles.monthTitle}>{format(month, 'MMMM yyyy')}</Text>
      <Pressable
        onPress={() => {
          setMonth(addMonths(month, 1));
        }}
        style={styles.arrow}>
        <Arrow />
      </Pressable>
    </View>
  );
};

export default CalendarHeader;
