import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Pressable, View, Text, Image} from 'react-native';
import React, {useState} from 'react';

import Btn from './Btn';
import styles from './styles';
import Loading from './Loading';

interface AddPhotoProps {
  setPhoto: React.Dispatch<React.SetStateAction<PhotoFile | undefined>>;
  photoFile: PhotoFile | undefined;
}

export interface PhotoFile {
  name?: string;
  type?: string;
  uri?: string;
}

const AddPhoto = ({setPhoto, photoFile}: AddPhotoProps) => {
  const [photoLoading, setPhotoLoading] = useState(false);

  const setLocalPhoto = (response: ImagePickerResponse) => {
    if (!response.didCancel && !response.errorCode && response.assets) {
      const photo = response.assets[0];
      setPhoto({
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
      });
      setPhotoLoading(true);
    }
  };

  const getPhotoFromLibrary = async () => {
    const photo = await launchImageLibrary({
      mediaType: 'photo',
    });
    setLocalPhoto(photo);
  };

  const takePhoto = async () => {
    const photo = await launchCamera({mediaType: 'photo'});
    setLocalPhoto(photo);
  };

  const renderPhoto = () => {
    return (
      <View style={styles.photoPreview}>
        <Pressable
          style={styles.photoDelete}
          onPress={() => setPhoto(undefined)}>
          <Text style={styles.photoDeleteText}>X</Text>
        </Pressable>
        {photoLoading && <Loading />}
        <Image
          style={styles.photoPreviewPhoto}
          source={{uri: photoFile?.uri}}
          alt="preview"
          onLoad={() => setPhotoLoading(false)}
        />
      </View>
    );
  };

  return (
    <View style={styles.photo}>
      <Btn style={styles.btn} onPress={getPhotoFromLibrary}>
        <Text style={styles.btnText}>Select Photo from Your Library</Text>
      </Btn>
      <Btn style={styles.btn} onPress={takePhoto}>
        <Text style={styles.btnText}>Take Photo</Text>
      </Btn>
      {!!photoFile && renderPhoto()}
    </View>
  );
};

export default AddPhoto;
