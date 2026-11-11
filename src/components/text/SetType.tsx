import { View, Text, ScrollView } from "react-native";

import Btn from "../reusable/Btn";
import styles from "./styles";

const SetType = ({
  setType,
}: {
  setType: (type: "home chef" | "delivery driver") => void;
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      <Text style={styles.sendTextLabel}>Type of Delivery</Text>
      <View style={styles.setType}>
        <Btn
          style={styles.setTypeBtn}
          onPress={() => {
            setType("home chef");
          }}
        >
          <Text style={styles.setTypeBtnText}>Home Chef</Text>
        </Btn>
        <Btn
          style={styles.setTypeBtn}
          onPress={() => {
            setType("delivery driver");
          }}
        >
          <Text style={styles.setTypeBtnText}>Delivery Driver</Text>
        </Btn>
      </View>
    </ScrollView>
  );
};

export default SetType;
