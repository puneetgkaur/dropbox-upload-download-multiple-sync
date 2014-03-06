var drpbxFiles;

    function download_multiple_drpbx_sync() {
console.log("download  multiple dropbox 1"); 
       var i,
            l,
            html = "",
            file;
        dropbox.listFolder("/").done(function (files) {
            l = files.length;
            if (l > 0) {
                $("#noFiles").hide();
            } else {
                $("#noFiles").show();
            }
            for (i=0; i<l; i++) {
                file = files[i];
              if (!file.isFolder) {
	        if( (/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.path) ) {
                   html += '<li onclick="checkmarkDrpbxFile('+i+')">'+
                   '<img src="img/icon-file.png" />' +
                   file.path.substr(file.path.lastIndexOf("/") + 1)  + '</a><div id=\"attach_tick_download'+i+'\"></div></li>';
		}
              }
                 file.chosen=0;
            }
            $("#drpbxfilelist").html(html);
	    drpbxFiles=files;
        });
    }

	function checkmarkDrpbxFile(num)
	{
		console.log("num="+num);

	 	var l=drpbxFiles.length;

		var i;

		var img_id="#attach_tick_download"+num;

		for (i=0; i<l; i++) {
			console.log("value of chosen "+drpbxFiles[i].chosen);
		}

		if(drpbxFiles[num].chosen==0)
		{
		       	drpbxFiles[num].chosen=1;
			console.log(" 1. chosen value ="+ drpbxFiles[num].chosen);
			var html1='<img src="img/check_mark.jpg" width="30px" height="30px">';
			$(img_id).html(html1);
		
		}
		else
		{
			drpbxFiles[num].chosen=0;
			console.log(" 2. chosen value ="+ drpbxFiles[num].chosen);
			$(img_id).html("");
		
		}

	}


	function download_multiple_images()
	{
		console.log("inside download multiple ropbox sync");

		var l=drpbxFiles.length;

		var i;

		for (i=0; i<l; i++) {

			var file=drpbxFiles[i];

			if(file.chosen==1)
			{
			    dropbox.readData(file.path,file.path.substr(file.path.lastIndexOf("/") + 1)).done(function(result) {
				alert("file = "+file.path.substr(file.path.lastIndexOf("/") + 1)+" downloaded");
				console.log("file = "+file.path.substr(file.path.lastIndexOf("/") + 1)+" downloaded");
			    }).fail(function(err) {
			    	console.log('dropbox download err -> ' + err);

			    	alert ("couldn't download file , " + file.path.substr(file.path.lastIndexOf("/") + 1) + " err :"+ err);
			    });

			}			

			
		}
	}



/*
    $("#drpbxfilelist").on("click", ".file", function(event) { // on dropboxView
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
        event.preventDefault();
    });
*/    
