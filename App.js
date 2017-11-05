import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import CardCreate from './components/CardCreate'
import DeckCreate from './components/DeckCreate'
import DeckList from './components/DeckList'
import DeckTitle from './components/DeckTitle'
import DeckQuiz from './components/DeckQuiz'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DeckList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
