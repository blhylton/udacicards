import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import QuizQuestion from './QuizQuestion'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { clearLocalNotifications, setLocalNotification } from '../util/helpers'

export default class DeckQuiz extends Component {
    constructor(props){
        super(props)
        this.state = { score: 0, idx: 0, showAnswer: false }
    }
    flipCard = () => {
        this.setState({
            showAnswer: !this.state.showAnswer
        })
    }
    render() {
        const { questions } = this.props.navigation.state.params
        const { idx, score, showAnswer } = this.state

        if(idx >= questions.length){
            clearLocalNotifications()
                .then(setLocalNotification)
        }
        return (
            <View style={styles.container}>
                {idx < questions.length ? (    
                    <View style={{flex: 1, alignSelf: 'stretch'}}>
                        <Text style={styles.counter}>{idx + 1}/{questions.length}</Text>
                        <QuizQuestion question={questions[idx]} showAnswer={showAnswer} flipCard={this.flipCard} style={{flex: 4}} />
                        <View style={{flex: 2}}>
                            <TouchableOpacity onPress={() => this.setState({idx: idx + 1, score: score + 1})} style={[styles.btn, styles.correctBtn]}>
                                <Text style={styles.btnText}>
                                    {
                                        Platform.OS === 'iOS'
                                        ? (<Ionicons name="ios-checkmark-circle-outline" style={styles.btnIcon} />) 
                                        : (<Ionicons name="md-checkmark-circle-outline" style={styles.btnIcon} />)
                                    } Correct
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({idx: idx + 1})} style={[styles.btn, styles.incorrectBtn]}>
                                <Text style={styles.btnText}>
                                    {
                                        Platform.OS === 'iOS'
                                        ? (<Ionicons name="ios-close-circle-outline" style={styles.btnIcon} />) 
                                        : (<MaterialCommunityIcons name="close-circle-outline" style={styles.btnIcon} />)
                                    } Incorrect
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{flex: 1}}>
                        <View style={styles.result}>
                            <Text style={styles.resultText}>{score/questions.length * 100 }% Correct</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={() => this.setState({idx: 0, score: 0})} style={[styles.btn, styles.genericBtn]}>
                                <Text style={styles.btnText}>
                                    {
                                        Platform.OS === 'iOS'
                                        ? (<Ionicons name="ios-refresh" style={styles.btnIcon} />) 
                                        : (<Ionicons name="md-refresh" style={styles.btnIcon} />)
                                    } Try Again
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.btn, styles.genericBtn]}
                                onPress={() => this.props.navigation.navigate(
                                    'Home'
                                )}
                            >
                                <Text style={styles.btnText}>
                                    {
                                        Platform.OS === 'iOS'
                                        ? (<Ionicons name="ios-arrow-back" style={styles.btnIcon} />) 
                                        : (<Ionicons name="md-arrow-back" style={styles.btnIcon} />)
                                    } Back to List
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 20
    },
    counter: {
        fontSize: 20,
        color: '#999999',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    result: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultText: {
        fontSize: 28
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 15,
        paddingLeft: 45,
        paddingRight: 45,
        alignSelf: 'stretch'
    },
    correctBtn:{
        backgroundColor: 'green'
    },
    incorrectBtn: {
        backgroundColor: 'red'
    },
    genericBtn: {
        backgroundColor: 'gray'
    },
    btnText: {
        color: 'white',
        fontSize: 18
    },
    btnIcon: {
        fontSize: 22,
        marginRight: 5
    }
})