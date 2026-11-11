import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SignupStackParamsList } from "./Signup";

import { Job } from "@community-kitchens/apiinterfaces";
import styles from "./styles";

type NavigationProp = NativeStackNavigationProp<
  SignupStackParamsList,
  "ShiftSignup"
>;

const FridgeListItem = ({ fridge }: { fridge: Job }) => {
  const navigation = useNavigation<NavigationProp>();
  const nameStyle: any[] = [styles.jobName];
  if (!fridge.active) {
    nameStyle.push(styles.jobInactiveText);
  }
  const renderLocation = () => {
    if (fridge.location) {
      return (
        <View style={styles.address}>
          <Text>{fridge.location}</Text>
          {!!fridge.locationCity && (
            <Text>
              {", "}
              {fridge.locationCity}
            </Text>
          )}
        </View>
      );
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("Fridge", { jobId: fridge.id })}
      key={fridge.id}
      disabled={!fridge.active}
    >
      {({ pressed }) => {
        const btnStyle: any[] = [styles.jobContainer];
        if (pressed) {
          btnStyle.push(styles.highlight);
        }
        return (
          <View style={btnStyle}>
            <Text style={nameStyle}>{fridge.name}</Text>
            {fridge.active ? (
              renderLocation()
            ) : (
              <Text style={styles.jobInactiveText}>Out of Service</Text>
            )}
          </View>
        );
      }}
    </Pressable>
  );
};

export default FridgeListItem;
