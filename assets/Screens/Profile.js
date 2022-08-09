import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Image, Text, Pressable, SectionList, StyleSheet } from 'react-native';

import { networkErrorAlert } from "../functionFiles/ErrorMessages"
import BasicListItem from "../components/BasicListItem"
import {APIADDRESS, APIPORT} from "@env"

export default function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [listData, setListData] = useState([]);

    const getListDataFromDatabase = async () => { 
        try {
            const response = await fetch(APIADDRESS + ":" + APIPORT + '/GetListData?Username=Foxu');
            checkResponse(response);
        } 
        catch (error) {
            handleFetchError();
        }
    };

    async function checkResponse(response) {
        if (response.ok == true){
            var responseJSON = await response.json();
            setListData(responseJSON.ListData)
        }
        else {
            networkErrorAlert();
        }
    }

    var timesTried = 0
    function handleFetchError() {
        if (timesTried < 5) {
            timesTried++;
            getListDataFromDatabase()
        }
        else {
            timesTried = 0;
            networkErrorAlert();  
        }
    }

    async function getProfileImageFromDatabase() { 
        // Get PFP from database once image storing is available. 
    }

    useEffect(() => {
        getListDataFromDatabase()
        getProfileImageFromDatabase()
    }, []);

    function editableProfilePicture() {
        return (
            <Pressable style={[profileStyles.profilePictureContainer, profileStyles.center]}>
                <Image style={profileStyles.profilePicture} source={require('@images/ProfilePic2.jpg')} />
            </Pressable>
        )
    }

    function nonEditableProfilePicture() {
        return (
            <View style={[profileStyles.profilePictureContainer, profileStyles.center]}>
                <Image style={profileStyles.profilePicture} source={require('@images/ProfilePic.png')} />
            </View>
        )
    }

    return (
        <SafeAreaView style={[profileStyles.mainView, profileStyles.center]}>
            {editMode ? editableProfilePicture() : nonEditableProfilePicture()}
            <View style={[profileStyles.usernameContainer, profileStyles.center]}>
                <Text style={profileStyles.username}>Drew/Luna</Text>
            </View>
            <View style={[profileStyles.editButtonContainer, profileStyles.center]}>
                <Pressable style={profileStyles.editButton} onPress={() => { setEditMode(!editMode) }}>
                    <Text style={profileStyles.editButtonText}>Edit Profile</Text>
                </Pressable>
            </View>
            <View style={profileStyles.informationListContainer}>
                <SectionList
                    sections={listData}
                    keyExtractor={(index) => index}
                    renderItem={({ item }) =>
                        <BasicListItem index={listData.findIndex(x => x.data[0] == item)} listData={listData} setListData={() => setListData} editMode={editMode} />
                    }
                />
            </View>
            {/* Work on allowing elements to be added to the list */}
        </SafeAreaView>
    )
} 

const profileStyles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
    },
    profilePictureContainer: {
        flex: 2,
    },
    profilePicture: {
        borderRadius: 400 / 2,
        height: 100,
        width: 100, 
    },
    usernameContainer: {},
    username: {
        fontSize: 20,
    },
    editButtonContainer: {
        flex: 1,
        padding: 20
    },
    editButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 30,
        borderWidth: 1,
    },
    editButtonText: {
        fontSize: 20,
    },
    informationListContainer: {
        flex: 5,
        width: "100%",
    },
    editButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 30,
        borderWidth: 1,
        flex: 1,
        padding: 20,
    },
    editButtonText: {
        fontSize: 20,
    },
});