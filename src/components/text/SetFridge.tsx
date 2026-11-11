import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextStackParamsList } from "./TextNavigator";
import styles from "./styles";
import Controls from "./Controls";
import { useCheckStoredQuery } from "../../state/apis/textApi";
import { useGetShiftsQuery } from "../../state/apis/volunteerApi";
import Loading from "../reusable/Loading";

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "SetFridge">;

const SetFridge = ({ route, navigation }: ScreenProps) => {
  const [fridgeMenuOpen, setFridgeMenuOpen] = useState(false);
  const [fridgeId, setFridgeId] = useState<string>();
  const { data: storedText } = useCheckStoredQuery();

  const { height } = useWindowDimensions();

  const { data, isLoading } = useGetShiftsQuery();
  const townFridges = data?.jobs.filter((f) => f.active);
  const fridge = townFridges?.find((f) => f.id === fridgeId);

  const { type, provider, mealName, mealCount } = route.params;

  const nextPage = () => {
    if (townFridges && fridge !== undefined) {
      if (storedText) {
        navigation.push("Confirm", {
          type,
          provider,
          mealName,
          mealCount,
          fridge,
        });
      } else {
        navigation.push("SetPhoto", {
          type,
          provider,
          mealName,
          mealCount,
          fridge,
        });
      }
    }
  };

  const prevPage = () =>
    navigation.navigate("SetMealCount", { type, provider, mealName });

  const getFridgeOptions = () => {
    if (townFridges) {
      const options = townFridges
        .filter((f) => !f.noTextAlert)
        .map((f) => {
          return {
            label: f.name,
            value: f.id,
          };
        });
      return options;
    }
    return [];
  };

  const getRegion = () => {
    if (fridge && townFridges) {
      return fridge.region;
    }
    return "";
  };

  const renderFridgeInfo = () => {
    if (!fridge) {
      return (
        <View>
          <Text style={styles.fridgeNotesText}>
            Note: The following fridges do not receive a text alert:
          </Text>
          {townFridges
            ?.filter((f) => f.noTextAlert)
            .map((f) => (
              <Text key={f.id} style={styles.fridgeNotesSubText}>
                • {f.name}
              </Text>
            ))}
        </View>
      );
    }
    if (fridge !== undefined && townFridges) {
      return (
        <View style={styles.fridgeInfo}>
          <View>
            {!!fridge.location && (
              <>
                <Text style={styles.fridgeInfoLabel}>Address: </Text>

                <Text style={styles.fridgeInfoValue}>{fridge.location}</Text>
              </>
            )}
          </View>
          <View>
            <Text style={styles.fridgeInfoLabel}>Region: </Text>
            <Text style={styles.fridgeInfoValue}>{getRegion()}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Pressable
        onPress={() => setFridgeMenuOpen(false)}
        style={styles.sendText}
      >
        <View style={styles.sendTextVariablesItem}>
          <Text style={styles.sendTextLabel}>Town Fridge Location:</Text>
          <View style={styles.fridgeSelect}>
            {isLoading ? (
              <Loading />
            ) : (
              <DropDownPicker
                open={fridgeMenuOpen}
                value={fridge?.id || null}
                items={getFridgeOptions()}
                setOpen={setFridgeMenuOpen}
                setValue={setFridgeId}
                listMode="MODAL"
                placeholder="Select a Town Fridge"
                maxHeight={Math.round(height) / 2}
                zIndex={100}
                listItemContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                selectedItemContainerStyle={styles.selectedFridgeStyle}
              />
            )}

            {renderFridgeInfo()}
          </View>
          <Controls
            next={nextPage}
            prev={prevPage}
            fieldValid={!!townFridges && !!fridge}
          />
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default SetFridge;
