import { model } from 'mobx-state-tree/dist/internal'
import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('SkiaRectangleRegion', { model: 'fast' })

/**
 * Scans faces.
 */

type ParameterType = { key: string; value: any }; // Define ParameterType

export function SkiaRectangleRegion(frame: Frame, bitmap: string): any {
    'worklet'
    if (plugin == null) throw new Error('Failed to load Frame Processor Plugin "scanFaces"!')

    let params: Record<string, ParameterType> = {
        param1: { key: 'bitmap', value: bitmap },
    };

    return plugin.call(frame, params)
}