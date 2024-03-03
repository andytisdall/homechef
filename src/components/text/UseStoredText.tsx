import {View, Text, StyleSheet, Image} from 'react-native';

import Btn from '../reusable/Btn';
import {colors} from '../shiftSignup/styles';
import photoStyles from '../reusable/styles';
import {
  useCheckStoredQuery,
  useDeleteStoredMutation,
} from '../../state/apis/textApi';

const UseStoredText = ({
  setUsingStoredText,
}: {
  setUsingStoredText: (value: boolean) => void;
}) => {
  const {data: storedText} = useCheckStoredQuery();
  const [deleteStoredText] = useDeleteStoredMutation();

  if (storedText) {
    return (
      <View style={styles.reusePage}>
        <Text style={styles.reuseTitle}>
          Do you want to use this info from your previous alert?
        </Text>
        <View>
          <Text style={styles.reuseTextBold}>{'\u2022 Meal Name'}:</Text>
          <Text style={styles.reuseText}>{storedText.name}</Text>
          <Text style={styles.reuseTextBold}>{'\u2022 Restaurants:'} </Text>
          <Text style={styles.reuseText}>{storedText.restaurants}</Text>
        </View>
        {!!storedText.photoUrl && (
          <View style={photoStyles.photoPreview}>
            <Image
              style={photoStyles.photoPreviewPhoto}
              source={{uri: storedText.photoUrl}}
            />
          </View>
        )}
        <View style={styles.reuseBtnRow}>
          <Btn style={styles.reuseBtn} onPress={() => setUsingStoredText(true)}>
            <Text style={styles.reuseBtnText}>Yes</Text>
          </Btn>
          <Btn style={styles.reuseBtn} onPress={() => deleteStoredText()}>
            <Text style={styles.reuseBtnText}>No</Text>
          </Btn>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  reusePage: {
    alignItems: 'center',
  },
  reuseTitle: {
    fontSize: 35,
    color: 'white',
    marginBottom: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  reuseText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(200,200,200, .8)',
    padding: 10,
  },
  reuseTextBold: {
    fontSize: 25,
    color: 'white',
    marginBottom: 15,
    fontWeight: '600',
  },
  reuseBtnRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  reuseBtn: {
    backgroundColor: colors.light,
    marginHorizontal: 20,
    borderWidth: 2,
  },
  reuseBtnText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    padding: 10,
    width: 100,
  },
});

export default UseStoredText;
