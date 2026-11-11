import { View } from "react-native";
import { useDispatch } from "react-redux";

import styles from "./styles";
import ArrowBtn from "../reusable/ArrowBtn";
import { setError } from "../../state/slices/errorSlice";

const Controls = ({
  next,
  prev,
  fieldValid = true,
}: {
  next?: () => void;
  prev?: () => void;
  fieldValid?: boolean;
}) => {
  const dispatch = useDispatch();
  const nextBtn = (
    <ArrowBtn
      onPress={() => next?.()}
      onError={() => {
        dispatch(setError("You must enter a value to proceed"));
      }}
      disabled={!fieldValid}
    />
  );

  const backBtn = (
    <ArrowBtn style={styles.leftArrow} onPress={() => prev?.()} />
  );

  const firstPageStyle = !prev ? styles.sendTextNavEnd : {};

  return (
    <View style={[styles.sendTextNav, firstPageStyle]}>
      {!!prev && backBtn}
      {!!next && nextBtn}
    </View>
  );
};

export default Controls;
