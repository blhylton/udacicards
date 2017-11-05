import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, clearData } from '../util/helpers'

class DeckList extends Component {
    componentDidMount = () => {
        getDecks().then(decks => this.props.dispatch(receiveDecks(decks)))
    }
    render () {
        return (
            <View>
                <Text>{JSON.stringify(this.props.decks)}</Text>
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