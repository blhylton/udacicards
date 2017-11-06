import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../util/helpers'
import { addCard } from '../actions'

class CardCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: this.props.navigation.state.params.deck.title,
            question: {
                text: '', error: {
                    status: false, text: ''
                }
            }, answer: {
                text: '', error: {
                    state: false, text: ''
                }
            }
        };
    }

    static navigationOptions = ({navigation}) => {
        const {deck} = navigation.state.params
        return {title: `New Card in ${deck.title}`}
    }

    submit = () => {
        if(this.state.question.text !== '' && this.state.answer.text !== ''){
            const payload =
                {
                    question: this.state.question.text,
                    answer: this.state.answer.text
                }
            addCardToDeck( this.state.deck, payload)
                .then(this.props.dispatch(addCard(this.state.deck, payload)))
                .then(this.setState(
                    {
                        question: { text: '', error: {status: false, text: ''}},
                        answer: { text: '', error: {state: false, text: ''}}
                    }
                ))
        }else{
            let question = {
                text: this.state.question.text,
                error: {
                    status: false,
                    text: ''
                }
            }

            let answer = {
                text: this.state.answer.text,
                error: {
                    status: false,
                    text: ''
                }
            }
            if(this.state.question.text === ''){
                question.error.status = true
                quesiton.error.text = 'Question can not be empty'
            }

            if(this.state.answer.text === ''){
                answer.error.status = true
                answer.error.text = 'Answer can not be empty'
            }

            this.setState({
                question,
                answer
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => this.setState({question: {text, error: {status: false, text: ''}}})}
                    value={this.state.question.text}
                    placeholder="Question"
                    style={styles.input}
                />
                {this.state.question.error.status && (
                    <Text>{this.state.question.error.text}</Text>
                )}
                <TextInput
                    onChangeText={(text) => this.setState({answer: {text, error: {status: false, text: ''}}})}
                    value={this.state.answer.text}
                    placeholder="Answer"
                    style={styles.input}
                />
                {this.state.answer.error.status && (
                    <Text>{this.state.answer.error.text}</Text>
                )}
                <TouchableOpacity onPress={this.submit} style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'stretch',
        margin: 15
    },
    submitBtn: {
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40
    },
    submitBtnText: {
        color: '#fff'
    }
})

export default connect()(CardCreate)