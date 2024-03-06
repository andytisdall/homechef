import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../api';

interface SignInArgs {
  username: string;
  password: string;
}

interface GoogleSignInArgs {
  email: string | null;
  familyName?: string | null;
  givenName: string | null;
  googleId: string | null;
}

export type User = {
  id: string;
  username: string;
  admin: boolean;
  // active: boolean;
  // salesforceId: string;
  busDriver?: boolean;
  // googleId: string;
  // appleId?: string;
  homeChefNotificationToken?: string;
};

type UserInfo = {
  firstName?: string;
  lastName: string;
  homeChefStatus: string;
};

interface SignInResponse {
  user: User;
  token: string;
}

interface AppleSignInArgs {
  email: string | null;
  familyName?: string | null;
  givenName?: string | null;
  id: string;
  authorizationCode: string | null;
}

const setToken = async (response: SignInResponse) => {
  await AsyncStorage.setItem('ck-token', response.token);
  return response.user;
};

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<User, SignInArgs>({
      query: body => ({
        url: '/signin',
        body,
        method: 'POST',
      }),
      transformResponse: setToken,
      invalidatesTags: ['User'],
    }),
    getUserInfo: builder.query<UserInfo, void>({
      query: () => '/user/userInfo',
    }),
    googleSignIn: builder.mutation<User, GoogleSignInArgs>({
      query: body => ({url: '/google-signin/mobile', method: 'POST', body}),
      transformResponse: setToken,
      invalidatesTags: ['User'],
    }),
    appleSignIn: builder.mutation<User, AppleSignInArgs>({
      query: body => ({url: '/apple-signin', body, method: 'POST'}),
      transformResponse: setToken,
      invalidatesTags: ['User'],
    }),
    getUser: builder.query<User, void>({
      query: () => '/user',
      transformErrorResponse: async err => {
        await AsyncStorage.removeItem('ck-token');
        return {data: err};
      },
      providesTags: ['User'],
    }),
    registerDeviceToken: builder.mutation<null, string>({
      query: token => ({
        url: '/user/save-token',
        body: {token},
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    signOut: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem('ck-token');
        api.util.resetApiState();
        return {data: null};
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSignOutMutation,
  useSignInMutation,
  useRegisterDeviceTokenMutation,
  useGetUserQuery,
  useGetUserInfoQuery,
  useAppleSignInMutation,
  useGoogleSignInMutation,
} = authApi;
