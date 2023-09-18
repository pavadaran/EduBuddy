import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Homepage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Welcome to the Homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Homepage;
