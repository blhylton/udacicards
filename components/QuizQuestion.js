import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class QuizQuestion extends Component {

    render() {
        const {question, showAnswer, flipCard } = this.props
        return showAnswer ? 
            (
                <View style={[this.props.style]}>
                    <Text style={styles.question}>{question.answer}</Text>
                    <TouchableOpacity onPress={() => flipCard()} style={styles.flipCard}>
                        <Text style={styles.flipCardText}>Show Question</Text>
                    </TouchableOpacity>
                </View>
            ) : 
            (
                <View style={[styles.container, this.props.style]}>
                    <Text style={styles.question}>{question.question}</Text>
                    <TouchableOpacity onPress ={() => flipCard()} style={styles.flipCard}>
                        <Text style={styles.flipCardText}>Show Answer</Text>
                    </TouchableOpacity>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    question: {
        fontSize: 28,
        margin: 20
    },
    flipCard: {
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center'
    },
    flipCardText: {
        color: 'red'
    }
})