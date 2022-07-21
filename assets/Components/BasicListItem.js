import React, { useState, useEffect } from 'react'; 
import {Text, View, StyleSheet, Pressable, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BasicListItem({ Index, Data, SetData, EditMode }){
    const [IconID, SetIconID] = useState("arrow-up-sharp");
    const [DropDown, SetDropDown] = useState(false)
    var Title = Data[Index].data
    var ListContents = Data[Index].ListContents

    console.log("ListContents: " + Index)

    if (EditMode == false) {
        return (
            <View style={Styles.BasicItem_Container}>
                <Pressable style={Styles.BasicItem_Pressable} onPress={() => { ToggleDropDown() }}>
                    <View style={Styles.BasicItem_TitleContainer}>
                        <View style={Styles.BasicItem_TextContainer}>
                            <Text style={Styles.BasicItem_Title}>{Title}</Text>
                        </View>
                        <View style={Styles.DropDownIcon_Container}>
                            <Icon style={Styles.DropDownIcon} name={IconID} size={25} />
                        </View>
                    </View>
                    <View style={Styles.BasicItem_ItemContainer}>
                        {DropDown ? ItemBuilder(ListContents) : null}
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
                        <View style={Styles.BasicItem_TextContainer}>
                            <TextInput style={Styles.BasicItem_Title}>{Title}</TextInput>
                        </View>
                        <Pressable style={Styles.DropDownIcon_Container} onPress={() => { AddElement() }}>
                            <Icon style={Styles.DropDownIcon} name={"add-circle"} size={30} />
                        </Pressable>
                    </View>
                    <View style={Styles.BasicItem_ItemContainer}>
                        {EditMode ? EditableItemBuilder(ListContents) : null}
                    </View>
                </View>
            </View>
        )
    }

    //Edit Mode Off
    
    function ToggleDropDown() {
        if (DropDown == false) {
            SetIconID("arrow-down-sharp")
            SetDropDown(true)
        }
        else {
            SetIconID("arrow-up-sharp")
            SetDropDown(false)
        }
    }

    function ItemBuilder(ListContents) {
        if (ListContents.length == 0) {
            return (
                <View>
                    <Text>Nothing here to show ¯\_(ツ)_/¯</Text>
                </View>
            )
        }
        else {
            return (
                <FlatList
                    data={ListContents}
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
        
    }

    function EditableItemBuilder(ListContents) {
        if (ListContents.length == 0) {
            return (
                <View>
                    <Text>Nothing here to show ¯\_(ツ)_/¯</Text>
                </View>
            )
        }
        else {
            return (
                <FlatList
                    data={ListContents}
                    renderItem={({ item, index }) => EditableListItem(item, index)}
                />
            )
        }
    }

    function EditableListItem(Item, Index) {
        return (
            <View style={Styles.ListItem_Container}>
                <TextInput style={Styles.ListItem_Text} value={Item.key}/>
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
    }
});