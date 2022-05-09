import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, Pressable, Alert, SectionList} from 'react-native';
import BasicListItem from "../Components/ListItem"

const DATA = [
    {
        data: ["Love Languages"], // Title of list. SectionList's take the data from each section for the title.
        ListContents: "Physical Touch",
    },
];

export default function App() {
    return (
        <SafeAreaView style={Styles.Main_Container}>
            <View style={Styles.Profile_Picture_Container}>
                <Image style={Styles.Profile_Picture} source={require('../Images/ProfilePic.png')} />
            </View>
            <View style={Styles.Username_Container}>
                <Text style={Styles.Username}>Drew/Luna</Text>
            </View>
            <View style={Styles.EditButton_Container}>
                <Pressable style={Styles.EditButton} onPress={() => { Alert.alert(DATA[0].ListContents) }}>
                    <Text style={Styles.EditButtonText}>Edit Profile</Text>
                </Pressable>
            </View>
            <View style={Styles.InformationListContainer}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => <BasicListItem title={item} ListContents={DATA[index].ListContents}/>}
                />
            </View>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    Main_Container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Profile_Picture_Container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    Profile_Picture: {
        width: 100,
        height: 100,
        borderRadius: 400 / 2,
    },
    Username_Container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Username: {
        fontSize: 20,
    },
    EditButton_Container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    EditButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    EditButtonText: {
        fontSize: 20,
    },
    InformationListContainer: {
        flex: 5,
        width: "100%",
    },
    item: {
        padding: 20,
        marginVertical: 8
    },
    EditButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    EditButtonText: {
        fontSize: 20,
    },
});