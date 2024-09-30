import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import {
    Camera, useCameraDevice, useCameraFormat,
    useSkiaFrameProcessor
} from 'react-native-vision-camera';
import { observer } from 'mobx-react-lite';
import { globalVariables, specificTarget } from '../stores/store';
import { PassFrame } from '../api/api';
import { useRunOnJS } from 'react-native-worklets-core';
import { OpenCV } from 'react-native-fast-opencv';
import { useResizePlugin } from 'vision-camera-resize-plugin';

// Self-made frame processor -- Not in use
// import { Skia } from '@shopify/react-native-skia';
// import { SkiaRectangleRegion } from '../frameprocessors/vision-camera-skia-rectangle-region';

export default observer(() => {
    const { resize } = useResizePlugin();
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);

    // Self-made frame processor -- Not in use
    // const plugin = VisionCameraProxy.initFrameProcessorPlugin('SkiaRectangleRegion', { model: 'fast' })

    const setImage = useRunOnJS((data: string) => {
        globalVariables.setFrameBase64(data)
    }, []);

    let format = useCameraFormat(device, [
        { fps: 24 },
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

    const frameprocessor = useSkiaFrameProcessor((frame) => {
        'worklet'
        frame.render();
        const times = 3;
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
        if(globalVariables.frameBase64 && globalVariables.recording) {
            PassFrame({
                data: globalVariables.frameBase64,
                target: specificTarget.get(),
                terminated: !globalVariables.recording
            })
        }
    }, [globalVariables.frameBase64, globalVariables.recording])

    if (device == null) return <></>;

    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device} isActive={true}
            photo={true} ref={cameraRef}
            pixelFormat="yuv"
            format={format}
            video={true}
            frameProcessor={frameprocessor}
            outputOrientation="preview"
        />
    )
})