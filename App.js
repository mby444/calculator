import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Calculator from './src/components/Calculator';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' hidden={true} />
      <Calculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: "flex-end",
  }
});

export default App;