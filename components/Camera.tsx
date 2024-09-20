import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';
import RNFS from 'react-native-fs';

import { Camera, useCameraDevice, useCameraFormat, useFrameProcessor } from 'react-native-vision-camera';
import { observer } from 'mobx-react-lite';
import { globalVariables, testing } from '../stores/store';
import { feed, PassFrame } from '../api/api';
import { runOnJS } from 'react-native-reanimated';
import { Worklets } from 'react-native-worklets-core';

export default observer(() => {
    let frameData: string | undefined = undefined;
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);
    
    let format = useCameraFormat(device, [{ videoResolution: { width: 500, height: 500 } }, { fps: 50 }])

    if (format) {
        format = {
            ...format,
            minFps: 1,
            maxFps: 60
        };
    }

    const handleSetFrame = (data: Uint8Array) => {
        'worklet';
        frameData = data.toString()
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        if (globalVariables.recording) {
            if (frame.pixelFormat === 'rgb') {
                const buffer = frame.toArrayBuffer()
                const data = new Uint8Array(buffer)
                console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
                handleSetFrame(data)
            }
        }
    }, [globalVariables.recording]);

    useEffect(() => {
        PassFrame({
            data: frameData
        })
        console.log("Passed.")
    }, [frameData])

    const handleTakePhoto = async () => {
        setInterval(async () => {
            const photos = await cameraRef.current?.takePhoto();
            const base64String = await RNFS.readFile(photos?.path ?? "", 'base64');

            feed({
                id: 0,
                timestamp: 0,
                footageFrame: base64String
            })

            // setPhoto(photos?.path.toString());
        }, 1000)
    };

    if (device == null) return <></>;

    return (
        <>
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
        </>
    )
})