import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { observer } from 'mobx-react-lite';
import { globalVariables, objects } from '../stores/store';
import { MainStyles } from '../stores/styles';

import Camera from '../components/Camera';
import Comment from '../components/Comment';
import InputArea from '../components/InputArea';
import DescriptionCard from '../components/DescriptionCard';
import { Retrieve } from '../stores/asyncStorage';

export default observer(() => {
    const [user, setUser] = useState<string>("");
    const handleContainerPress = () => {
        Keyboard.dismiss();
    };
    
    useEffect(() => {
        const value: any = Retrieve('username')
        setUser(value)
    }, [])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={MainStyles.container}>
                    <Camera />
                    {
                        !globalVariables.keyboardTrigger &&
                        objects.data.map((object, index) =>
                            <DescriptionCard
                                key={index}
                                x={object.x}
                                y={object.y}
                                width={object.width}
                                height={object.height}
                                object={object.object}
                                confident={object.confident}
                            />
                        )
                    }
                    <View style={MainStyles.bodyView}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={MainStyles.avatar}></TouchableOpacity>
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
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
})
