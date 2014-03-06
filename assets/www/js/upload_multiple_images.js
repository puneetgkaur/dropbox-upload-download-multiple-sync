function upload_multiple_drpbx_sync()
{

console.log("upload multiple images 1");
	Cordova.exec(successhandler_uploadMultipleImages,errorhandler_uploadMultipleImages,"GetImageFileData" , "getImages",[""])


}

var json_imageFiles;

function image_file_clicked(num)
{
	console.log("num="+num);
 	var l=json_imageFiles.length;
	var i;
        var img_id="#attach_tick"+num;
	for (i=0; i<l; i++) {
		console.log("value of chosen "+json_imageFiles[i].chosen);
	}
	if(json_imageFiles[num].chosen==0)
        {
	       	json_imageFiles[num].chosen=1;
		console.log(" 1. chosen value ="+ json_imageFiles[num].chosen);
		var html1='<img src="img/check_mark.jpg" width="30px" height="30px">';
		$(img_id).html(html1);
		
	}
	else
	{
		json_imageFiles[num].chosen=0;
		console.log(" 2. chosen value ="+ json_imageFiles[num].chosen);
		$(img_id).html("");
		
	}



}


function successhandler_uploadMultipleImages(files)
{
        console.log("in successhandler upload multiple images\n");
	json_imageFiles=files;
	console.log("files : " + json_imageFiles );
	var html="<div data-role=\"fieldcontain\"> <fieldset data-role=\"controlgroup\"><legend>Choose the files to be uploaded to dropbox</legend>";
	var l=files.length;
	var i;
	for (i=0; i<l; i++) {
		var file = files[i];
		file.chosen=0;
		html = html+'<div  onclick=\"image_file_clicked('+i+')\"><img src=\"'+file.data+'\" width=\"50\" height=\"50\">'+file.fileName+'<div id=\"attach_tick'+i+'\"></div>'/*'<input type="checkbox" id=\"'+file.fileName+'\"/>'*/+'</div>'; 
	}
        html=html+"  </fieldset></div>";
        console.log("html for  #images_in_picture_folder "+html);
	$("#images_in_picture_folder").html(html);
        json_imageFiles=files;
}


function errorhandler_uploadMultipleImages(error)
{
	console.log(error);
}



function upload_multiple_images()
{

	console.log("upload multiple images");

	cordova.exec(success_getPath,error_getPath,"Base64ToPNG","getpath",[""]);

	var externalStoragePath;

	function success_getPath(path)
	{
		externalStoragePath=path;
	}
	function error_getPath(err)
	{
		console.log("error"+err);
	}

	var l=json_imageFiles.length;
	var i;
	for (i=0; i<l; i++) {
		if(json_imageFiles[i].chosen==1)
                {
               		    dropbox.uploadFile("file://"+externalStoragePath+json_imageFiles[i].fileName).done(function(result) {
			    alert (json_imageFiles[i].fileName+" file successfully uploaded ..");
			 }).fail(function(err) {
			    console.log('dropbox.uploadFile fail, err -> ' + err);
			    alert ("couldn't upload file , " + json_imageFiles[i].fileName + " err :"+ err);
			 });	
                }
	
	}
}


/*

function upload_multiple_images()
{
        console.log("inside upload multiple images");
	var l=json_imageFiles.length;
        console.log("jsonArray files"+json_imageFiles);
	var i;
	for (i=0; i<l; i++) {


		
var check_element = document.getElementById(json_imageFiles[i].fileName);
console.log("file name : "+ json_imageFiles[i].fileName + " element  : "+ check_element+" is checked : " + check_element.is(':checked'));

		if ($(checkId).prop('checked')){
			console.log("checked image file");
			//if ($('#myCheckbox').is(':checked'))
			//if($('#checkMeOut').prop('checked'))
			console.log("path of file checked : "+"file://"+json_imageFiles[i].filePath);

		         dropbox.uploadFile("file://"+json_imageFiles[i].filePath).done(function(result) {
			    alert (json_imageFiles[i].fileName+" file successfully uploaded ..");
			 }).fail(function(err) {
			    console.log('dropbox.uploadFile fail, err -> ' + err);
			    alert ("couldn't upload file , " + json_imageFiles[i].fileName + " err :"+ err);
			 });
		}
	}	
}
*/


