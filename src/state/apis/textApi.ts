import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays } from "date-fns";

import { api } from "../api";
import {
  StoredText,
  SendTextResponse,
  Region,
  LowercaseRegion,
  User,
  SendTextArgs,
} from "@community-kitchens/apiinterfaces";
import { PhotoFile } from "../../components/reusable/AddPhoto";

export interface HomeChefAppTextArgs {
  message: string;
  region: Region | LowercaseRegion | "all";
  user: User;
  restaurants: string;
  mealName: string;
  photo?: PhotoFile;
  storedText?: StoredText;
}

const storeText = async (text: StoredText) => {
  await AsyncStorage.setItem("ck-text", JSON.stringify(text));
  // console.log(text);
};

const getStoredText = async () => {
  const storedTextString = await AsyncStorage.getItem("ck-text");
  if (storedTextString) {
    const storedText = JSON.parse(storedTextString) as StoredText;

    const expiration = addDays(new Date(storedText.date), 1);
    const today = new Date();

    if (expiration > today) {
      return storedText;
    } else {
      await AsyncStorage.removeItem("ck-text");
    }
  }
};

const textApi = api.injectEndpoints({
  endpoints: (builder) => ({
    storeText: builder.mutation<null, SendTextResponse>({
      queryFn: async (response) => {
        try {
          if (response.storedText) {
            const stored = response.storedText as unknown as string;
            const storedText = JSON.parse(stored);
            const modifiedStoredText = {
              ...storedText,
              photoUrl: response.photoUrl,
            };
            await storeText(modifiedStoredText);
          }
          return { data: null };
        } catch (err) {
          console.log(err);
          return {
            error: { error: "Could not store text", status: "CUSTOM_ERROR" },
          };
        }
      },
      invalidatesTags: ["StoredText"],
    }),
    deleteStored: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem("ck-text");
        return { data: null };
      },
      invalidatesTags: ["StoredText"],
    }),
    checkStored: builder.query<StoredText | null, void>({
      queryFn: async () => {
        try {
          const data = await getStoredText();
          if (data) {
            return { data };
          } else {
            return { data: null };
          }
        } catch (err) {
          console.log(err);
          return {
            error: { error: "No Stored Text Found", status: "CUSTOM_ERROR" },
          };
        }
      },
      providesTags: ["StoredText"],
    }),

    sendText: builder.mutation<SendTextResponse, HomeChefAppTextArgs>({
      query: (body) => {
        // validate body
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const example: SendTextArgs = body;

        let photoAlreadySentToThisRegion = false;
        if (body.user?.busDriver && body.storedText) {
          photoAlreadySentToThisRegion = body.storedText.sentTo.includes(
            body.region,
          );
        }

        const postBody = new FormData();
        postBody.append("message", body.message);
        postBody.append("region", body.region);
        if (body.photo) {
          postBody.append("photo", body.photo);
        } else if (body.storedText?.photoUrl && !photoAlreadySentToThisRegion) {
          postBody.append("photo", body.storedText.photoUrl);
        }

        if (body.user?.busDriver) {
          if (body.storedText) {
            if (!photoAlreadySentToThisRegion) {
              const modifiedStoredText: StoredText = {
                ...body.storedText,
                sentTo: [...body.storedText.sentTo, body.region],
              };
              postBody.append("storedText", JSON.stringify(modifiedStoredText));
            }
          } else {
            const newStoredText: StoredText = {
              sentTo: [body.region],
              mealName: body.mealName,
              restaurants: body.restaurants,
              date: new Date().toString(),
            };
            postBody.append("storedText", JSON.stringify(newStoredText));
          }
        }

        return {
          formData: true,
          url: "/text/outgoing",
          body: postBody,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useSendTextMutation,
  // useGetFridgesQuery,
  useCheckStoredQuery,
  useDeleteStoredMutation,
  useStoreTextMutation,
} = textApi;
