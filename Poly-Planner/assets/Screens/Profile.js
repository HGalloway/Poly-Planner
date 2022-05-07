import React from "react";
import { Text, View, StyleSheet, Image, Button} from 'react-native';

export default function App() {
    return (
        <View style={Styles.Main_Container}>
            <View style={Styles.Profile_Picture_Container}>
                <Image style={Styles.Profile_Picture} source={require('../Image/ProfilePic.png')} />
            </View>
            <View style={Styles.Username_Container}>
                <Text style={Styles.Username}>Bonk</Text>
                <Button
                    title="Press me"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />
            </View>
            <View style={Styles.EditButton_Container}>

            </View>
            
        </View>
    )
}

const Styles = StyleSheet.create({
    Main_Container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    Profile_Picture_Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: "20%",
        color: "#BB2100"
    },
    Profile_Picture: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 400 / 2

    },
    Username_Container: {
        flex: 3,
        alignItems: 'center',
        position: 'absolute',
        top: "30%"
    },
    Username: {
        fontSize: 20,
    },
    EditButton_Container: {
        flex: 3,
        alignItems: 'center',
        position: 'absolute',
        top: "50%"
    },
    EditProfile_Button: {

    }
});