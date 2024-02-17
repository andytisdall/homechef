import {Pressable, View, Text, Image, ScrollView} from 'react-native';
import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TextStackParamList} from './Text';
import styles from './styles';
import photoStyles from '../reusable/styles';
import Loading from '../reusable/Loading';
import {useSendTextMutation} from '../../state/apis/textApi';

export type SentMessage = {
  message: string;
  photoUrl: string | undefined;
  region: 'WEST_OAKLAND' | 'EAST_OAKLAND';
};

interface TextSuccessProps {
  navigation: {navigate: (name: string) => void; pop: () => void};
}

type ScreenProps = NativeStackScreenProps<TextStackParamList, 'TextSuccess'>;

const regionNames = {
  EAST_OAKLAND: 'East Oakland',
  WEST_OAKLAND: 'West Oakland',
};

const TextSuccess = ({navigation}: TextSuccessProps & ScreenProps) => {
  const [photoLoading, setPhotoLoading] = useState(true);

  const [, {data: message}] = useSendTextMutation({
    fixedCacheKey: 'send-text',
  });

  if (message) {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.sendText}>
          <Text style={styles.textPreviewTitle}>Success!</Text>
          <View>
            <Text style={styles.textPreviewRegion}>
              You have successfully sent this text:
            </Text>

            <Text style={styles.textPreviewText}>{message.message}</Text>

            <Text style={styles.textPreviewRegion}>
              Region: {regionNames[message.region]}
            </Text>
            {!!message.photoUrl && (
              <View style={photoStyles.photoPreview}>
                {photoLoading && <Loading />}
                <Image
                  source={{uri: message.photoUrl}}
                  onLoad={() => setPhotoLoading(false)}
                  alt="attached"
                  style={photoStyles.photoPreviewPhoto}
                />
              </View>
            )}
          </View>

          <Pressable
            style={[styles.backBtn]}
            onPress={() => {
              navigation.push('SendText');
            }}>
            <Text style={styles.backBtnText}>Send Another Text Alert</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
};

export default TextSuccess;
