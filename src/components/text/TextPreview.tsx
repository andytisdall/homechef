// import heic2any from 'heic2any';
// import {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import Btn from '../reusable/Btn';
import styles from './styles';
import photoStyles from '../reusable/styles';
import {PhotoFile} from '../reusable/AddPhoto';
import {useCheckStoredQuery} from '../../state/apis/textApi';
import {useGetUserQuery} from '../../state/apis/authApi';
import {useState} from 'react';

interface TextPreviewProps {
  onSubmit: () => void;
  message: string;
  region: string;
  photo: PhotoFile | undefined;
  onCancel: () => void;
  createMealDelivery: () => void;
}

const TextPreview = ({
  onSubmit,
  message,
  region,
  photo,
  onCancel,
  createMealDelivery,
}: TextPreviewProps) => {
  const [askToLog, setAskToLog] = useState(false);

  const {data: user} = useGetUserQuery();
  const {data: stored} = useCheckStoredQuery();

  const renderCreateDelivery = () => {
    return (
      <View>
        <Text style={styles.textPreviewTitle}>
          Do you want to log this delivery?
        </Text>
        <Text style={styles.textPreviewText}>
          Please log if the delivery was not scheduled.
        </Text>
        <View style={styles.textPreviewBtns}>
          <Btn
            style={styles.sendBtn}
            onPress={() => {
              createMealDelivery();
              onSubmit();
            }}>
            <Text>Yes</Text>
          </Btn>
          <Btn
            style={[styles.sendBtn, styles.cancel]}
            onPress={() => {
              onSubmit();
            }}>
            <Text>No</Text>
          </Btn>
        </View>
      </View>
    );
  };

  if (askToLog) {
    return renderCreateDelivery();
  }

  return (
    <View style={styles.textPreview}>
      <Text style={styles.textPreviewTitle}>Confirm Your Message:</Text>
      <Text style={styles.textPreviewText}>{message}</Text>
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
        <Btn
          style={styles.sendBtn}
          onPress={() => {
            // if user is busdriver, ask to log
            if (user?.busDriver) {
              setAskToLog(true);
            } else {
              onSubmit();
            }
          }}>
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
