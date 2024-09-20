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
    let frameData: string | undefined = undefined;
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);
    const [base64, setBase64] = useState<String>("");
    
        
    const setImage = useRunOnJS((data: string) => {
        setBase64(data);
    }, []);
    
    let format = useCameraFormat(device, [{ videoResolution: { width: 500, height: 500 } }, { fps: 50 }])

    if (format) {
        format = {
            ...format,
            minFps: 1,
            maxFps: 60
        };
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        if (globalVariables.recording) {
            const height = frame.height / 4;
            const width = frame.width / 4;

            const resized = resize(frame, {
                scale: {
                    width: width,
                    height: height,
                },
                pixelFormat: 'bgr',
                dataType: 'uint8',
            });

            const mat = OpenCV.frameBufferToMat(height, width, 3, resized);
            const buffer = OpenCV.toJSValue(mat);
            setImage(buffer.base64);
            OpenCV.clearBuffers(); 
        }
    }, [globalVariables.recording]);

    useEffect(() => {
        PassFrame({
            data: base64.toString()
        })
    }, [base64])

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
                    pixelFormat="yuv"
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