import React, { useState, useEffect, memo } from 'react';
import { View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { observer } from 'mobx-react-lite';
import { globalVariables, objects } from '../stores/store';
import { MainStyles } from '../stores/styles';

import Camera from '../components/Camera';
import Comment from '../components/Comment';
import InputArea from '../components/InputArea';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailModel from './DetactedObjects';

const Body = memo(() => {
    const [user, setUser] = useState<string>("");

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value != null) {
                setUser(value);
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={MainStyles.bodyView}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={MainStyles.avatar} onPress={() => globalVariables.setOpenUpdateTargetServer(true)}></TouchableOpacity>
                    <Text style={MainStyles.name}>{user}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        MainStyles.status,
                        {
                            backgroundColor: globalVariables.recording ? 'rgba(241, 26, 67, 0.6)' : 'rgba(149, 20, 232, 0.6)',
                        }
                    ]}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f4f4f4' }}>
                        {globalVariables.recording ? "Recording" : "Waiting"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Comment />
            <InputArea />
        </View>
    )
})

const handleContainerPress = () => {
    Keyboard.dismiss();
};

export default observer(() => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={MainStyles.container}>
                    <Camera />
                    {!globalVariables.keyboardTrigger &&
                        <DetailModel />
                    }
                    <Body />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
})