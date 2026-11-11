import { View, Text, Image, Platform, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image as CompressImage } from "react-native-compressor";

import Loading from "../reusable/Loading";
import Btn from "../reusable/Btn";
import styles from "./styles";
import photoStyles from "../reusable/styles";
import {
  useCheckStoredQuery,
  useSendTextMutation,
  useStoreTextMutation,
} from "../../state/apis/textApi";
import { useGetUserQuery } from "../../state/apis/authApi";
import { TextStackParamsList } from "./TextNavigator";
import { useCreateMealDeliveryMutation } from "../../state/apis/mealProgramApi";
import Controls from "./Controls";
import { SendTextArgs, StoredText } from "@community-kitchens/apiinterfaces";
import { PhotoFile } from "../reusable/AddPhoto";

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "Confirm">;

const Confirm = ({ route, navigation }: ScreenProps) => {
  const { data: user } = useGetUserQuery();
  const { data: storedText } = useCheckStoredQuery();
  const [storeText] = useStoreTextMutation();
  const [createMealDelivery, { isLoading: logIsLoading }] =
    useCreateMealDeliveryMutation();
  const [sendText, { isLoading }] = useSendTextMutation();

  const { type, mealCount, fridge, mealName, provider, photo } = route.params;

  const prevPage = () =>
    navigation.navigate("SetPhoto", {
      type,
      mealCount,
      fridge,
      mealName,
      provider,
    });

  const getAddress = () => {
    if (fridge.location) {
      return `, at ${fridge.location},`;
    } else {
      return "";
    }
  };

  const message = `Hello! ${
    fridge.name
  } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by ${provider}! Please take only what you need, and leave the rest to share. The meal today is ${mealName}. Please respond to this message with any feedback. Enjoy!`;

  const onSubmit = async () => {
    let photoToSend: PhotoFile | undefined = undefined;
    if (photo?.uri) {
      const compressedUri = await CompressImage.compress(photo.uri, {
        output: "jpg",
        maxHeight: 750,
        maxWidth: 750,
      });
      photoToSend = { ...photo, uri: compressedUri };

      if (Platform.OS === "ios") {
        photoToSend.uri = photoToSend.uri?.replace("file://", "");
      }
    }

    let newStoredText: StoredText | undefined = undefined;

    if (storedText) {
      newStoredText = {
        ...storedText,
        restaurants: provider,
        mealName,
      };
    }

    if (!fridge.region) {
      throw Error("No region specified");
    }

    if (!user) {
      throw Error("User not found");
    }

    const body = {
      message,
      region: fridge.region,
      photo: photoToSend,
      restaurants: provider,
      user: user,
      storedText: newStoredText,
      mealName,
    };

    const response = await sendText(body).unwrap();

    if (type === "delivery driver") {
      await storeText(response).unwrap();
      await createMealDelivery({
        numberOfMealsMeat: parseInt(mealCount, 10),
        numberOfMealsVeg: 0,
        fridge: fridge.id,
      }).unwrap();
    }
    navigation.push("Success", response);
  };

  const renderBtns = () => {
    return (
      <View style={styles.textPreviewBtns}>
        <Btn style={styles.sendBtn} onPress={onSubmit}>
          <Text style={styles.sendBtnText}>Send Message</Text>
        </Btn>

        <Btn
          style={[styles.sendBtn, styles.cancel]}
          onPress={() => navigation.push("Start", { type })}
        >
          <Text style={styles.sendBtnText}>Start Over</Text>
        </Btn>
      </View>
    );
  };

  const renderPhoto = () => {
    const uri = photo ? photo.uri : storedText?.photoUrl;
    if (uri) {
      return (
        <View style={photoStyles.photoPreview}>
          <Image
            style={photoStyles.photoPreviewPhoto}
            source={{ uri }}
            alt="preview"
          />
        </View>
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={styles.sendText}
    >
      {logIsLoading || isLoading ? (
        <View style={[styles.sendTextVariablesItem, styles.sendText]}>
          <Loading />
        </View>
      ) : (
        <View style={styles.sendTextVariablesItem}>
          <Text style={styles.textPreviewTitle}>Confirm Your Message:</Text>
          <Text style={styles.textPreviewText}>{message}</Text>
          {renderPhoto()}
          <Text style={styles.textPreviewRegion}>Region: {fridge.region}</Text>
          {renderBtns()}
          <Controls prev={prevPage} />
        </View>
      )}
    </ScrollView>
  );
};

export default Confirm;
