import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const goToAccountCreation = () => {
    navigation.navigate('AccountCreation');
  };

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button title="Create Account" onPress={goToAccountCreation} />
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

export default Login;
