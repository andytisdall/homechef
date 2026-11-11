import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
