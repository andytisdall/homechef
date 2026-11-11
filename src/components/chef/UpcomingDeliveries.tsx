import { View, Pressable, Text, FlatList } from "react-native";
import { useState, useMemo } from "react";

import { animate } from "./ChefShifts";
import styles from "../shiftSignup/styles";
import chefStyles from "./styles";
import Arrow from "../../assets/right-arrow.svg";
import { useGetHoursQuery } from "../../state/apis/volunteerApi";
import Hour from "./Hour";

const UpcomingDeliveries = () => {
  const [expand, setExpand] = useState(false);

  const { data: hours } = useGetHoursQuery();

  const sortedHours = useMemo(() => {
    if (hours) {
      return [...Object.values(hours)]
        .sort((a, b) => (a.time > b.time ? 1 : -1))
        .filter((h) => h.status === "Confirmed");
    }
  }, [hours]);

  const arrowStyle = expand ? chefStyles.arrowDown : undefined;

  const renderHours = () => {
    if (hours) {
      return (
        <FlatList
          style={chefStyles.chefList}
          renderItem={({ item }) => <Hour hour={item} key={item.id} />}
          data={sortedHours}
        />
      );
    } else {
      return <Text style={chefStyles.chefNoShifts}>No Deliveries Found</Text>;
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          animate();
          setExpand((current) => !current);
        }}
      >
        {({ pressed }) => {
          const btnStyle: any[] = [chefStyles.chefListHeader];
          if (pressed) {
            btnStyle.push(styles.highlight);
          }
          return (
            <View style={btnStyle}>
              <View style={chefStyles.arrow}>
                <Arrow style={arrowStyle} />
              </View>
              <Text style={styles.signupTitle}>Upcoming Deliveries</Text>
            </View>
          );
        }}
      </Pressable>
      <View>{expand && renderHours()}</View>
    </View>
  );
};

export default UpcomingDeliveries;
