import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function decks(state = {}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case ADD_CARD:
            const questions = state[action.title].questions
            questions.push(action.card)
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions
                }
            }
        default:
            return state
    }
}