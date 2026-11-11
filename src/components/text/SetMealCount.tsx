import { View, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextStackParamsList } from "./TextNavigator";
import styles from "./styles";
import Controls from "./Controls";
import { colors } from "../shiftSignup/styles";

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "SetMealCount">;

const SetMealCount = ({ route, navigation }: ScreenProps) => {
  const [mealCount, setMealCount] = useState("");

  const { type, provider, mealName } = route.params;

  const nextPage = () =>
    mealCount &&
    navigation.push("SetFridge", { type, provider, mealName, mealCount });

  const prevPage = () => navigation.navigate("SetMealName", { type, provider });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      <View style={styles.sendTextVariablesItem}>
        <Text style={styles.sendTextLabel}>Number of Meals:</Text>
        <TextInput
          style={[styles.sendTextInput, styles.sendTextNumberInput]}
          value={mealCount}
          onChangeText={(text) => {
            if (!isNaN(parseInt(text)) || text === "") {
              setMealCount(text);
            }
          }}
          inputMode="tel"
          textColor="black"
          placeholder="25"
          placeholderTextColor={colors.grey}
          onSubmitEditing={nextPage}
          returnKeyType="next"
          autoFocus
        />
      </View>
      <Controls next={nextPage} prev={prevPage} fieldValid={!!mealCount} />
    </ScrollView>
  );
};

export default SetMealCount;
