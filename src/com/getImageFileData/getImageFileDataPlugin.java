package com.getImageFileData;

import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.apache.cordova.*;
 
import java.io.File;
import java.util.ArrayList;
import java.util.List;
 
import android.app.ListActivity;
import android.os.Bundle;
import android.os.Environment;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.util.Log;

public class getImageFileDataPlugin extends CordovaPlugin
{
    private static final String PLUGIN_ERROR = "DropboxPlugin Error";
    private static final String TAG = "Upload Multiple Images";
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {


		if (action.equals("getImages")) {

				Log.v("Upload Multiple Images","got into get Images");
                                try
                                {
				JSONArray jsonArray = new JSONArray();
				
				File f = new File(Environment.getExternalStorageDirectory() + "/Pictures");
				File[] files = f.listFiles();
				for (File inFile : files) {
				    Log.v(TAG,"inFile : "+inFile);
                                    Log.v(TAG,"inFile name : "+inFile.getName()+", path of file :" +inFile.getPath()+"; bitmap data :  "+BitmapFactory.decodeFile(inFile.getPath())  ); 
				    if (inFile.isFile()) {
					// check whether an image - put a creteria
					// need the file name - inFile.getName()
					// need the corresponding bitmap image - Bitmap bitmap = BitmapFactory.decodeFile(bitmapFile);

					// check whether an image
					//private final String[] okFileExtensions =  new String[] {"jpg", "png", "gif", "jpeg"};
					     //for (String extension : okFileExtensions)
						//{
						  if (inFile.getName().toLowerCase().endsWith("jpg")||inFile.getName().toLowerCase().endsWith("gif")||inFile.getName().toLowerCase().endsWith("png")||inFile.getName().toLowerCase().endsWith("jpeg"))
						  {
							// for all the files that are images
							// create JSON object - name , data

							JSONObject imageFiles = new JSONObject();
					       		
							imageFiles.put("fileName",inFile.getName());
							Bitmap bitmap = BitmapFactory.decodeFile(inFile.getPath());
							imageFiles.put("data", bitmap);
							imageFiles.put("fullPath", inFile.getPath());
							
							jsonArray.put(imageFiles);
							Log.v(TAG," imageFile : "+imageFiles);
							
						  }
						//}
						
				    }
				}
				Log.v(TAG,"jsonArray imageFiles : "+jsonArray);
				callbackContext.success(jsonArray);
				}//try ends
                                catch(Exception e){
                                	callbackContext.error(PLUGIN_ERROR);
                                        e.printStackTrace();
					return false;
                                }
				return true;

		
		} //if
                else{

			callbackContext.error("invalid action string");
			return false;
                }

		} //boolean execute function

} //class
