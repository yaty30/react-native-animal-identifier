import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';
import { Camera, useCameraDevice, useCameraFormat, useFrameProcessor } from 'react-native-vision-camera';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';

import { observer } from 'mobx-react-lite';
import { messages, testing } from './stores/store';
import { feed, talk } from './api/api';

export default observer(() => {
    const [recording, setRecording] = useState(false);
    const [photo, setPhoto] = useState<string>();
    const [keyboardTrigger, setKeyboardTrigger] = useState<boolean>(false);
    const cameraRef = useRef<Camera>(null);
    const commentViewRef = useRef<ScrollView>(null);
    const [text, onChangeText] = useState<string>('');
    const device = useCameraDevice('back');

    if (device == null) return <></>;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        bodyView: {
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            position: 'relative',
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 25,
            paddingRight: 25,
        },
        avatar: {
            backgroundColor: "#9514E8",
            padding: 15,
            borderRadius: 50,
            width: 45,
            height: 45
        },
        name: {
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
        },
        status: {
            position: 'absolute',
            right: 0,
            backgroundColor: recording ? 'rgba(241, 26, 67, 0.6)' : 'rgba(149, 20, 232, 0.6)',
            paddingTop: 9,
            paddingBottom: 9,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 25
        },
        bottomView: {
            position: 'absolute',
            bottom: keyboardTrigger ? 42 : 35,
            left: 25,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        },
        inputStyle: {
            backgroundColor: "rgba(52, 52, 52, 0.25)",
            padding: 10,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        input: {
            height: 60,
            width: '65%',
            fontSize: 18,
            color: '#DEDEDE',
            padding: 20,
            borderRadius: 10,
            // shadowColor: '#000',
            // shadowOffset: {
            // 	width: 0,
            // 	height: 2,
            // },
            // shadowOpacity: 0.5,
            // shadowRadius: 3.84,
            // elevation: 5,
        },
        boxShadow: {
            width: 200,
            height: 200,
            backgroundColor: '#FFF',
            padding: 20,
        },
        recordButton: {
            width: 60, // Set a fixed width for the TouchableOpacity
            height: 60, // Set a fixed height for the TouchableOpacity
            marginTop: 5,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: recording ? "rgba(241, 26, 67, 0.85)" : "rgba(52, 52, 52, 0.75)",
            borderRadius: 50,
        },
        commentView: {
            position: 'absolute',
            bottom: 120,
            left: 25,
            width: '100%',
            maxHeight: 180,
            zIndex: 1
        },
        commentInnerScrollView: {
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            height: '100%',
            zIndex: 1
        },
        commentBlock: {
            backgroundColor: "rgba(219, 216, 225, 0.35)",
            borderRadius: 50,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginBottom: 15,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center', // Update to 'center' for vertical alignment
            justifyContent: 'space-between',
        },
        commentSystemAvatar: {
            backgroundColor: "#9514E8",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            width: 35,
            height: 35,
            marginRight: 20,
        },
        commentUserAvatar: {
            backgroundColor: "#004F46",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            width: 35,
            height: 35,
            marginRight: 20,
        },
        commentText: {
            flex: 1,
            fontWeight: 'bold',
            marginRight: 10
        },
    });

    let format = useCameraFormat(device, [{ videoResolution: { width: 500, height: 500 } }, { fps: 50 }])

    if (format) {
        format = {
            ...format,
            minFps: 1,
            maxFps: 60
        };
    }

    const handleTakePhoto = async () => {
        setInterval(async () => {
            const photos = await cameraRef.current?.takePhoto();
            const base64String = await RNFS.readFile(photos?.path ?? "", 'base64');

            feed({
                id: 0,
                timestamp: 0,
                footageFrame: base64String
            })

            setPhoto(photos?.path.toString());
        }, 1000)
    };

    const handleContainerPress = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        commentViewRef.current?.scrollToEnd({
            animated: false
        })

        if (messages.list.length === 0) {
            talk({
                id: 0,
                timestamp: 0,
                message: "Hello there"
            })
        }
    }, [])

    const handleContentSizeChange = () => {
        commentViewRef.current?.scrollToEnd({ animated: true });
    };

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';

        if (frame.pixelFormat === 'rgb') {
            const buffer = frame.toArrayBuffer()
            const data = new Uint8Array(buffer)
            console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
        }
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={styles.container}>
                    <View style={{ display: 'none' }}>
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device} isActive={true}
                            photo={true} ref={cameraRef}
                            pixelFormat="rgb"
                            format={format}
                            video={true}
                            frameProcessor={frameProcessor}
                        />
                    </View>
                    {
                        testing.frame &&
                        <Image
                            source={{
                                // uri: "file://" + photo
                                uri: testing.frame
                            }}
                            fadeDuration={0}
                            style={StyleSheet.absoluteFill}
                        />
                    }
                    <View style={styles.bodyView}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={styles.avatar}></TouchableOpacity>
                                <Text style={styles.name}>Name</Text>
                            </View>
                            <TouchableOpacity style={styles.status}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f4f4f4' }}>
                                    {recording ? "Recording" : "Waiting"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Message display area */}
                        <ScrollView
                            style={styles.commentView}
                            contentContainerStyle={{ alignItems: 'flex-end' }}
                            ref={commentViewRef}
                            onContentSizeChange={handleContentSizeChange}
                            onLayout={handleContentSizeChange}
                        >
                            <View style={styles.commentInnerScrollView}>
                                {
                                    messages.list.map((x, i) =>
                                        <TouchableOpacity key={i} style={styles.commentBlock}>
                                            <TouchableOpacity style={x.from === 0 ? styles.commentUserAvatar : styles.commentSystemAvatar}>
                                                {x.from === 0 ?
                                                    <FontAwesome5 name="user-alt" size={15} color="#fff" />
                                                    :
                                                    <MaterialCommunityIcons name="robot" size={20} color="#fff" />
                                                }
                                            </TouchableOpacity>
                                            <Text style={styles.commentText}>{`${x.message}`}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </ScrollView>

                        <View style={styles.bottomView}>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    placeholder={`Message ...${recording}`}
                                    style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                    onFocus={() => {
                                        setRecording(false)
                                        setKeyboardTrigger(true)
                                    }}
                                    onBlur={() => setKeyboardTrigger(false)}
                                />
                                <TouchableOpacity
                                    style={{ backgroundColor: '#CD32D7', borderRadius: 50, padding: 10, paddingRight: 13, paddingTop: 13, marginTop: 10, marginBottom: 10 }}
                                    onPress={() => {
                                        messages.newMessage({
                                            message: text,
                                            timestamp: 0,
                                            from: 0
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
                                style={styles.recordButton}
                                onPress={() => {
                                    setRecording(!recording)
                                    handleTakePhoto()
                                }}
                            >
                                <Feather
                                    name={recording ? "pause" : "play"}
                                    size={24}
                                    style={{
                                        color: '#fefefe',
                                        textAlignVertical: 'center', // Align the text vertically centered
                                        lineHeight: 60, // Set line height to match the TouchableOpacity height
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
})