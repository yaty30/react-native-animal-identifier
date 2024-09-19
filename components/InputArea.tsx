import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { observer } from 'mobx-react-lite';
import { messages, globalVariables } from '../stores/store';
import { feed, talk } from '../api/api';
import { InputAreaStyles } from '../stores/styles';

export default observer(() => {
    const [text, onChangeText] = useState<string>('');

    return (
        <View style={[
            InputAreaStyles.bottomView,
            { bottom: globalVariables.keyboardTrigger ? 42 : 35 }
        ]}>
            <View style={InputAreaStyles.inputStyle}>
                <TextInput
                    placeholder={`Message ...${globalVariables.recording}`}
                    style={InputAreaStyles.input}
                    onChangeText={onChangeText}
                    value={text}
                    onFocus={() => {
                        globalVariables.setRecording(false)
                        globalVariables.setKeyboardTrigger(true)
                    }}
                    onBlur={() => globalVariables.setKeyboardTrigger(false)}
                />
                <TouchableOpacity
                    style={[
                        InputAreaStyles.sendButton,
                        { backgroundColor: text.length === 0 ? '#ddd' : '#CD32D7' }
                    ]}
                    disabled={text.length === 0}
                    onPress={() => {
                        messages.newMessage({
                            message: text,
                            timestamp: 0,
                            from: 0,
                            id: 0
                        })
                        talk({
                            id: 0,
                            timestamp: 0,
                            message: text
                        })
                        onChangeText("")
                        Keyboard.dismiss()
                    }}
                >
                    <Feather name="send"
                        size={24}
                        style={{
                            color: '#fefefe'
                        }}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[
                    InputAreaStyles.recordButton,
                    { 
                        backgroundColor: globalVariables.recording ? "rgba(241, 26, 67, 0.85)" : "rgba(52, 52, 52, 0.75)"
                    }
                ]}
                onPress={() => {
                    globalVariables.setRecording(
                        !globalVariables.recording
                    )
                }}
            >
                <Feather
                    name={globalVariables.recording ? "pause" : "play"}
                    size={24}
                    style={{
                        color: '#fefefe',
                        textAlignVertical: 'center', // Align the text vertically centered
                        lineHeight: 60, // Set line height to match the TouchableOpacity height
                    }}
                />
            </TouchableOpacity>
        </View>
    )
})


