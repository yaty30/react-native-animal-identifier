import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { observer } from 'mobx-react-lite';
import { messages, globalVariables, specificTarget } from '../stores/store';
import { InputAreaStyles } from '../stores/styles';
import { GetTimestamp } from '../stores/utils';

export default observer(() => {
    return (

        <TouchableOpacity
            style={[InputAreaStyles.recordButton,{
                    backgroundColor: globalVariables.recording ? "rgba(241, 26, 67, 0.85)" : "rgba(52, 52, 52, 0.75)"
                }]}
            onPress={() => {
                if (specificTarget.get().name !== "") {
                    messages.newMessage({
                        message: `Stopping task: Identify ${specificTarget.get().name}`,
                        timestamp: GetTimestamp(),
                        from: 1,
                        id: 0,
                        initiate: false,
                        target: {}
                    })
                }
                specificTarget.setTarget({
                    name: "",
                    nature: ""
                })
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
    )
})