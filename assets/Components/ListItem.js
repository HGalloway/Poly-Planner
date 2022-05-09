import React from "react";
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function BasicListItem({ title, ListContents }){
    return (
        <View style={Styles.BasicItem_Container}>
            <Pressable style={Styles.BasicItem_Pressable} onPress={() => {DropDown(ListContents)}}>
                <View style={Styles.BasicItem_TextContainer}>
                    <Text style={Styles.BasicItem_Title}>{title}</Text>
                </View>
                <View style={Styles.DropDownIcon_Container}>
                    <Icon style={Styles.DropDownIcon} name="arrow-up-sharp" size={30} />{/* //arrow-down-sharp */}
                </View>
            </Pressable>
        </View>
    )
}

function DropDown(ListContents) {
    Alert.alert(ListContents)
}

const Styles = StyleSheet.create({
    BasicItem_Container: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'center'
    },
    BasicItem_Pressable: {
        flex: 1,
        width: "95%",
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
    },
    BasicItem_TextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BasicItem_Title: {
        fontSize: 20,
    },
    DropDownIcon_Container: {
        alignItems: "flex-start",
    },
    DropDownIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});