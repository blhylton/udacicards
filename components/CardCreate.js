import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../util/helpers'
import { addCard } from '../actions'

class CardCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { question: {text: '', error: { status: false, text: ''}}, answer: {text: '', error: {state: false, text: ''}} };
    }

    submit = () => {
        if(this.state.question.text !== '' && this.state.answer.text !== ''){
            const payload =
                {
                    question: this.state.question.text,
                    answer: this.state.answer.text
                }
            addCardToDeck( this.props.deck, payload)
                .then(this.props.dispatch(addCard(this.props.deck, payload)))
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
            <View>
                <TextInput
                    onChangeText={(text) => this.setState({question: {text, error: {status: false, text: ''}}})}
                    value={this.state.question.text}
                    placeholder="Question"
                />
                {this.state.question.error.status && (
                    <Text>{this.state.question.error.text}</Text>
                )}
                <TextInput
                    onChangeText={(text) => this.setState({answer: {text, error: {status: false, text: ''}}})}
                    value={this.state.answer.text}
                    placeholder="Answer"
                />
                {this.state.answer.error.status && (
                    <Text>{this.state.answer.error.text}</Text>
                )}
                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(CardCreate)