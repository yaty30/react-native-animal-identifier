package com.camera.skiarectangleregionprocessor;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.mrousavy.camera.core.FrameInvalidError;
import com.mrousavy.camera.frameprocessors.Frame;
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin;
import com.mrousavy.camera.frameprocessors.VisionCameraProxy;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.Map;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.visioncamerabase64plugin.BitmapUtils;

import android.graphics.BitmapFactory;
import android.media.Image;

import android.graphics.Bitmap;
import android.graphics.Color;

import org.json.JSONException;
import org.json.JSONObject;

public class SkiaRectangleRegionProcessorPlugin extends FrameProcessorPlugin {
    public SkiaRectangleRegionProcessorPlugin(@NonNull VisionCameraProxy proxy, @Nullable Map<String, Object> options) {
        super();
    }

    public String makePostRequest(String bitmapData) {
        String url = "http://192.168.50.36:8000/receiveFrame"; // Replace with your URL
        JSONObject json = new JSONObject();
        Bitmap bitmaps;
        try {
            json.put("data", bitmapData);
        } catch(JSONException e) {
            e.printStackTrace();
        }

        String jsonInputString = json.toString();
        try {
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Setting up the request
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; utf-8");
            con.setRequestProperty("Accept", "application/json");
            con.setDoOutput(true);

            // Sending the request
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(jsonInputString);
                wr.flush();
            }

            // Getting the response
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Print the response
//            {'x': 354, 'y': 155, 'square_size': 120}
            return response.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Nullable
    @Override
    public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
        if (arguments != null) {
            // Get the nested map associated with "param1"
            Object param1Value = arguments.get("param1");

            if (param1Value instanceof Map) {
                // Cast to Map<String, Object>
                Map<String, Object> param1Map = (Map<String, Object>) param1Value;

                // Retrieve the value using the key "value"
                Object bitmapValue = param1Map.get("value");

                if (bitmapValue instanceof String) {
                    // Now you can use the bitmap value
                    return makePostRequest((String) bitmapValue);

                }
            }
        }
        return null;
    }
}