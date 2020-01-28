
       
       
     //获取URL后面的参数的方法
       function GetQueryString(name){

           var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

           var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则

           if(r!=null)return  unescape(r[2]); return null;

       }
       
       
       /*
       //上传图片
       function upimg(){
    	   
    	   $("#wu-upimg").dialog({
				title: "上传图片",
				modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
				
			});
    	   document.getElementById('upImageFrame').contentWindow.location.reload(true);
   	       $("#wu-upimg").dialog('open');
    	   
       }
       
       //上传附件
       function upfiles(){
    	   $("#wu-upfiles").dialog({
				title: "上传附件",
				modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
				
			});
    	   document.getElementById('upFileFrame').contentWindow.location.reload(true);
   	       $("#wu-upfiles").dialog('open');
    	   
       }
       */
       
       
       
       
       //上传图片
       function upimg(){
    	   
    	   $("#wu-upimg").dialog({
				title: "上传图片",
				modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
				
			});
    	   $("#upImage").replaceWith('<input id="upImage" type="file" name="upImage" multiple="true" class="upImgBtn"> ');
    	   //document.getElementById('upImageFrame').contentWindow.location.reload(true);
    	   document.getElementById("min_img").value="";
		   $("#upOnlyImgBtn").attr("onclick","loadOnlyImg()");

   	       $("#wu-upimg").dialog('open');
    	   
       }
       
       
       function loadOnlyImg(){
           if($("#upImage")[0].files.length>0){
           
              $("#upOnlyImgForm").form('submit', {
                   type:"post",  //提交方式    
                   url:$("#upOnlyImgForm")[0].action, //请求url
                   success:function(res)
                   { //提交成功的回调函数   
                	   
                	   var result=JSON.parse(res);
                	  // console.log(result);
                	   //console.log(result.filenames);
                       if(res.status="true"){
                    	document.getElementById("min_img").value=result.filenames;
                    	var filenames=result.filenames.split(",");
                    	for(var key in filenames){
                    		var min_img_div=document.getElementById("min_img_div");
                   	    	var img=document.createElement("img");
                   	    	img.setAttribute("src", filenames[key]);
                   	    	img.setAttribute("style", "width:50px;height:50px;margin-left: 20px;");
                   	    	min_img_div.appendChild(img);
                   	    	$("#wu-upimg").dialog('close');
                    	}
               	    	
                    	   
                       }else{
                          $.messager.alert("提示消息", "照片上传失败，请联系系统管理员！", 'info');
                       }
                       
                       
                   }    
               }); 
           }else{
              $.messager.alert("提示消息", "请选择要上传的照片！", 'info');
           }
            
             
           }
       
       //上传附件
       function upfiles(){
    	   $("#wu-upfiles").dialog({
				title: "上传附件",
				modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
				
			});
    	   $("#upfile").replaceWith('<input id="upfile" type="file" name="upfile" multiple="true" class="upImgBtn"> ');
    	   document.getElementById("min_file").value="";
		   $("#upOnlyFileBtn").attr("onclick","loadOnlyFile()");
   	       $("#wu-upfiles").dialog('open');
    	   
       }
       
       function loadOnlyFile(){
           if($("#upfile")[0].files.length>0){
           
              $("#upOnlyFileForm").form('submit', {
                   type:"post",  //提交方式    
                   url:$("#upOnlyFileForm")[0].action, //请求url
                   success:function(res)
                   { //提交成功的回调函数   
                	   
                	   var result=JSON.parse(res);
                	  // console.log(result);
                	   //console.log(result.filenames);
                       if(res.status="true"){
                    	document.getElementById("min_file").value=result.filenames;
                    	var filenames=result.filenames.split(",");
                    	for(var key in filenames){
                    		var min_file_div=document.getElementById("min_file_div");
                   	    	var a=document.createElement("a");
                   	    	a.setAttribute("href", filenames[key]);
                   	    	a.innerHTML=filenames[key];
                   	    	min_file_div.appendChild(a);
                   	    	var br=document.createElement("br");
                   	    	min_file_div.appendChild(br);
                   	       $("#wu-upfiles").dialog('close');
                    	}
               	    	
                    	   
                       }else{
                          $.messager.alert("提示消息", "照片上传失败，请联系系统管理员！", 'info');
                       }
                       
                       
                   }    
               }); 
           }else{
              $.messager.alert("提示消息", "请选择要上传的照片！", 'info');
           }
            
             
           }
       
       function exportExcel(){
    	   
    	   $("#wu-exportExcel").dialog({
				title: "批量导入",
				modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
				
			});
   	       document.getElementById('upFileFrame1').contentWindow.location.reload(true);
  	       $("#wu-exportExcel").dialog('open');
    	   
    	   
    	   
       }
       
       
       //查看图片
       function openMaxImg(url){
    	   
    	   $("#wu-openMaxImg").dialog({
				title: "查看图片",
				modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
				
			});
    	   $("#openMaxImg").attr("src",url);
   	       $("#wu-openMaxImg").dialog('open');
    	   
       }
       
       //删除图片
       function delimg(){
    	
    	   $.messager.confirm("确认消息", "确定要删除图片吗?", function (isDelete) {
    	   if (!isDelete) {  
              return;  
           }
    	     document.getElementById("min_img").value=null;
	         document.getElementById("min_img_div").innerHTML="";
    	   });
       }
       
       //删除附件
       function delfile(){
    	
    	   $.messager.confirm("确认消息", "确定要删除附件吗?", function (isDelete) {
    	   if (!isDelete) {  
              return;  
           }
    	     document.getElementById("min_file").value=null;
	         document.getElementById("min_file_div").innerHTML="";
    	   });
       }