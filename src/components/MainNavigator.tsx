import {useGetUserInfoQuery} from '../state/apis/authApi';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './home/Home';
import Chef from './chef/Chef';
import Text from './text/Text';
import CreateTabIcon from './tabs/TabIcon';
import CreateTabLabel from './tabs/TabLabel';
import Signup from './shiftSignup/Signup';

export type RootTabParamsList = {
  Signup: undefined;
  Home: undefined;
  Text: undefined;
  Deliveries: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamsList>();

const MainNavigator = () => {
  const {data: userInfo} = useGetUserInfoQuery();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      detachInactiveScreens={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: CreateTabIcon('home'),
          tabBarLabel: CreateTabLabel('Home'),
        }}
      />
      <Tab.Screen
        name="Text"
        component={Text}
        options={{
          tabBarIcon: CreateTabIcon('text'),
          tabBarLabel: CreateTabLabel('Text'),
        }}
      />
      {userInfo?.homeChefStatus === 'Active' && (
        <>
          <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              tabBarIcon: CreateTabIcon('signup'),
              tabBarLabel: CreateTabLabel('Signup'),
            }}
          />
          <Tab.Screen
            name="Deliveries"
            component={Chef}
            options={{
              tabBarIcon: CreateTabIcon('chef'),
              tabBarLabel: CreateTabLabel('Deliveries'),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;
