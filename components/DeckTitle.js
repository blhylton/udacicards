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
            <View style={styles.container}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.count}>{deck.questions.length} Card(s)</Text>
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={[styles.addBtn, styles.btn]}>
                        <Text style={styles.addBtnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.startBtn, styles.btn]}>
                        <Text style={styles.startBtnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        color: '#333'
    },
    count: {
        fontSize: 24,
        color: '#999999'
    },
    btnWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    addBtn: {
        backgroundColor: '#ffffff',
    },
    startBtn: {
        backgroundColor: '#333',
    },
    btn: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
        margin: 10
    },
    addBtnText: {
        color: '#333'
    },
    startBtnText: {
        color: '#fff'
    }
})