import React from 'react';
import {Text} from 'react-native';

import styles from './styles';

type TabLabelProps = {focused: boolean; color: string};

const CreateTabLabel = (name: string) => {
  const TabLabel = ({focused}: TabLabelProps) => {
    const style: any[] = [styles.tabLabel];
    if (focused) {
      style.push(styles.focusedText);
    }
    return <Text style={style}>{name}</Text>;
  };
  return TabLabel;
};

export default CreateTabLabel;
