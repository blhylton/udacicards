import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import QuizQuestion from './QuizQuestion'

export default class DeckQuiz extends Component {
    constructor(props){
        super(props)
        this.state = { score: 0, idx: 0 }
    }
    render() {
        const { questions } = this.props
        const { idx, score } = this.state
        return (
            <View>
                {idx < questions.length ? (    
                    <View>
                        <Text>{idx + 1}/{questions.length}</Text>
                        <QuizQuestion question={questions[idx]} />
                        <TouchableOpacity onPress={() => this.setState({idx: idx + 1, score: score + 1})}>
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({idx: idx + 1})}>
                            <Text>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text>{score/questions.length * 100 }% Correct</Text>
                        <TouchableOpacity onPress={() => this.setState({idx: 0, score: 0})}>
                            <Text>Try Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>Back to List</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}