package com.xy.udisk;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.text.TextUtils;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by mrchen on 2017/5/18.
 */

public class Udisk extends CordovaPlugin {

    BroadcastReceiver receiver;
    private CallbackContext udiskCallbackContext = null;
    private static final String LOG_TAG = "udiskManager";

    public Udisk() {
        this.receiver = null;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("init")) {
            if (this.udiskCallbackContext != null) {
                callbackContext.error("Udisk already running");
            }
            this.udiskCallbackContext = callbackContext;

            IntentFilter intentFilter = new IntentFilter();
            intentFilter.addAction(Intent.ACTION_MEDIA_MOUNTED);
            intentFilter.addAction(Intent.ACTION_MEDIA_UNMOUNTED);
            intentFilter.addAction(Intent.ACTION_MEDIA_REMOVED);
            intentFilter.addDataScheme("file");

            if (this.receiver == null) {
                this.receiver = new BroadcastReceiver() {
                    @Override
                    public void onReceive(Context context, Intent intent) {
                        receiveHandler(intent);
                    }
                };
                webView.getContext().registerReceiver(this.receiver, intentFilter);
            }

            PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
            pluginResult.setKeepCallback(true);
            callbackContext.sendPluginResult(pluginResult);
            return true;
        }

        return false;
    }

    private void receiveHandler(Intent intent) {
        String action = intent.getAction();
        String path = intent.getData().getPath();
        if (!TextUtils.isEmpty(path)){
            if ("android.intent.action.MEDIA_UNMOUNTED".equals(action)) {
                Log.d("usb","unmounted");
                Log.d("usb", path);
                this.loadUrl("cordova.plugins.udisk.emit('unmounted', '" + path + "')");
            }
            if ("android.intent.action.MEDIA_MOUNTED".equals(action)) {
                Log.d("usb","mounted");
                Log.d("usb", path);
                this.loadUrl("cordova.plugins.udisk.emit('mounted', '" + path + "')");
            }
            if ("android.intent.action.MEDIA_REMOVED".equals(action)) {
                Log.d("usb","mounted");
                Log.d("usb", path);
                this.loadUrl("cordova.plugins.udisk.emit('removed', '" + path + "')");
            }
        }

        System.out.println("收到USB/SD_card事件监听" + path);
    }

    private void loadUrl(final String url) {

        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + url);
            }
        });
    }
}
