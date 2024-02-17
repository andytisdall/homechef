import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BlankHeaderLeft from '../reusable/BlankHeaderLeft';
import ShiftSignup from './ShiftSignup';
import VolunteerJob from './VolunteerJob';
import DateDetail from './DateDetail';
import ShiftDetail from './ShiftDetail';
import Confirmation from './Confirmation';

export type SignupStackParamsList = {
  Fridge: {jobId: string};
  ShiftSignup: undefined;
  DateDetail: {shiftIds: string[]; date: string};
  ShiftDetail: {shiftId: string};
  SignupConfirm: {hoursId: string};
};

const Stack = createNativeStackNavigator<SignupStackParamsList>();

const signupScreenOptions = {title: 'Town Fridge Sign Up'};

const Signup = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShiftSignup"
        component={ShiftSignup}
        options={signupScreenOptions}
      />
      <Stack.Screen
        name="Fridge"
        component={VolunteerJob}
        options={signupScreenOptions}
      />
      <Stack.Screen
        name="DateDetail"
        component={DateDetail}
        options={signupScreenOptions}
      />
      <Stack.Screen
        name="ShiftDetail"
        component={ShiftDetail}
        options={signupScreenOptions}
      />
      <Stack.Screen
        name="SignupConfirm"
        component={Confirmation}
        options={{
          headerLeft: BlankHeaderLeft,
          ...signupScreenOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default Signup;
