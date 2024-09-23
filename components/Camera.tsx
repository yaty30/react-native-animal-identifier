import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, Pressable } from 'react-native';
// import Shadow from 'react-native-simple-shadow-view';
import RNFS from 'react-native-fs';

import {
    Camera, useCameraDevice, useCameraFormat, useFrameProcessor, useSkiaFrameProcessor,
    VisionCameraProxy, Frame
} from 'react-native-vision-camera';
import { observer } from 'mobx-react-lite';
import { globalVariables, objects } from '../stores/store';
import DescriptionCard from './DescriptionCard';
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

    const plugin = VisionCameraProxy.initFrameProcessorPlugin('SkiaRectangleRegion', { model: 'fast' })

    const setImage = useRunOnJS((data: string) => {
        setBase64(data);
    }, []);

    let format = useCameraFormat(device, [
        { fps: 100 },
        { videoAspectRatio: 9 / 16 },
        { videoResolution: { width: 2160, height: 3048 } },
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
        frame.render();
        const times = 8;
        if (globalVariables.recording) {
            const resized = resize(frame, {
                scale: {
                    width: frame.width / times,
                    height: frame.height / times,
                },
                pixelFormat: 'bgr',
                dataType: 'uint8',
            });

            const mat = OpenCV.frameBufferToMat(frame.height / times, frame.width / times, 3, resized);
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
                frameProcessor={p}
                outputOrientation="device"
            />
            {
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
        </>
    )
})