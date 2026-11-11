import { api } from "../api";

import { MealDelivery } from "@community-kitchens/apiinterfaces";

// interface MealDelivery {
//   numberOfMealsMeat: number;
//   numberOfMealsVeg: number;
//   fridge: string;
// }

const mealProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMealDelivery: builder.mutation<null, MealDelivery>({
      query: (body) => ({ url: "/meal-program", method: "POST", body }),
    }),
  }),
});

export const { useCreateMealDeliveryMutation } = mealProgramApi;
