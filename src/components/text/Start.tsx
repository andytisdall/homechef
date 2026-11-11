import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TextStackParamsList } from "./TextNavigator";
import { useGetUserInfoQuery, useGetUserQuery } from "../../state/apis/authApi";
import { useCheckStoredQuery } from "../../state/apis/textApi";
import UseStoredText from "./UseStoredText";
import SetType from "./SetType";
import { useState } from "react";
import SetProvider from "./SetProvider";
import { UserType } from "./TextNavigator";
import Loading from "../reusable/Loading";

type ScreenProps = NativeStackScreenProps<TextStackParamsList, "Start">;

const Start = ({ navigation, route }: ScreenProps) => {
  const [typeOfDelivery, setTypeOfDelivery] = useState<
    "home chef" | "delivery driver" | undefined
  >(route.params?.type);

  const { data: user, isLoading: userLoading } = useGetUserQuery();
  const { data: userInfo, isLoading: userInfoLoading } = useGetUserInfoQuery();
  const { data: storedText, isLoading: storedTextLoading } =
    useCheckStoredQuery();

  const userIsBusDriver = user?.busDriver;
  const userIsHomeChef = userInfo?.homeChefStatus === "Active";
  const userIsBoth = userIsBusDriver && userIsHomeChef;

  const isLoading = userLoading || userInfoLoading || storedTextLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (userIsBusDriver) {
    if (storedText) {
      const nextPage = () =>
        navigation.push("SetMealCount", {
          type: "delivery driver",
          provider: storedText.restaurants,
          mealName: storedText.mealName,
        });

      return <UseStoredText next={nextPage} />;
    }
  }

  if (userIsBoth && !typeOfDelivery) {
    return <SetType setType={setTypeOfDelivery} />;
  }

  return (
    <SetProvider
      type={
        userIsBoth
          ? typeOfDelivery!
          : userIsBusDriver
          ? "delivery driver"
          : "home chef"
      }
      next={({ type, provider }: { type: UserType; provider: string }) => {
        navigation.navigate("SetMealName", { type, provider });
      }}
      prev={userIsBoth ? () => setTypeOfDelivery(undefined) : undefined}
    />
  );
};

export default Start;
