import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {userToken} from './apis/authApi';

let url =
  process.env.NODE_ENV === 'production'
    ? 'https://portal.ckoakland.org/api'
    : 'http://192.168.0.111:3001/api';

const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const token = await AsyncStorage.getItem('ck-token');
  const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: headers => {
      if (token) {
        headers.set('authorization', token);
      } else if (userToken.token) {
        headers.set('authorization', userToken.token);
      }

      return headers;
    },
  });
  return baseQuery(args, baseQueryApi, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithToken,
  endpoints: () => ({}),
  tagTypes: ['User', 'Shift', 'Hour', 'StoredText', 'UserInfo'],
});
