import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextStackParamsList } from "./TextNavigator";
import styles from "./styles";
import AddPhoto from "../reusable/AddPhoto";
import { PhotoFile } from "../reusable/AddPhoto";
import Controls from "./Controls";

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "SetPhoto">;

const SetPhoto = ({ route, navigation }: ScreenProps) => {
  const [photo, setPhoto] = useState<PhotoFile>();

  const { type, provider, mealName, mealCount, fridge } = route.params;

  const nextPage = () =>
    navigation.push("Confirm", {
      type,
      provider,
      mealName,
      mealCount,
      fridge,
      photo,
    });

  const prevPage = () =>
    navigation.navigate("SetFridge", { type, provider, mealName, mealCount });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      <View style={styles.sendTextVariablesItem}>
        <Text style={styles.sendTextLabel}>Photo (optional):</Text>
        <AddPhoto setPhoto={setPhoto} photoFile={photo} />
        <Controls next={nextPage} prev={prevPage} />
      </View>
    </ScrollView>
  );
};

export default SetPhoto;
