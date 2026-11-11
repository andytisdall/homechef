import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api";
import {
  SignInArgs,
  SignInResponse,
  User,
  ContactInfo,
  AppleSignInArgs,
  GoogleSignInArgs,
} from "@community-kitchens/apiinterfaces";

// interface SignInArgs {
//   username: string;
//   password: string;
// }

// export type User = {
//   id: string;
//   username: string;
//   admin: boolean;
//   // active: boolean;
//   // salesforceId: string;
//   busDriver?: boolean;
//   // googleId: string;
//   // appleId?: string;
//   homeChefNotificationToken?: string;
// };

// type UserInfo = {
//   firstName?: string;
//   lastName: string;
//   homeChefStatus: string;
// };

// interface SignInResponse {
//   user: User;
//   token: string;
// }

export const userToken: { token?: string } = {};

const setToken = async (response: SignInResponse) => {
  try {
    await AsyncStorage.setItem("ck-token", response.token);
  } catch (err) {
    userToken.token = response.token;
    console.log("could not set token to local storage!");
    console.log(err);
  }
  return response.user;
};

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<User, SignInArgs>({
      query: (body) => ({
        url: "/signin",
        body,
        method: "POST",
      }),
      transformResponse: setToken,
      invalidatesTags: ["User", "UserInfo"],
    }),
    getUserInfo: builder.query<ContactInfo, void>({
      query: () => "/user/userInfo",
      providesTags: ["UserInfo"],
    }),
    googleSignIn: builder.mutation<User, GoogleSignInArgs>({
      query: (body) => ({ url: "/google-signin/mobile", method: "POST", body }),
      transformResponse: setToken,
      invalidatesTags: ["User", "UserInfo"],
    }),
    appleSignIn: builder.mutation<User, AppleSignInArgs>({
      query: (body) => ({ url: "/apple-signin", body, method: "POST" }),
      transformResponse: setToken,
      invalidatesTags: ["User", "UserInfo"],
    }),
    getUser: builder.query<User, void>({
      query: () => "/user",
      transformErrorResponse: async (err) => {
        await AsyncStorage.removeItem("ck-token");
        return { data: err };
      },
      providesTags: ["User"],
    }),
    registerDeviceToken: builder.mutation<null, string>({
      query: (token) => ({
        url: "/user/save-token",
        body: { token },
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    signOut: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem("ck-token");
        api.util.resetApiState();
        return { data: null };
      },
      invalidatesTags: ["User", "UserInfo"],
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
