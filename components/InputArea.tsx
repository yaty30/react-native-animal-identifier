import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { observer } from 'mobx-react-lite';
import { messages, globalVariables } from '../stores/store';
import { talk } from '../api/api';
import { InputAreaStyles } from '../stores/styles';
import { ProgressBar } from '@react-native-community/progress-bar-android';

export default observer(() => {
    const [text, onChangeText] = useState<string>('');

    return (
        <View style={[
            InputAreaStyles.bottomView,
            { bottom: globalVariables.keyboardTrigger ? 42 : 35 }
        ]}>
            <View style={InputAreaStyles.inputStyle}>
                <TextInput
                    placeholder={`Message ...`}
                    style={InputAreaStyles.input}
                    onChangeText={onChangeText}
                    value={text}
                    editable={!globalVariables.messageLoading}
                    onFocus={() => {
                        globalVariables.setRecording(false)
                        globalVariables.setKeyboardTrigger(true)
                    }}
                    onBlur={() => globalVariables.setKeyboardTrigger(false)}
                />
                {globalVariables.messageLoading ?
                    <ProgressBar color="#9514E8" style={InputAreaStyles.progressBar} />
                    :
                    <TouchableOpacity
                        style={[
                            InputAreaStyles.sendButton,
                            { backgroundColor: text.length === 0 ? '#ddd' : '#CD32D7' }
                        ]}
                        disabled={text.length === 0 || globalVariables.messageLoading}
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
                            style={InputAreaStyles.sendButtonIcon}
                        />
                    </TouchableOpacity>
                }
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
                    style={InputAreaStyles.recordButtonIcon}
                    size={24}
                />
            </TouchableOpacity>
        </View>
    )
})


