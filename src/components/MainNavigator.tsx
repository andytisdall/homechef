import { useGetUserInfoQuery, useGetUserQuery } from "../state/apis/authApi";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";

import Home from "./home/Home";
import Chef from "./chef/Chef";
import Text from "./text/TextNavigator";
import CreateTabIcon from "./tabs/TabIcon";
import CreateTabLabel from "./tabs/TabLabel";
import Signup from "./shiftSignup/Signup";
import { SignupStackParamsList } from "./shiftSignup/Signup";
import { TextStackParamsList } from "./text/TextNavigator";

export type RootTabParamsList = {
  Signup: NavigatorScreenParams<SignupStackParamsList>;
  Home: undefined;
  Text: NavigatorScreenParams<TextStackParamsList>;
  Deliveries: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamsList>();

const MainNavigator = () => {
  const { data: user } = useGetUserQuery();
  const { data: userInfo } = useGetUserInfoQuery();

  const userIsHomeChef = userInfo?.homeChefStatus === "Active";
  const userHasTextPermission = userIsHomeChef || user?.busDriver;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { paddingTop: 5 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: CreateTabIcon("home"),
          tabBarLabel: CreateTabLabel("Home"),
        }}
      />
      {userHasTextPermission && (
        <Tab.Screen
          name="Text"
          component={Text}
          options={{
            tabBarIcon: CreateTabIcon("text"),
            tabBarLabel: CreateTabLabel("Text"),
          }}
        />
      )}
      {userIsHomeChef && (
        <>
          <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              tabBarIcon: CreateTabIcon("signup"),
              tabBarLabel: CreateTabLabel("Signup"),
            }}
          />
          <Tab.Screen
            name="Deliveries"
            component={Chef}
            options={{
              tabBarIcon: CreateTabIcon("chef"),
              tabBarLabel: CreateTabLabel("Deliveries"),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;
