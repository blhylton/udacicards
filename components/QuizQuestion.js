import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class QuizQuestion extends Component {
    constructor(props){
        super(props)
        this.state = { showAnswer: false }
    }

    render() {
        const {question} = this.props
        return this.state.showAnswer ? 
                (
                    <View>
                        <Text>{question.answer}</Text>
                        <TouchableOpacity onPress={() => this.setState({showAnswer: false})}>
                            <Text>Show Question</Text>
                        </TouchableOpacity>
                    </View>
                ) : 
                (
                    <View>
                        <Text>{question.question}</Text>
                        <TouchableOpacity onPress ={() => this.setState({showAnswer: true})}>
                            <Text>Show Answer</Text>
                        </TouchableOpacity>
                    </View>
                )
    }
}