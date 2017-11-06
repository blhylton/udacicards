import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DeckCard = (props) => {
    const { deck } = props
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.count}>{deck.questions ? deck.questions.length : 0 } Cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    title: {
        fontSize: 24,
        color: '#333333'
    },
    count: {
        fontSize: 14,
        color: '#999999'
    }
})

export default DeckCard