import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

import styles from './styles';
import {placeholderColor} from './styles';

const EnterRestaurants = ({
  next,
  restaurants,
  setRestaurants,
}: {
  next: () => void;
  restaurants: string;
  setRestaurants: (text: string) => void;
}) => {
  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>
        Names of Restaurants Providing Meals
      </Text>
      <TextInput
        style={styles.sendTextInput}
        value={restaurants}
        onChangeText={setRestaurants}
        textColor="black"
        multiline
        placeholder="Paddy's Pub"
        placeholderTextColor={placeholderColor}
        inputMode="search"
        onSubmitEditing={next}
        returnKeyType="next"
        blurOnSubmit
        autoFocus
        autoCorrect={false}
      />
    </View>
  );
};

export default EnterRestaurants;
