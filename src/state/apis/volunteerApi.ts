import _ from 'lodash';

import {api} from '../api';

export interface Job {
  id: string;
  name: string;
  location: string;
  shifts: string[];
  active: boolean;
  ongoing: boolean;
  description: string;
  campaign: string;
}

export interface Shift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  restaurantMeals: boolean;
  duration: number;
}

export interface Hours {
  id: string;
  mealCount: string;
  time: string;
  job: string;
  status: string;
  shift: string;
  campaign?: string;
}

interface GetShiftsResponse {
  jobs: Job[];
  shifts: Shift[];
}

interface CreateHoursArgs {
  shiftId: string;
  mealCount: string;
  jobId: string;
  date: string;
  soup: boolean;
}

interface EditHoursArgs {
  id: string;
  mealCount: string;
  cancel: boolean;
  fridge?: string;
  date?: string;
}

type HoursState = Record<string, Hours>;
type ShiftsState = {jobs: Job[]; shifts: Record<string, Shift>};

const volunteerApi = api.injectEndpoints({
  endpoints: builder => ({
    getShifts: builder.query<ShiftsState, void>({
      query: () => '/home-chef/job-listing',
      providesTags: ['Shift'],
      transformResponse: (response: GetShiftsResponse) => {
        return {jobs: response.jobs, shifts: _.mapKeys(response.shifts, 'id')};
      },
    }),
    getHours: builder.query<HoursState, void>({
      query: () => '/home-chef/hours',
      transformResponse: (response: Hours[]) => _.mapKeys(response, 'id'),
      providesTags: ['Hour'],
    }),
    createHours: builder.mutation<Hours, CreateHoursArgs>({
      query: body => ({
        body,
        url: '/home-chef/hours',
        method: 'POST',
      }),
      invalidatesTags: ['Shift', 'Hour'],
    }),
    editHours: builder.mutation<null, EditHoursArgs>({
      query: body => ({
        body: {
          mealCount: body.mealCount,
          cancel: body.cancel,
          emailData: {fridge: body.fridge, date: body.date},
        },
        url: '/home-chef/hours/' + body.id,
        method: 'PATCH',
      }),
      invalidatesTags: ['Hour'],
    }),
  }),
});

export const {
  useGetShiftsQuery,
  useCreateHoursMutation,
  useEditHoursMutation,
  useGetHoursQuery,
} = volunteerApi;
