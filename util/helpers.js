import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UDACICARD_DECK_STORAGE'

export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(r => JSON.parse(r))
}

export function getDeck(title){
    return getDecks().then(data => data[title])
}

export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, card){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => {
            const data = JSON.parse(results)
            data[title] = {
                title,
                questions: [
                    ...data[title].questions,
                    card
                ]
            }
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}