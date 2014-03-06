/*function upload_multiple_drpbx_sync(){
 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSWin, onFSFail);
}*/
    var onFSFail = function(evt) {
        console.log(evt.target.error.code);
    }

    var fileSystem1;

    var onFSWin = function(fileSystem) {
        fileSystem.root.getDirectory("Pictures", {create: true, exclusive: false}, onGetDirectoryWin, onGetDirectoryFail);
	fileSystem1=fileSystem;
    }

    var onGetDirectoryFail = function() {
        console.log("error getting dir")
    }

    var onGetDirectoryWin = function(entry) {
console.log("directory entries");
        var directoryReader = entry.createReader();
	directoryReader.readEntries(reader_success,reader_fail);
    }


function reader_success(file_entries) {
console.log("file_entries");
    var i;
    for (i=0; i<file_entries.length; i++) {
	console.log(file_entries[i].name);
	//file_entries[i].file(file_success, file_fail);
	//file_entries[i].fullPath
	window.resolveLocalFileSystemURI(file_entries[i].fullPath, FileEntry_onSuccess, FileEntry_onError);
    }
}

function reader_fail(error) {
    alert("Failed to list directory contents: " + error.code);
}

function FileEntry_onSuccess(fileEntry){
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        console.log("read success");
        console.log(evt.target.result);
    };

    	console.log("file read as data url : ");

    	reader.readAsDataURL(fileEntry);

    	console.log("file read as text : ");

        //readAsText: Reads text file. 

    	reader.readAsText(fileEntry);

    	console.log("file read as binary string : ");

        //readAsBinaryString: Reads file as binary and returns a binary string

    	reader.readAsBinaryString(fileEntry);

    	console.log("file read as array buffer : ");

        //readAsArrayBuffer: Reads file as an ArrayBuffer. 

    	reader.readAsArrayBuffer(fileEntry);

}

function FileEntry_onError(error){
    console.log("fileEntry error"+error);
}








/*
function file_success(file) {
    console.log("File size: " + file.size);
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        console.log("read success");
        console.log(evt.target.result);
    };
    reader.readAsDataURL(file);
}

function file_fail(error) {
    alert("Unable to retrieve file properties: " + error.code);
}*/
