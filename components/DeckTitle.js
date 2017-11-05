import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { getDeck } from '../util/helpers'

export default class DeckTitle extends Component {
    constructor(props){
        super(props)
        this.state = {deck: {questions: []}}
    }

    componentDidMount = () => {
        getDeck(this.props.deck).then(deck => this.setState(
            {
                deck
            }
        ))
    }
    render() {
        const {deck} = this.state
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length}</Text>
                <TouchableOpacity>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}