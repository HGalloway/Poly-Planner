import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, Pressable, SectionList} from 'react-native';
import BasicListItem from "../Components/BasicListItem"

export default function Profile() {
    const [EditMode, SetEditMode] = useState(false);
    const [ProfData, SetProfData] = useState([
    {
        data: ["Love Languages"], // Title of list. SectionList's take the data from each section for the title.
        ListContents: [{ key: "Physical Touch" }, { key: "Gift Giving" }],
    },
    {
        data: ["Hobbies"], // Title of list. SectionList's take the data from each section for the title.
        ListContents: [{ key: "Video games" }, { key: "Being Gay" }],
    },
    ]); //FUTURE NOTES: Grab List Data from Mongo Database

    return (
        <SafeAreaView style={Styles.Main_Container}>
            <View style={Styles.Profile_Picture_Container}>
                {EditMode ? EditableProfilePicture() : <Image style={Styles.Profile_Picture} source={require('../Images/ProfilePic.png')} />}
            </View>
            <View style={Styles.Username_Container}>
                <Text style={Styles.Username}>Drew/Luna</Text>
            </View>
            <View style={Styles.EditButton_Container}>
                <Pressable style={Styles.EditButton} onPress={() => { SetEditMode(!EditMode) }}>
                    <Text style={Styles.EditButtonText}>Edit Profile</Text>
                </Pressable>
            </View>
            <View style={Styles.InformationListContainer}>
                <SectionList
                    sections={ProfData}
                    keyExtractor={(index) => index}
                    renderItem={({ item, index }) => <BasicListItem Index={ProfData.findIndex(x => x.data[0] === item)} Data={ProfData} SetData={SetProfData} EditMode={EditMode}/>}
                />
            </View>
            <View>
                <Pressable style={Styles.Add}> 
                    
                </Pressable>
            </View>
        </SafeAreaView>
    )

    function EditableProfilePicture() {
        return (
            <Pressable>
                <Image style={Styles.Profile_Picture} source={require('../Images/ProfilePic2.jpg')}/>
            </Pressable>
        )
    }
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