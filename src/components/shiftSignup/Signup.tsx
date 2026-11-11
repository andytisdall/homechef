import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShiftSignup from "./ShiftSignup";
import VolunteerJob from "./VolunteerJob";
import DateDetail from "./DateDetail";
import ShiftDetail from "./ShiftDetail";
import Confirmation from "./Confirmation";
import StackHeader from "../reusable/StackHeader";

export type SignupStackParamsList = {
  Fridge: { jobId: string };
  ShiftSignup: undefined;
  DateDetail: { shiftIds: string[]; date: string };
  ShiftDetail: { shiftId: string };
  SignupConfirm: { hoursId: string };
};

const Stack = createNativeStackNavigator<SignupStackParamsList>();

const Signup = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Town Fridge Sign Up",
        header: StackHeader,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="ShiftSignup"
        component={ShiftSignup}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen name="Fridge" component={VolunteerJob} />
      <Stack.Screen name="DateDetail" component={DateDetail} />
      <Stack.Screen name="ShiftDetail" component={ShiftDetail} />
      <Stack.Screen
        name="SignupConfirm"
        component={Confirmation}
        options={{
          headerBackVisible: false,
          title: "Home Chef Signup Confirmation",
        }}
      />
    </Stack.Navigator>
  );
};

export default Signup;
