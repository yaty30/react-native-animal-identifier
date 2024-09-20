import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';
import RNFS from 'react-native-fs';

import { 
    Camera, useCameraDevice, useCameraFormat, useFrameProcessor, useSkiaFrameProcessor,
    VisionCameraProxy, Frame
} from 'react-native-vision-camera';
import { observer } from 'mobx-react-lite';
import { globalVariables, testing, frames } from '../stores/store';
import { feed, PassFrame } from '../api/api';
import { useRunOnJS, Worklets } from 'react-native-worklets-core';
import { ObjectType, OpenCV } from 'react-native-fast-opencv';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { Skia } from '@shopify/react-native-skia';
import { SkiaRectangleRegion } from '../frameprocessors/vision-camera-skia-rectangle-region';

export default observer(() => {
    const { resize } = useResizePlugin();
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);
    const [base64, setBase64] = useState<String>("");
    const [mat, setMat] = useState<Object | null>();
    const frameX = useRef<number>(-1);
    const frameY = useRef<number>(-1);
    const squareSize = useRef<number>(-1);

    const plugin = VisionCameraProxy.initFrameProcessorPlugin('SkiaRectangleRegion', { model: 'fast' })

    const setImage = useRunOnJS((data: string) => {
        setBase64(data);
    }, []);

    let format = useCameraFormat(device, [
        { fps: 100 }
    ])

    if (format) {
        format = {
            ...format,
            minFps: 1,
            maxFps: 131
        };
    }

    const p = useSkiaFrameProcessor((frame) => {
        'worklet'
        const faces = SkiaRectangleRegion(frame)
        console.log(`Faces in Frame: ${faces}`)
    }, [])

    const frameProcessor = useSkiaFrameProcessor((frame) => {
        'worklet';
        frame.render()
        if (globalVariables.recording) {
            const resized = resize(frame, {
                scale: {
                    width: frame.width / 8,
                    height: frame.height / 8,
                },
                pixelFormat: 'bgr',
                dataType: 'uint8',
            });

            const mat = OpenCV.frameBufferToMat(frame.height / 8, frame.width / 8, 3, resized);
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
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: frames.x,
                    left: frames.y,
                    width: frames.square_size,
                    height: frames.square_size,
                    borderWidth: 3,
                    borderColor: '#39FF14',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'

                }}    
            />
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