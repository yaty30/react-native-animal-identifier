import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';

import { observer } from 'mobx-react-lite';
import { globalVariables } from './stores/store';
import { MainStyles } from './stores/styles';

import Camera from './components/Camera';
import Comment from './components/Comment';
import InputArea from './components/InputArea';

export default observer(() => {
    const handleContainerPress = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={MainStyles.container}>
                    <Camera />
                    <View style={MainStyles.bodyView}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={MainStyles.avatar}></TouchableOpacity>
                                <Text style={MainStyles.name}>Name</Text>
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
                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
})
