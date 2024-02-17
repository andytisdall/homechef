import {Image, View} from 'react-native';
import React from 'react';

import styles from './styles';

type TabIconProps = {focused: boolean; color: string; size: number};

const tabImages = {
  home: require('../../assets/home-icon.webp'),
  text: require('../../assets/phone-icon.jpg'),
  chef: require('../../assets/update-icon.png'),
  signup: require('../../assets/fridge-icon.png'),
};

const CreateTabIcon = (icon: 'home' | 'text' | 'chef' | 'signup') => {
  const TabIcon = ({size, focused}: TabIconProps) => {
    const style: any[] = [styles.tabIconContainer, {height: size, width: size}];
    if (focused) {
      style.push(styles.focusedIcon);
    }

    return (
      <View style={style}>
        <Image style={styles.tabIcon} source={tabImages[icon]} alt="Text" />
      </View>
    );
  };
  return TabIcon;
};

export default CreateTabIcon;
