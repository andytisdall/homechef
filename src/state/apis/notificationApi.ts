import { api } from "../api";
import { Notification } from "@community-kitchens/apiinterfaces";

// export interface Notification {
//   payload: { title: string; body: string };
//   app: string;
//   date: string;
//   id: string;
// }

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => "/home-chef/notifications/14",
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
