import {ActivityIndicator} from 'react-native-paper';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
