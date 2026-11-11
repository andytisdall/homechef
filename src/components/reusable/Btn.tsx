import { View, StyleSheet, Pressable } from "react-native";
import { ReactNode } from "react";

interface BtnProps {
  style?: Record<string, any> | Record<string, any>[];
  children: ReactNode;
  onPress: () => void;
  onError?: () => void;
  disabled?: boolean;
  disableHighlight?: boolean;
}

const Btn = ({ style, children, onPress, disabled, onError }: BtnProps) => {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          onPress();
        }
        if (disabled && onError) {
          onError();
        }
      }}
    >
      {({ pressed }) => {
        const btnStyle = [styles.btn, style];
        const filterStyle: any[] = [styles.filter];
        if (pressed && !disabled) {
          filterStyle.push({
            backgroundColor: "rgb(255, 255, 255)",
          });
        }
        if (disabled) {
          filterStyle.push({
            backgroundColor: "rgb(130,130,130)",
          });
        }
        return <View style={[btnStyle, filterStyle]}>{children}</View>;
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
  },
  filter: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default Btn;
