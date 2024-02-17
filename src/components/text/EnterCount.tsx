import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

import styles, {placeholderColor} from './styles';

const EnterCount = ({
  mealCount,
  setMealCount,
  next,
}: {
  mealCount: string;
  setMealCount: (text: string) => void;
  next: () => void;
}) => {
  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Number of Meals:</Text>
      <TextInput
        style={[styles.sendTextInput, styles.sendTextNumberInput]}
        value={mealCount}
        onChangeText={setMealCount}
        inputMode="tel"
        textColor="black"
        placeholder="25"
        placeholderTextColor={placeholderColor}
        onSubmitEditing={next}
        autoFocus
        returnKeyType="next"
      />
    </View>
  );
};

export default EnterCount;
