import _ from "lodash";

import { api } from "../api";
import {
  VolunteerHours,
  EditHoursArgs,
  CreateVolunteerHoursArgs,
  Job,
  VolunteerShift,
  GetShiftsResponse,
} from "@community-kitchens/apiinterfaces";

// export interface Job {
//   id: string;
//   name: string;
//   location?: string;
//   locationCity?: string;
//   shifts: string[];
//   active: boolean;
//   ongoing: boolean;
//   description?: string;
//   campaign: string;
//   region: LowercaseRegion;
//   notes?: string;
//   noTextAlert?: boolean;
// }

// export interface Shift {
//   id: string;
//   startTime: string;
//   open: boolean;
//   job: string;
//   restaurantMeals: boolean;
//   duration: number;
// }

// export interface Hours {
//   id: string;
//   mealCount: string;
//   time: string;
//   job: string;
//   status: string;
//   shift: string;
//   campaign?: string;
//   mealType?: "Entree" | "Soup";
// }

// interface GetShiftsResponse {
//   jobs: Job[];
//   shifts: Shift[];
// }

// interface CreateHoursArgs {
//   shiftId: string;
//   mealCount: string;
//   jobId: string;
//   date: string;
//   soup: boolean;
// }

// interface EditHoursArgs {
//   id: string;
//   mealCount: string;
//   mealType: "Entree" | "Soup";
//   cancel: boolean;
//   fridge?: string;
//   date?: string;
// }

type HoursState = Record<string, VolunteerHours>;
type ShiftsState = { jobs: Job[]; shifts: Record<string, VolunteerShift> };

const volunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShifts: builder.query<ShiftsState, void>({
      query: () => "/home-chef/job-listing",
      providesTags: ["Shift"],
      transformResponse: (response: GetShiftsResponse) => {
        return {
          jobs: response.jobs,
          shifts: _.mapKeys(response.shifts, "id"),
        };
      },
    }),
    getHours: builder.query<HoursState, void>({
      query: () => "/home-chef/hours",
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, "id"),
      providesTags: ["Hour"],
    }),
    createHours: builder.mutation<
      VolunteerHours,
      Required<Omit<CreateVolunteerHoursArgs, "reserved" | "restaurantMeals">>
    >({
      query: (body) => ({
        body,
        url: "/home-chef/hours",
        method: "POST",
      }),
      invalidatesTags: ["Shift", "Hour"],
    }),
    editHours: builder.mutation<null, EditHoursArgs>({
      query: (body) => ({
        body: {
          mealCount: body.mealCount,
          mealType: body.mealType,
          cancel: body.cancel,
          emailData: { fridge: body.fridge, date: body.date },
        },
        url: "/home-chef/hours/" + body.id,
        method: "PATCH",
      }),
      invalidatesTags: ["Hour"],
    }),
  }),
});

export const {
  useGetShiftsQuery,
  useCreateHoursMutation,
  useEditHoursMutation,
  useGetHoursQuery,
} = volunteerApi;
