import AsyncStorage from '@react-native-async-storage/async-storage';
import {addDays} from 'date-fns';

import {api} from '../api';
import {User} from './authApi';

type Region = 'EAST_OAKLAND' | 'WEST_OAKLAND';

export interface Fridge {
  name: string;
  address: string;
  region: Region;
}

interface SendTextArgs {
  message: string;
  region: Region;
  photo?: PhotoFile | null;
  name: string;
  restaurants: string;
  user: User;
  storedText?: StoredText;
}

interface StoredText {
  photoUrl?: string;
  sentTo: Region[];
  name: string;
  restaurants: string;
  date: string;
}

interface SendTextResponse {
  message: string;
  region: Region;
  photoUrl?: string;
}

export interface PhotoFile {
  name?: string;
  type?: string;
  uri?: string;
}

const storeText = async (text: StoredText) => {
  await AsyncStorage.setItem('ck-text', JSON.stringify(text));
};

const getStoredText = async () => {
  const storedTextString = await AsyncStorage.getItem('ck-text');
  if (storedTextString) {
    const storedText = JSON.parse(storedTextString) as StoredText;
    if (addDays(new Date(storedText.date), 1) > new Date()) {
      return storedText;
    } else {
      await AsyncStorage.removeItem('ck-text');
    }
  }
};

const textApi = api.injectEndpoints({
  endpoints: builder => ({
    deletedStored: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem('ck-text');
        return {data: null};
      },
    }),
    checkStored: builder.query<StoredText | undefined, void>({
      queryFn: async () => {
        const data = await getStoredText();
        return {data};
      },
    }),
    getFridges: builder.query<Fridge[], void>({
      query: () => 'home-chef/campaign/fridges',
    }),
    sendText: builder.mutation<SendTextResponse, SendTextArgs>({
      query: body => {
        let photoAlreadySentToThisRegion = false;
        if (body.user.busDriver && body.storedText) {
          photoAlreadySentToThisRegion = body.storedText.sentTo.includes(
            body.region,
          );
        }

        const postBody = new FormData();
        postBody.append('message', body.message);
        postBody.append('region', body.region);
        if (body.photo) {
          postBody.append('photo', body.photo);
        }
        if (body.storedText?.photoUrl && !photoAlreadySentToThisRegion) {
          postBody.append('photo', body.storedText.photoUrl);
        }

        if (body.user.busDriver) {
          if (body.storedText) {
            if (!photoAlreadySentToThisRegion) {
              const modifiedStoredText = {
                ...body.storedText,
                sentTo: [...body.storedText.sentTo, body.region],
              };
              storeText(modifiedStoredText);
            }
          } else {
            const newStoredText = {
              sentTo: [body.region],
              name: body.name,
              restaurants: body.restaurants,
              date: new Date().toString(),
            };
            storeText(newStoredText);
          }
        }

        return {
          formData: true,
          url: '/text/outgoing',
          body: postBody,
          method: 'POST',
        };
      },
      transformResponse: async (response: SendTextResponse) => {
        const storedText = await getStoredText();
        if (storedText) {
          const modifiedStoredText = {
            ...storedText,
            photoUrl: response.photoUrl,
          };
          await storeText(modifiedStoredText);
        }
        return response;
      },
    }),
  }),
});

export const {
  useSendTextMutation,
  useGetFridgesQuery,
  useCheckStoredQuery,
  useDeletedStoredMutation,
} = textApi;
