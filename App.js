import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import CardCreate from './components/CardCreate'
import DeckCreate from './components/DeckCreate'
import DeckList from './components/DeckList'
import DeckTitle from './components/DeckTitle'
import DeckQuiz from './components/DeckQuiz'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  DeckCreate: {
    screen: DeckCreate,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-create-outline' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#4e4cb8': 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white': '#4e4cb8',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckTitle,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4e4cb8'
      },
    }
  },
  AddCard: {
    screen: CardCreate,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4e4cb8'
      }
    }
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4e4cb8'
      }
    }
  }
})

function UdaciStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={'#4e4cb8'} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
