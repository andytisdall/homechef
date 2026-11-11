import { FlatList, Text } from "react-native";

import { Job } from "@community-kitchens/apiinterfaces";
import styles from "./styles";
import FridgeListItem from "./FridgeListItem";

const RegionList = ({ fridges, title }: { fridges: Job[]; title: string }) => {
  return (
    <FlatList
      data={fridges}
      renderItem={({ item }) => <FridgeListItem fridge={item} />}
      style={styles.fridgeList}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<Text style={styles.regionHeader}>{title}</Text>}
    />
  );
};

export default RegionList;
