import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

import styles, {placeholderColor} from './styles';

const EnterName = ({
  name,
  setName,
  next,
}: {
  name: string;
  setName: (text: string) => void;
  next: () => void;
}) => {
  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Name of Meal:</Text>
      <TextInput
        style={styles.sendTextInput}
        value={name}
        onChangeText={setName}
        textColor="black"
        multiline
        placeholder="Meatloaf with Couscous and Broccoli"
        placeholderTextColor={placeholderColor}
        inputMode="search"
        onSubmitEditing={next}
        returnKeyType="next"
        blurOnSubmit
      />
    </View>
  );
};

export default EnterName;
