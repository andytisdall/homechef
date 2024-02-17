import {View, StyleSheet, Pressable} from 'react-native';
import React, {ReactNode} from 'react';

interface BtnProps {
  style?: Record<string, any> | Record<string, any>[];
  children: ReactNode;
  onPress: () => void;
  onError?: () => void;
  disabled?: boolean;
}

const Btn = ({style, children, onPress, disabled, onError}: BtnProps) => {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          onPress();
        }
        if (disabled && onError) {
          onError();
        }
      }}>
      {({pressed}) => {
        const btnStyle = [styles.btn, style];
        let filterStyle: any[] = [styles.filter];
        if (pressed && !disabled) {
          filterStyle.push({backgroundColor: 'rgba(250,250,250,.4)'});
        }
        if (disabled) {
          filterStyle.push({backgroundColor: 'rgb(130,130,130)'});
        }
        return (
          <View style={btnStyle}>
            <View style={filterStyle}>{children}</View>
          </View>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 50,
  },
  filter: {
    borderRadius: 500,
    paddingVertical: 10,
    paddingHorizontal: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Btn;
