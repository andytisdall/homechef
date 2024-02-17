import {View, Text, Image} from 'react-native';
import React from 'react';

import styles from './styles';

const Title = ({headerText}: {headerText?: string}) => {
  return (
    <View style={styles.appTitleContainer}>
      {/* <Text style={styles.appTitle}>Community Kitchens</Text> */}
      <View style={styles.appTitleImageContainer}>
        <Image
          style={styles.appTitleImage}
          source={require('../../assets/ck-header.png')}
        />
      </View>
      <Text style={styles.appSubTitle}>{headerText}</Text>
    </View>
  );
};

export default Title;
