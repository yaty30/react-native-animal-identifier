import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';
import RNFS from 'react-native-fs';

import { Camera, useCameraDevice, useCameraFormat, useFrameProcessor } from 'react-native-vision-camera';
import { observer } from 'mobx-react-lite';
import { globalVariables, testing } from '../stores/store';
import { feed, PassFrame } from '../api/api';
import { runOnJS } from 'react-native-reanimated';
import { useRunOnJS, Worklets } from 'react-native-worklets-core';
import { ObjectType, OpenCV } from 'react-native-fast-opencv';
import { useResizePlugin } from 'vision-camera-resize-plugin';

export default observer(() => {
    const { resize } = useResizePlugin();
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);
    const [base64, setBase64] = useState<String>("");
    const [mat, setMat] = useState<Object | null>();
    
    const setImage = useRunOnJS((data: string) => {
        setBase64(data);
    }, []);
    
    let format = useCameraFormat(device, [
        { videoResolution: { width: 500, height: 500 } }, { fps: 120 }
    ])

    if (format) {
        format = {
            ...format,
            minFps: 1,
            maxFps: 130
        };
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        if (globalVariables.recording) {
            const resized = resize(frame, {
                scale: {
                    width: frame.width,
                    height: frame.height,
                },
                pixelFormat: 'bgr',
                dataType: 'uint8',
            });

            const mat = OpenCV.frameBufferToMat(frame.height, frame.width, 3, resized);
            console.log(typeof(mat))
            const buffer = OpenCV.toJSValue(mat);
            setImage(buffer.base64);
            OpenCV.clearBuffers(); 
        }
    }, [globalVariables.recording]);

    useEffect(() => {
        PassFrame({
            data: base64
        })
    }, [base64])

    if (device == null) return <></>;

    return (
        <>
            <View style={{ display: 'none' }}>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device} isActive={true}
                    photo={true} ref={cameraRef}
                    pixelFormat="yuv"
                    format={format}
                    video={true}
                    frameProcessor={frameProcessor}
                    outputOrientation="device"
                />
            </View>
            {
                // testing.frame &&
                // <Image
                //     source={{
                //         // uri: "file://" + photo
                //         // uri: testing.frame
                //         uri: `data:image/jpeg;base64,${base64}`
                //     }}
                //     fadeDuration={0}
                //     style={StyleSheet.absoluteFill}
                // />
            }
        </>
    )
})