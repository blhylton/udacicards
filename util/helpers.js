import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const DECK_STORAGE_KEY = 'UDACICARD_DECK_STORAGE'
const DECK_NOTIFICATION_KEY = 'UDACICARD_NOTIFICATION'

export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(r => JSON.parse(r))
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

export function clearLocalNotifications(){
    return AsyncStorage.removeItem(DECK_NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification(){
    return {
        title: 'Don\'t neglect your studies!',
        body: 'You haven\'t reviewed any of your card decks today. Don\'t want to fall off course!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(DECK_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then( data => {
            if(data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted'){
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(DECK_NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    } 
                )
            }
        }
    )
}