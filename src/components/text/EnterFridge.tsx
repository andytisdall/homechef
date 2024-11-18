import {View, Text, useWindowDimensions} from 'react-native';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {useGetFridgesQuery} from '../../state/apis/textApi';
import styles from './styles';

const EnterFridge = ({
  fridge,
  setFridge,
  region,
}: {
  fridge: number | undefined;
  setFridge: React.Dispatch<React.SetStateAction<number | undefined>>;
  region: string;
}) => {
  const [fridgeMenuOpen, setFridgeMenuOpen] = useState(false);

  const {height} = useWindowDimensions();

  const {data: townFridges} = useGetFridgesQuery();

  const renderFridgeOptions = () => {
    if (townFridges) {
      const options = [...townFridges].sort().map((f, i) => {
        return {
          label: f.name,
          value: i,
        };
      });
      // if (fridge) {
      //   options.splice(fridge, 1);
      // }
      return options;
    }
    return [];
  };

  const renderFridgeInfo = () => {
    if (fridgeMenuOpen) {
      return (
        <View style={styles.fridgeNotes}>
          <Text style={styles.fridgeNotesText}>
            Note: Bartlett fridge deliveries do not get a text message.
          </Text>
        </View>
      );
    }
    if (fridge !== undefined && townFridges) {
      return (
        <View style={styles.fridgeInfo}>
          <View>
            {!!townFridges[fridge].location && (
              <>
                <Text style={styles.fridgeInfoLabel}>Address: </Text>

                <Text style={styles.fridgeInfoValue}>
                  {townFridges[fridge].location}
                </Text>
              </>
            )}
          </View>
          <View>
            <Text style={styles.fridgeInfoLabel}>Region: </Text>
            <Text style={styles.fridgeInfoValue}>{region}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Town Fridge Location:</Text>
      <View style={styles.fridgeSelect}>
        <DropDownPicker
          open={fridgeMenuOpen}
          value={fridge === undefined ? null : fridge}
          items={renderFridgeOptions()}
          setOpen={setFridgeMenuOpen}
          setValue={setFridge}
          listMode="SCROLLVIEW"
          placeholder="Select a Town Fridge"
          maxHeight={Math.round(height) / 2}
          zIndex={100}
          listItemContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          selectedItemContainerStyle={styles.selectedFridgeStyle}
        />

        {renderFridgeInfo()}
      </View>
    </View>
  );
};

export default EnterFridge;
