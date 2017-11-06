import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, clearData } from '../util/helpers'
import DeckCard from './DeckCard'

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
            <View style={styles.container}>
                {this.props.decks && Object.keys(this.props.decks).map(deck => (
                    <TouchableOpacity style={styles.row} key={this.props.decks[deck].title + '_row'} onPress={() => this.navigate(deck)}>
                        <DeckCard key={this.props.decks[deck].title} deck={this.props.decks[deck]}  />
                    </TouchableOpacity>
                ))}
            </View>
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
    row: {
        height: 100,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 5
    }
})

export default connect(mapStateToProps)(DeckList)