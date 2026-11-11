import { useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  Switch,
  Pressable,
  FlatList,
} from "react-native";

import styles from "./styles";
import VolunteerJobsList from "./VolunteerJobsList";
import HomeChefCalendar from "./HomeChefCalendar";

type ViewType = "calendar" | "list";

const ShiftSignup = () => {
  const [viewType, setViewType] = useState<ViewType>("list");

  const switchViewType = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity
      )
    );
    const type = viewType === "list" ? "calendar" : "list";
    setViewType(type);
  };

  const renderHeader = () => {
    let viewIsCalendar = false;
    if (viewType === "calendar") {
      viewIsCalendar = true;
    }
    return (
      <View style={styles.switchRow}>
        <Pressable
          onPress={() => (viewType !== "list" ? switchViewType() : null)}
          style={styles.switchBtn}
        >
          {({ pressed }) => {
            let extraStyle;
            if (pressed) {
              extraStyle = styles.highlight;
            }
            return (
              <Text style={[styles.switchText, extraStyle]}>
                Town Fridge List
              </Text>
            );
          }}
        </Pressable>
        <Switch
          thumbColor="blue"
          onChange={switchViewType}
          value={viewIsCalendar}
          trackColor={{ false: "grey", true: "grey" }}
        />
        <Pressable
          onPress={() => (viewType !== "calendar" ? switchViewType() : null)}
          style={styles.switchBtn}
        >
          {({ pressed }) => {
            let extraStyle;
            if (pressed) {
              extraStyle = styles.highlight;
            }
            return (
              <Text style={[styles.switchText, extraStyle]}>Calendar</Text>
            );
          }}
        </Pressable>
      </View>
    );
  };

  const signupList =
    viewType === "list" ? <VolunteerJobsList /> : <HomeChefCalendar />;

  return (
    <FlatList
      data={[
        <FlatList
          data={[renderHeader(), signupList]}
          renderItem={({ item }) => item}
          style={[styles.signupMain]}
        />,
      ]}
      renderItem={({ item }) => item}
      contentContainerStyle={[styles.homeChef]}
      scrollEnabled={viewType === "list"}
    />
  );
};

export default ShiftSignup;
