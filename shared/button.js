import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function FlatButton({text, onPress}) {

    return (

        <TouchableOpacity onPress={onPress}>

            <View style={styles.button}>

                <Text style={styles.buttonText}>{text}</Text>

            </View>

        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        borderWidth: 3  ,
        borderColor: '#2A5C6B',
        paddingVertical: 16,
        paddingHorizontal: 8,
        width: 300,
        backgroundColor: '#272B4A',
        marginBottom: 25,
        marginTop: 25,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        //fontFamily: "Mitr-Regular", 
        fontFamily: "Mitr-SemiBold",
    }
})
