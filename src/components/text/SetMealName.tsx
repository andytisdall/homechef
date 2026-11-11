import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { TextInput } from "react-native-paper";

import { TextStackParamsList } from "./TextNavigator";
import styles from "./styles";
import { colors } from "../shiftSignup/styles";
import Controls from "./Controls";

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "SetMealName">;

const SetMealName = ({ route, navigation }: ScreenProps) => {
  const [mealName, setMealName] = useState("");

  const { type, provider } = route.params;

  const nextPage = () =>
    mealName && navigation.push("SetMealCount", { type, provider, mealName });

  const prevPage = () => {
    navigation.navigate("Start", { type });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      <View style={styles.sendTextVariablesItem}>
        <Text style={styles.sendTextLabel}>Name of Meal:</Text>
        <TextInput
          textColor="black"
          style={styles.sendTextInput}
          value={mealName}
          onChangeText={setMealName}
          multiline
          placeholder="Chicken Alfredo Pasta with Veggies"
          placeholderTextColor={colors.grey}
          inputMode="search"
          autoFocus
          onSubmitEditing={nextPage}
          returnKeyType="next"
          submitBehavior="blurAndSubmit"
        />
      </View>
      <Controls next={nextPage} prev={prevPage} fieldValid={!!mealName} />
    </ScrollView>
  );
};

export default SetMealName;
