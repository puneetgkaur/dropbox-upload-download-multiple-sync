
var linking_done=0;

function dropbox_linked()
{
    console.log("linking done");
    alert("linking done");
    linking_done=1;
/*
    console.log("dropbox_linked 1");
    $("on_dropbox_linked").show();
    console.log("dropbox_linked 2");
    $("btn_link_drpbx_sync").hide();
    console.log("dropbox_linked 3");
*/
}




function upload_drpbx_sync()
{
 
         // to link to dropbox        
         if(linking_done==0)
         {
            link_sync();  
         }

         // to save the image
         saveImage();

         console.log("upload dropbox sync 1");




         // to upload
         dropbox.uploadFile("file://"+canvas_image_path).done(function(result) {
            alert ("file successfully uploaded ..");
         }).fail(function(err) {
            console.log('dropbox.uploadFile fail, err -> ' + err);
            alert ("couldn't upload file , err : "+ err);
         });

}

function download_drpbx_sync()
{
        var filePath = decodeURIComponent($(event.currentTarget).attr("href").substr(1));
        $("#filePath").html(filePath);
        showLoader();
        if( (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filePath) ) {
            dropbox.readData(filePath).done(function(result) {
                var bytes = new Uint8Array(result);
                $('#image').attr('src', "data:image/jpeg;base64," + encode(bytes));
                $("#image").show();
                $("#text").hide();
                hideLoader();
            });
        } else {
            dropbox.readString(filePath).done(function(result) {
                $("#text").html(result);
                $("#image").hide();
                $("#text").show();
                hideLoader();
            });
        }

}



function unlink_drpbx_sync()
{
	dropbox.unlink().done(function() {
                alert("successfully unlinked");
              })
}



































var dropbox = (function() {

    var pluginName = "dropbox_sync";

    var link = function() {
        console.log("Reached inside dropbox.link 1");
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                setTimeout(function() {
                    deferred.resolve(result);
                     console.log("Reached inside dropbox.link 2");
                }, 1000);
            },
            function(error) {
                deferred.reject(error);
                 console.log("Error inside dropbox.link 1");
            },
            pluginName, "link", [""]);



        console.log("Reached inside dropbox.link 3");
        return deferred.promise();
    }

    var checkLink = function() {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "checkLink", [""]);
        return deferred.promise();
    }

    var unlink = function() {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "unlink", [""]);
        return deferred.promise();
    }

    var listFolder = function(path) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                alert("getFiles error");
                console.log("getFiles error");
                deferred.reject(error);
            },
            pluginName, "listFolder", [path]);
        return deferred.promise();
    }

    var addObserver = function(path) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "addObserver", [path]);
        return deferred.promise();
    }

    var readData = function (filePath,fileName) {
        var deferred = $.Deferred();
	console.log("inside read data 1, file path : "+filePath+" fileName: "+fileName);
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject();
            },
            pluginName, "readData", [filePath,fileName]);
        return deferred.promise();
    }

    var readString = function (fileName) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject();
            },
            pluginName, "readString", [fileName]);
        return deferred.promise();
    }
    
    var uploadFile = function (filePath) {
        console.log("in dropbox upload file");
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject();
            },
            pluginName, "uploadFile", [filePath]);
        return deferred.promise();
    }
    
    var uploadFolder = function (folderPath) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject();
            },
            pluginName, "uploadFolder", [folderPath]);
        return deferred.promise();
    }

    return {
        link: link,
        checkLink: checkLink,
        unlink: unlink,
        listFolder: listFolder,
        addObserver: addObserver,
        readData: readData,
        readString: readString,
        uploadFile: uploadFile,
        uploadFolder: uploadFolder
    }

}());

function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}


function display_images() {
        var i,
            l,
            html = "",
            file;
        dropbox.listFolder(app.path).done(function (files) {
            l = files.length;
            if (l > 0) {
                $("#noFiles").hide();
            } else {
                $("#noFiles").show();
            }
            for (i=0; i<l; i++) {
                file = files[i];
              if (!file.isFolder) {
                   html += '<li fi="fi" class="topcoat-list__item">' +
                   '<a href="#' + encodeURIComponent(file.path) + '" class="file">' +
                   '<img src="img/icon-file.png" />' +
                   file.path.substr(file.path.lastIndexOf("/") + 1)  + '</a></li>'; 
              }
            }
            $("#fileList").html(html);
            
        });
    }
