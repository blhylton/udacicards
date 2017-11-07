import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { saveDeckTitle } from '../util/helpers'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class DeckCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', error: { status: false, text: ''} };
    }
    submit = () => {
        Keyboard.dismiss()
        if(this.state.text !== ''){
            saveDeckTitle(this.state.text)
                .then(this.props.dispatch(addDeck(this.state.text)))
                .then(this.setState({text: '', error: { status: false, text: ''}}))
                .then(this.props.navigation.navigate(
                    'DeckDetail',
                    { deck: this.state.text }
                ))
        }else{
            this.setState({error: {status: true, text: 'Title can not be empty'}})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>What is the title of your new deck?</Text>
                <TextInput
                    onChangeText={(text) => this.setState({text, error: {status: false, text: ''}})}
                    value={this.state.text}
                    placeholder="Deck Title"
                    style={styles.input}
                />
                {this.state.error.status && (
                    <Text>{this.state.error.text}</Text>
                )}
                <TouchableOpacity onPress={this.submit} style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 30,
        margin: 15,
        marginTop: 0,
        marginBottom: 20,
        textAlign: 'center'
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

export default connect()(DeckCreate)