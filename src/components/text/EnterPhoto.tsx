import {View, Text, Image} from 'react-native';

import styles from './styles';
import AddPhoto from '../reusable/AddPhoto';
import {PhotoFile} from '../reusable/AddPhoto';

const EnterPhoto = ({
  photo,
  setPhoto,
}: {
  photo: PhotoFile | undefined;
  setPhoto: React.Dispatch<React.SetStateAction<PhotoFile | undefined>>;
}) => {
  const renderPhoto = () => {
    return <Image source={{uri: photo?.uri}} />;
  };

  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Photo (optional):</Text>
      <AddPhoto setPhoto={setPhoto} photoFile={photo} />
      {photo ? renderPhoto() : null}
    </View>
  );
};

export default EnterPhoto;
