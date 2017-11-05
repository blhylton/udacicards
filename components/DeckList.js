import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, clearData } from '../util/helpers'
import DeckCard from './DeckCard'

class DeckList extends Component {
    componentDidMount = () => {
        getDecks().then(decks => this.props.dispatch(receiveDecks(decks)))
    }
    render () {
        return (
            <View>
                {this.props.decks && Object.keys(this.props.decks).map(deck => (<DeckCard key={this.props.decks[deck].title} deck={this.props.decks[deck]}/>))}
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        decks: state
    }
}

export default connect(mapStateToProps)(DeckList)