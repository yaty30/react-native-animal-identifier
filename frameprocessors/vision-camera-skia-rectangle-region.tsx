import { model } from 'mobx-state-tree/dist/internal'
import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('SkiaRectangleRegion', { model: 'fast' })

/**
 * Scans faces.
 */
export function SkiaRectangleRegion(frame: Frame): any {
    'worklet'
    if (plugin == null) throw new Error('Failed to load Frame Processor Plugin "scanFaces"!')
    return plugin.call(frame)
}