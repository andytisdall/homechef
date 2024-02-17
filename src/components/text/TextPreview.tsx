// import heic2any from 'heic2any';
// import {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import Btn from '../reusable/Btn';
import styles from './styles';
import photoStyles from '../reusable/styles';
import {PhotoFile} from '../reusable/AddPhoto';
import {useCheckStoredQuery} from '../../state/apis/textApi';
// import Loading from '../reusable/Loading';

interface TextPreviewProps {
  onSubmit: () => void;
  message: string;
  region: string;
  photo: PhotoFile | undefined;
  onCancel: () => void;
}

const TextPreview = ({
  onSubmit,
  message,
  region,
  photo,
  onCancel,
}: TextPreviewProps) => {
  // const [image, setImage] = useState(photo);

  // useEffect(() => {
  //   if (photo?.name.toLowerCase().includes('.heic')) {
  //     setImage(null);
  //     const convert = async () => {
  //       const pic = await heic2any({
  //         blob: photo,
  //         toType: 'image/jpeg',
  //         quality: 0.3,
  //       });
  //       setImage(pic);
  //     };
  //     convert();
  //   }
  // }, [photo]);
  const {data: stored} = useCheckStoredQuery();
  return (
    <View style={styles.textPreview}>
      <Text style={styles.textPreviewTitle}>Confirm Your Message:</Text>
      <Text style={styles.textPreviewText}>{message}</Text>
      {/* {photo && !image && <Loading />} */}
      {(!!photo || !!stored?.photoUrl) && (
        <View style={photoStyles.photoPreview}>
          <Image
            style={photoStyles.photoPreviewPhoto}
            source={{uri: photo?.uri || stored?.photoUrl}}
            alt="preview"
          />
        </View>
      )}

      <Text style={styles.textPreviewRegion}>Region: {region}</Text>
      <View style={styles.textPreviewBtns}>
        <Btn style={styles.sendBtn} onPress={onSubmit}>
          <Text style={styles.sendBtnText}>Send Message</Text>
        </Btn>

        <Btn style={[styles.sendBtn, styles.cancel]} onPress={onCancel}>
          <Text style={styles.sendBtnText}>Start Over</Text>
        </Btn>
      </View>
    </View>
  );
};

export default TextPreview;
