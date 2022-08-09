import React, { useState, useEffect } from 'react'; 
import {Text, View, StyleSheet, Pressable, FlatList, TextInput, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { APIAddress, APIPort } from "@env"
import couldNotUpdate from '@functionFiles/ErrorMessages'

export default function BasicListItem({ index, listData, setListData, editMode}){
    const [iconID, setIconID] = useState("arrow-up-sharp");
    const [isItemExtended, setIsItemExtended] = useState(false)
    const [isFetching, setIsFetching] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemBeingEdited, setItemBeingEdited] = useState(null);
    var originalItemBeingEdited = null
    var listContents = listData[index].ListContents

    //Edit Mode Off
    
    function ToggleDropDown() {
        if (isItemExtended == false) {
            setIconID("arrow-down-sharp")
            setIsItemExtended(true)
        }
        else {
            setIconID("arrow-up-sharp")
            setIsItemExtended(false)
        }
    }

    function FlatListBuilder(listContents) {
        if (listContents.length == 0) {
            return (
                <View>
                    <Text>Nothing here to show ¯\_(ツ)_/¯</Text>
                </View>
            )
        }
        else {
            return (
                <FlatList
                    data={listContents}
                    renderItem={({ item }) => ListItem(item)}
                />
            )
        }
    }

    function ListItem(Item) {
        return( 
            <View style={Styles.ListItem_Container}>
                <Text style={Styles.ListItem_Text}>{'\u2022'} {Item.key}</Text>
            </View>
        )
    }

    //Edit Mode On

    function AddElement() {
        listData[index].listContents.push({ key: null })
        setIsFetching(true)
    }

    function EditableFlatListBuilder(listContents) {
        if (listContents.length == 0) {
            return (
                <View>
                    <Text>Nothing here to show ¯\_(ツ)_/¯</Text>
                </View>
            )
        }
        else {
            return (
                <FlatList
                    data={listContents}
                    onRefresh={OnRefresh}
                    refreshing={isFetching}
                    renderItem={({ item, index }) => EditableListItem(item)}
                />
            )
        }
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const OnRefresh = async () => {
        await sleep(2000);
        setIsFetching(false);
    }
    
    function EditableListItem(Item) {
        return (
            <Pressable style={Styles.ListItem_Container} onPress={() => EditListItem(Item.key)}>
                <Text style={Styles.ListItem_Text}>{Item.key}</Text> 
            </Pressable>
        )
    }

    function EditListItem(ItemKey) {
        console.log(GetItemIndex(ItemKey));
        setItemBeingEdited(ItemKey);
        originalItemBeingEdited = ItemKey
        setIsModalVisible(true)
    }

    // Modal Code

    function UpdateListItem(NewText){
        var TempData = listData
                TempData[index].ListContents[GetItemIndex(itemBeingEdited.toString())].key = NewText
        setItemBeingEdited(NewText)
        setListData(TempData)
    }

    function CancelEdit() { // Find why this is making entry null
        var TempData = listData
        TempData[index].ListContents[GetItemIndex(itemBeingEdited.toString())].key = originalItemBeingEdited
        console.log(originalItemBeingEdited)
        setItemBeingEdited(null)
        originalItemBeingEdited = null
        setIsModalVisible(false)
    }

    function GetItemIndex(ItemKey) {
        return listData[index].ListContents.findIndex(x => x.key === ItemKey)
    }

    var TimesTried = 0  
    async function UpdateListData() { //Update this to update specific parts. This will not put so much strain to update/send the entire array
        try {
            console.log(listData)
            var Response = await fetch('http://192.168.1.188:3000/UpdateListData', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username: "Foxu",
                    ListData: listData
                })
            })
            if (!Response.ok) {
                couldNotUpdate()
            }
            else {
                setIsModalVisible(false)
                setItemBeingEdited(null)
                originalItemBeingEdited = null
                console.log('Successfully Updated Database')
            }
        }
        catch(Error) {
            console.log("BLI/Modal: Error: " + Error.message)
            if (TimesTried >= 5) {
                TimesTried = 0
                couldNotUpdate()
            }
            else {
                TimesTried++
                UpdateListData()
            }
        }

    }

    if (editMode == false) {
        return (
            <View style={Styles.BasicItem_Container}>
                <Pressable style={Styles.BasicItem_Pressable} onPress={() => { ToggleDropDown() }}>
                    <View style={Styles.BasicItem_TitleContainer}>
                        <View style={Styles.BasicItem_TextContainer}>
                            <Text style={Styles.BasicItem_Title}>{listData[index].data}</Text>
                        </View>
                        <View style={Styles.DropDownIcon_Container}>
                            <Icon style={Styles.DropDownIcon} name={iconID} size={25} />
                        </View>
                    </View>
                    <View style={Styles.BasicItem_ItemContainer}>
                        {isItemExtended ? FlatListBuilder(listContents) : null}
                    </View>
                </Pressable>
            </View>
        )
    }
    else {
        console.log("Edit Mode Enabled")
        return (
            <View style={Styles.BasicItem_Container}>
                <View style={Styles.BasicItem_Pressable}>
                    <View style={Styles.BasicItem_TitleContainer}>
                        {/* Make this editable by modal */}
                        <Pressable style={Styles.BasicItem_TextContainer} onPress={() => EditListItem(Item.key)}>
                            <TextInput style={Styles.BasicItem_Title}>{listData[index].data}</TextInput>
                        </Pressable> 
                        <Pressable style={Styles.DropDownIcon_Container} onPress={() => { AddElement() }}>
                            <Icon style={Styles.DropDownIcon} name={"add-circle"} size={30} />
                        </Pressable>
                    </View>
                    <View style={Styles.BasicItem_ItemContainer}>
                        {editMode ? EditableFlatListBuilder(listContents) : null}
                    </View>
                    <Modal visible={isModalVisible}>
                        <View style={Styles.Main_Container} >
                            <View style={Styles.TextInput_Container}>
                                <TextInput style={Styles.TextInput} value={itemBeingEdited} onChangeText={NewText => UpdateListItem(NewText)}></TextInput>
                            </View>
                            <View style={Styles.Button_Container}>
                                <Pressable style={Styles.Edit_Button} onPress={() => CancelEdit()}>
                                    <Text style={Styles.Edit_Button_Text}>Close</Text>
                                </Pressable>
                                <Pressable style={Styles.Edit_Button} onPress={() => UpdateListData() }>
                                    <Text style={Styles.Edit_Button_Text}>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }

}

const Styles = StyleSheet.create({
    BasicItem_Container: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        flex: 1,
    },
    BasicItem_Pressable: {
        flex: 1,
        width: "95%",
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    BasicItem_TitleContainer: {
        flexDirection: 'row',
    },
    BasicItem_TextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    BasicItem_Title: {
        fontSize: 20,
    },
    DropDownIcon_Container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ListItem_Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    ListItem_Text: {
        fontSize: 20,
    },
    TextInput_Container: {
        // flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        flexDirection: 'row'
    },
    TextInput: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        // borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    Button_Container: {
        // flex: 2,
        position: 'relative',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    Edit_Button: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    Edit_Button_Text: {
        fontSize: 20,
    },
});