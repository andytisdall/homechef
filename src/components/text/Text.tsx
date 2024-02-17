import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SendText from './SendText';
import TextSuccess from './TextSuccess';
import BlankHeaderLeft from '../reusable/BlankHeaderLeft';

export type TextStackParamList = {
  SendText: undefined;
  TextSuccess: undefined;
};

const Stack = createNativeStackNavigator<TextStackParamList>();

const Text = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SendText"
        component={SendText}
        options={{
          headerLeft: BlankHeaderLeft,
          title: 'Send a Town Fridge Delivery Alert',
        }}
      />
      <Stack.Screen
        name="TextSuccess"
        component={TextSuccess}
        options={{
          headerLeft: BlankHeaderLeft,
          title: 'You sent a Town Fridge Delivery Alert',
        }}
      />
    </Stack.Navigator>
  );
};

export default Text;
