import { Pressable } from "react-native";

import WhiteArrow from "../../assets/white-arrow.svg";
import BlackArrow from "../../assets/right-arrow.svg";

interface BtnProps {
  style?: Record<string, any> | Record<string, any>[];
  onPress: () => void;
  onError?: () => void;
  disabled?: boolean;
}

const ArrowBtn = ({ style, onPress, disabled, onError }: BtnProps) => {
  const filterStyle = { opacity: 1 };

  if (disabled) {
    filterStyle["opacity"] = 0.5;
  }

  let listStyle;
  if (!Array.isArray(style)) {
    listStyle = [style];
  } else {
    listStyle = style;
  }

  return (
    <Pressable
      onPressIn={() => {
        if (!disabled) {
          onPress();
        }
        if (disabled && onError) {
          onError();
        }
      }}
    >
      <WhiteArrow style={[...listStyle, filterStyle]} width={75} height={75} />
    </Pressable>
  );
};

export default ArrowBtn;
