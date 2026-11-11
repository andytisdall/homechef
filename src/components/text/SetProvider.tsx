import { View, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";

import Controls from "./Controls";
import { UserType } from "./TextNavigator";
import styles from "./styles";
import { colors } from "../shiftSignup/styles";

const SetProvider = ({
  next,
  prev,
  type,
}: {
  next: (args: { type: UserType; provider: string }) => void;
  prev?: () => void;
  type: "home chef" | "delivery driver";
}) => {
  const defaultProvider =
    type === "home chef" ? "CK Home Chef volunteers" : "the CK Kitchen";

  const [provider, setProvider] = useState(defaultProvider);

  const nextPage = () => provider && next({ type, provider });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      <View style={styles.sendTextVariablesItem}>
        <Text style={styles.sendTextLabel}>Name of Meal Provider</Text>
        <TextInput
          style={styles.sendTextInput}
          value={provider}
          onChangeText={setProvider}
          textColor="black"
          multiline
          placeholder="Paddy's Pub"
          placeholderTextColor={colors.grey}
          inputMode="search"
          onSubmitEditing={nextPage}
          returnKeyType="next"
          autoFocus
          autoCorrect={false}
          submitBehavior="blurAndSubmit"
          editable={type === "delivery driver"}
        />
      </View>
      <Controls next={nextPage} fieldValid={!!provider} prev={prev} />
    </ScrollView>
  );
};

export default SetProvider;
