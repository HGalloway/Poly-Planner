import {Alert} from 'react-native'

export function networkErrorAlert() {
    Alert.alert(
        "Oh no!",
        "We could not get your data from our server! Please try again later.",
        [
            {
                text: "Close",
                style: "cancel",
            },
        ]
    )
}

export function couldNotUpdate() {
    Alert.alert(
        "Oh no!",
        "We could not update your data to our server! Please restart the app or try again later.",
        [
            {
                text: "Close",
                style: "cancel",
            },
        ]
    )
}