import {View, Text, Image} from 'react-native';

import styles from './styles';

const Title = ({headerText}: {headerText?: string}) => {
  return (
    <View style={styles.appTitleContainer}>
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
