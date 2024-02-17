import {Text, View, Pressable, PanResponder} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {format, utcToZonedTime} from 'date-fns-tz';
import {
  startOfMonth,
  getDaysInMonth,
  addDays,
  getDay,
  subMonths,
  addMonths,
} from 'date-fns';

import Arrow from '../../../assets/right-arrow.svg';
import styles from './styles';

const Calendar = ({
  renderItems,
}: {
  renderItems: (day: string) => React.JSX.Element;
}) => {
  const [month, setMonth] = useState(new Date());

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < -20) {
          setMonth(current => addMonths(current, 1));
        } else if (gesture.dx > 20) {
          setMonth(current => subMonths(current, 1));
        }
      },
    }),
  ).current;

  const getDays = useCallback(() => {
    const days = [];
    const firstDay = startOfMonth(month);
    const dayOfWeek = getDay(firstDay);
    for (let i = 0; i < dayOfWeek; i++) {
      days.push(null);
    }
    const numberOfDays = getDaysInMonth(month);
    for (let i = 0; i < numberOfDays; i++) {
      const date = addDays(firstDay, i);

      days.push(
        format(utcToZonedTime(date, 'America/Los_Angeles'), 'yyyy-MM-dd'),
      );
    }
    return days.map((d, i) => {
      if (!d) {
        return <View style={styles.blankDate} key={i} />;
      }
      const items = renderItems(d);

      return (
        <View style={styles.calendarDate} key={d}>
          <View style={styles.calendarDateBackground}>
            <View style={styles.calendarDateNumberContainer}>
              <Text style={styles.calendarDateNumber}>
                {format(utcToZonedTime(d, 'America/Los_Angeles'), 'd')}
              </Text>
            </View>
            {items}
          </View>
        </View>
      );
    });
  }, [month, renderItems]);

  const dayNames = () => {
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

  const header = () => {
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

  return (
    <View {...panResponder.panHandlers}>
      {header()}
      {dayNames()}
      <View style={styles.calendar}>{getDays()}</View>
    </View>
  );
};

export default Calendar;
