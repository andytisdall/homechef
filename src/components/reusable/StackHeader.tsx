import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Pressable, Animated, StyleSheet, View, Text } from "react-native";
import { useRef } from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import Arrow from "../../assets/right-arrow.svg";

export const TITLE_FONT = "Alice";

const StackHeader = ({
  navigation,
  route,
  options,
}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.header}>
      {options.headerBackVisible && (
        <Animated.View
          style={[
            {
              transform: [{ translateY: translateValue }],
            },
            styles.btn,
          ]}
        >
          <Pressable
            onPressIn={() => {
              Animated.timing(translateValue, {
                toValue: 4,
                duration: 50,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() =>
              Animated.timing(translateValue, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
              }).start()
            }
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.pressable}
          >
            <Arrow style={[styles.arrow]} />
          </Pressable>
        </Animated.View>
      )}

      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "center",
    borderBottomWidth: 3,
    minHeight: 50,
  },
  title: {
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    color: "black",
    fontFamily: TITLE_FONT,
    textAlign: "center",
  },
  btn: {
    marginLeft: 10,
    height: 35,
    width: 35,
    position: "absolute",
    left: 5,
  },
  pressable: { width: "100%", height: "100%" },
  arrow: {
    transform: [
      { rotate: "180deg" },
      { translateX: 10.5 },
      { translateY: -6.5 },
    ],
    maxHeight: 20,
    maxWidth: 20,
    position: "absolute",
    left: "50%",
  },
});

export default StackHeader;
