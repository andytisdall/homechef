import AsyncStorage from '@react-native-async-storage/async-storage';
import {addDays} from 'date-fns';

import {api} from '../api';
import {User} from './authApi';

export type Region = 'East Oakland' | 'West Oakland';

export interface Fridge {
  id: string;
  name: string;
  location: string;
  active: boolean;
  region: Region;
}

interface SendTextArgs {
  message: string;
  region: Region;
  photo?: PhotoFile | null;
  name: string;
  restaurants: string;
  user: User;
  storedText?: StoredText | null;
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
  storedText?: string;
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

    if (addDays(new Date(storedText.date), 1) < new Date()) {
      return storedText;
    } else {
      await AsyncStorage.removeItem('ck-text');
    }
  }
};

const textApi = api.injectEndpoints({
  endpoints: builder => ({
    storeText: builder.mutation<null, SendTextResponse>({
      queryFn: async response => {
        try {
          if (response.storedText) {
            const storedText = JSON.parse(response?.storedText);
            const modifiedStoredText = {
              ...storedText,
              photoUrl: response.photoUrl,
            };
            await storeText(modifiedStoredText);
          }
          return {data: null};
        } catch (err) {
          return {
            error: {error: 'Could not store text', status: 'CUSTOM_ERROR'},
          };
        }
      },
      invalidatesTags: ['StoredText'],
    }),
    deleteStored: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem('ck-text');
        return {data: null};
      },
      invalidatesTags: ['StoredText'],
    }),
    checkStored: builder.query<StoredText | null, void>({
      queryFn: async () => {
        try {
          const data = await getStoredText();
          if (data) {
            return {data};
          } else {
            return {data: null};
          }
        } catch (err) {
          return {
            error: {error: 'No Stored Text Found', status: 'CUSTOM_ERROR'},
          };
        }
      },
      providesTags: ['StoredText'],
    }),
    getFridges: builder.query<Fridge[], void>({
      query: () => 'home-chef/fridges',
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
              const modifiedStoredText: StoredText = {
                ...body.storedText,
                sentTo: [...body.storedText.sentTo, body.region],
              };
              postBody.append('storedText', JSON.stringify(modifiedStoredText));
            }
          } else {
            const newStoredText: StoredText = {
              sentTo: [body.region],
              name: body.name,
              restaurants: body.restaurants,
              date: new Date().toString(),
            };
            postBody.append('storedText', JSON.stringify(newStoredText));
          }
        }

        return {
          formData: true,
          url: '/text/outgoing/mobile',
          body: postBody,
          method: 'POST',
        };
      },
    }),
  }),
});

export const {
  useSendTextMutation,
  useGetFridgesQuery,
  useCheckStoredQuery,
  useDeleteStoredMutation,
  useStoreTextMutation,
} = textApi;
