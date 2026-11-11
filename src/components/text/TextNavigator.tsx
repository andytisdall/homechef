import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { format } from "date-fns";

import Disabled from "./Disabled";
import { Region, Job } from "@community-kitchens/apiinterfaces";
import { PhotoFile } from "../reusable/AddPhoto";
import SetMealName from "./SetMealName";
import SetMealCount from "./SetMealCount";
import SetFridge from "./SetFridge";
import SetPhoto from "./SetPhoto";
import Confirm from "./Confirm";
import Success from "./Success";
import Start from "./Start";
import StackHeader from "../reusable/StackHeader";

export type UserType = "home chef" | "delivery driver";

interface NewText {
  type: UserType;
  mealCount: string;
  fridge: Job;
  mealName: string;
  provider: string;
  photo?: PhotoFile;
}

export type TextStackParamsList = {
  Start: { type?: UserType };
  SetMealName: Pick<NewText, "type" | "provider">;
  SetMealCount: Pick<NewText, "type" | "provider" | "mealName">;
  SetFridge: Pick<NewText, "type" | "provider" | "mealCount" | "mealName">;
  SetPhoto: Pick<
    NewText,
    "type" | "provider" | "mealCount" | "fridge" | "mealName"
  >;
  Confirm: NewText;
  Success: {
    message?: string;
    photoUrl?: string | undefined;
    region: Region | "ALL";
  };
  Disabled: undefined;
};

const Stack = createNativeStackNavigator<TextStackParamsList>();

const outsideAllowableHours =
  parseInt(format(new Date(), "H"), 10) > 19 ||
  parseInt(format(new Date(), "H"), 10) < 8;

const TextNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ title: "Send a Town Fridge Alert", header: StackHeader }}
    >
      {outsideAllowableHours && (
        <Stack.Screen name="Disabled" component={Disabled} />
      )}
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="SetMealName" component={SetMealName} />
      <Stack.Screen name="SetMealCount" component={SetMealCount} />
      <Stack.Screen name="SetFridge" component={SetFridge} />
      <Stack.Screen name="SetPhoto" component={SetPhoto} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default TextNavigator;
