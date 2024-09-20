package com.camera.skiarectangleregionprocessor;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.mrousavy.camera.core.FrameInvalidError;
import com.mrousavy.camera.frameprocessors.Frame;
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin;
import com.mrousavy.camera.frameprocessors.VisionCameraProxy;
import java.util.Map;

public class SkiaRectangleRegionProcessorPlugin extends FrameProcessorPlugin {
  public SkiaRectangleRegionProcessorPlugin(@NonNull VisionCameraProxy proxy, @Nullable Map<String, Object> options) {
    super();
  }

  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
    // code goes here
    // Send API request to backend Python here
    // Receive Rectangle Region Information and return back to frontend native
    // { x: int, y: int, square_size: int }

    return "cat";
  }
}