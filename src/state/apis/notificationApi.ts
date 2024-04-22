import {api} from '../api';

export interface Notification {
  payload: {title: string; body: string};
  app: string;
  date: string;
  id: string;
}

const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => '/home-chef/notifications',
    }),
  }),
});

export const {useGetNotificationsQuery} = notificationApi;
