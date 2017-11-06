import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, clearData } from '../util/helpers'
import DeckCard from './DeckCard'
import { Ionicons } from '@expo/vector-icons'

class DeckList extends Component {
    componentDidMount = () => {
        getDecks().then(decks => this.props.dispatch(receiveDecks(decks)))
    }

    navigate = (deck) => {
        this.props.navigation.navigate(
            'DeckDetail',
            { deck }
        )
    }

    render () {
        return (
            !this.props.decks || Object.keys(this.props.decks).length === 0
            ? (
                <View style={styles.container}>
                    <View style={styles.noItems}>
                    {Platform.OS === 'ios'
                        ? (<Ionicons name='ios-sad-outline' size={100} color='black' />)
                        : (<Ionicons name='md-sad' size={100} color='black' />)
                    }
                    <Text>You haven't created any decks yet.</Text>
                    <TouchableOpacity
                        style={[styles.borderedItem, styles.createDeckBtn]}
                        onPress={() => {
                            this.props.navigation.navigate('DeckCreate')
                        }}
                    >
                        <Text>Create One Now</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
            : (
                <View style={styles.container}>
                    {this.props.decks && Object.keys(this.props.decks).map(deck => (
                        <TouchableOpacity style={[styles.row, styles.borderedItem]} key={this.props.decks[deck].title + '_row'} onPress={() => this.navigate(deck)}>
                            <DeckCard key={this.props.decks[deck].title} deck={this.props.decks[deck]}  />
                        </TouchableOpacity>
                    ))}
                </View>
            )
        )
    }
}

function mapStateToProps(state){
    return{
        decks: state
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    noItems: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        height: 100,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    borderedItem: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 5
    },
    createDeckBtn: {
        padding: 10,
        paddingLeft: 45,
        paddingRight: 45,
        margin: 15
    }
})

export default connect(mapStateToProps)(DeckList)