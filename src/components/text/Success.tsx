import { Pressable, View, Text, Image, ScrollView } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextStackParamsList } from "./TextNavigator";
import styles from "./styles";
import photoStyles from "../reusable/styles";
import Loading from "../reusable/Loading";
import { Region } from "@community-kitchens/apiinterfaces";

export type SentMessage = {
  message: string;
  region: Region;
  photoUrl?: string;
};

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "Success">;

const Success = ({ route, navigation }: ScreenProps) => {
  const [photoLoading, setPhotoLoading] = useState(true);

  const { message, photoUrl, region } = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      <View style={styles.sendTextVariablesItem}>
        <Text style={styles.textPreviewTitle}>Success!</Text>
        <View>
          <Text style={styles.textPreviewRegion}>
            You have successfully sent this text:
          </Text>

          <Text style={styles.textPreviewText}>{message}</Text>

          <Text style={styles.textPreviewRegion}>
            Region:{" "}
            {region
              .split("_")
              .map((r) => r[0] + r.slice(1).toLowerCase())
              .join(" ")}
          </Text>
          {!!photoUrl && (
            <View style={photoStyles.photoPreview}>
              {photoLoading && <Loading />}
              <Image
                source={{ uri: photoUrl }}
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
            navigation.push("Start", { type: undefined });
          }}
        >
          <Text style={styles.backBtnText}>Send Another Text Alert</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Success;
