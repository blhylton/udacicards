import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class DeckCard extends Component{
    render () {
        const { deck } = this.props
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text>{deck.questions ? deck.questions.length : 0 } Cards</Text>
            </View>
        )
    }
}