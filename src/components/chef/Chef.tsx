import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChefShifts from './ChefShifts';
import EditShift from './EditShift';

export type ChefStackParamsList = {
  ChefShifts: undefined;
  EditShift: {
    hoursId: string;
  };
};

const Stack = createNativeStackNavigator<ChefStackParamsList>();

const Chef = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChefShifts"
        component={ChefShifts}
        options={{title: 'Your Home Chef Deliveries'}}
      />
      <Stack.Screen
        name="EditShift"
        component={EditShift}
        options={{title: 'Edit a Home Chef Delivery'}}
      />
    </Stack.Navigator>
  );
};

export default Chef;
