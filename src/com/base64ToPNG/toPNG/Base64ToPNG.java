package com.base64ToPNG.toPNG;

/**
* A phonegap plugin that converts a Base64 String to a PNG file.
*
* @author mcaesar
* @lincese MIT.
*/

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;

import android.os.Environment;
import java.io.*;
import org.json.JSONException;
import org.json.JSONObject;
import util.Base64;
import android.util.Log;

import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.CallbackContext;

public class Base64ToPNG extends CordovaPlugin {


    private static final String TAG = "Base64 to PNG : ";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)  {
            Log.v(TAG,"Reach0");
        if(action.equals("getpath")){
	    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,Environment.getExternalStorageDirectory() +"/Pictures/");
	    Log.v(TAG,"plugin result"+pluginResult);
	    pluginResult.setKeepCallback(true);
	    callbackContext.sendPluginResult(pluginResult);
                 return true;
        }else if (!action.equals("saveImage")) {
            //return new PluginResult(PluginResult.Status.INVALID_ACTION);
			PluginResult result = new PluginResult(PluginResult.Status.ERROR,
					"Invalid Action");
			// stop waiting for the callback
			result.setKeepCallback(false);
			// notify the app
			callbackContext.sendPluginResult(result);
            return false;
        }

        try {
            Log.v(TAG,"Reach03");
            String b64String = "";
            Log.v(TAG,"Reach04");
            //if (b64String.startsWith("data:image")) {
            //Log.v(TAG,"Reach05");
                b64String = args.getString(0).substring(21);
            Log.v(TAG,"Reach06"+b64String);
            //} else {
            //Log.v(TAG,"Reach07");
            //    b64String = args.getString(0);
            //Log.v(TAG,"Reach08"+b64String);
            //}
            Log.v(TAG,"Reach09");
            JSONObject params = args.getJSONObject(1);
            Log.v(TAG,"Reach10");
            //Optional parameter
            String filename = params.has("filename")
                    ? params.getString("filename")
                    : "b64Image_" + System.currentTimeMillis() + ".png";
            Log.v(TAG,"Reach11");
            String folder = params.has("folder")
                    ? params.getString("folder")
                    : Environment.getExternalStorageDirectory() + "/Pictures";
            Log.v(TAG,"Reach12");
            Boolean overwrite = params.has("overwrite") 
                    ? params.getBoolean("overwrite") 
                    : false;
            Log.v(TAG,"Reac13");
            String dirName=folder;
            String fileName=filename;
            //this.saveImage(b64String, filename, folder, overwrite, callbackContext);
            //Directory and File
            Log.v(TAG,"Reach1");
            File dir = new File(Environment.getExternalStorageDirectory()+"/"+dirName+"/");
            if (!dir.exists()) {
                dir.mkdirs();
            Log.v(TAG,"Reach2");
            }
            Log.v(TAG,"Reach3");



            File file = new File(dirName, fileName);
            Log.v(TAG,"Reach4"+dirName+"/"+fileName);

            String path_to_image = dirName+"/"+fileName;

            //Avoid overwriting a file
            if (!overwrite && file.exists()) {
                //return new PluginResult(PluginResult.Status.OK, "File already exists!");
                callbackContext.error("File already exists!");
                return false;
            }

            Log.v(TAG,"base 64 String : " + b64String);
            //Decode Base64 back to Binary format
            byte[] decodedBytes = Base64.decode(b64String.getBytes());
            Log.v(TAG,"decodedBytes : " + decodedBytes);

            //Save Binary file to phone
            file.createNewFile();
            Log.v(TAG,"Reach6");
            FileOutputStream fOut = new FileOutputStream(file);
            Log.v(TAG,"Reach7");
            fOut.write(decodedBytes);
            Log.v(TAG,"Reach8");
            fOut.close();

            Log.v(TAG,"Reach9");

            //PluginResult pluginResult= new PluginResult(PluginResult.Status.OK, "Saved successfully!");

            //return new PluginResult(PluginResult.Status.OK, "Saved successfully!");
	    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, Environment.getExternalStorageDirectory()+"/"+dirName+"/");
	    Log.v(TAG,"plugin result"+pluginResult);
	    pluginResult.setKeepCallback(true);
	    callbackContext.sendPluginResult(pluginResult);
            //callbackContext.success("Hello");



            return true;
        } catch (JSONException e) {
            Log.v(TAG,"Reach15");
            e.printStackTrace();
            //return new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
	    callbackContext.error(e.getMessage());
            return false;

        } catch (FileNotFoundException e) {
            Log.v(TAG,"Reach-10");
            //return new PluginResult(PluginResult.Status.ERROR, "File not Found!");
            callbackContext.error("File not Found!");
	    return false;
        } catch (IOException e) {
	    Log.v(TAG,"Reach-11");
            //return new PluginResult(PluginResult.Status.ERROR, e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        }catch ( Exception e) {
            Log.v(TAG,"Reach16");
            e.printStackTrace();
            //return new PluginResult(PluginResult.Status.ERROR, e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        }
    }
/*
    private void saveImage(String b64String, String fileName, String dirName, Boolean overwrite, CallbackContext callbackContext) throws InterruptedException, JSONException {

        try {


            //return true;            
        }
    }
*/
}
