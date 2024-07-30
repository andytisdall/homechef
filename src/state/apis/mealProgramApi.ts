import {api} from '../api';

interface MealDelivery {
  numberOfMealsMeat: number;
  numberOfMealsVeg: number;
}

const mealProgramApi = api.injectEndpoints({
  endpoints: builder => ({
    createMealDelivery: builder.mutation<null, MealDelivery>({
      query: body => ({url: '/meal-program', method: 'POST', body}),
    }),
  }),
});

export const {useCreateMealDeliveryMutation} = mealProgramApi;
