import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { saveDeckTitle } from '../util/helpers'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class DeckCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', error: { status: false, text: ''} };
    }
    submit = () => {
        if(this.state.text !== ''){
            saveDeckTitle(this.state.text)
                .then(this.props.dispatch(addDeck(this.state.text)))
                .then(this.setState({text: '', error: { status: false, text: ''}}))
        }else{
            this.setState({error: {status: true, text: 'Title can not be empty'}})
        }
    }

    render() {
        return (
            <View>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    onChangeText={(text) => this.setState({text, error: {status: false, text: ''}})}
                    value={this.state.text}
                    placeholder="Deck Title"
                />
                {this.state.error.status && (
                    <Text>{this.state.error.text}</Text>
                )}
                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(DeckCreate)