var id=GetQueryString("id");
var page=1;
var rows=8;

$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
	console.log('fbean=================================');
	//console.log('fbean====================' + fbean);
	console.log('fbean', fbean)
	var str="";
	var type=fbean.menuType;
	//alert(type)
	$("#temp_img").attr("src",fbean.maxImg);
	$("#index_title").html('- '+fbean.text);
	$("#index_icon").html('<span class="icon icon-'+type+'"></span>'+fbean.text);
	$("#index_icon").attr("onclick","back('template-with-children.html?id="+id+"')");

	if(GetQueryString("cid")!=null){
		var cid=GetQueryString("cid");
		setContent1(cid);
	}else{
	
	$.getJSON(baseUrl+"newtreeinfo/getObjectListIsFb?type="+type+"&pid=0", function(data){
		//alert(data.state)
		console.log(data)
		if(data.state){
			let list=data.list.children;
			//console.log(JSON.stringify(data.list));
		  if(list.length>0){
              let menu="";
              let cont="";
			  for(var i in list){
				  var bean=list[i];
				  //alert(bean.content)
				  var cal="";
			     /* if(i==0){
			    	  cal+=" active ";
			      } */
			      
			      if(bean.display=="竖排"&&bean.children.length>0){
			    	  cal+=" toggle-icon arrow-right";
			      }

					  menu+='<li><a data-id="toggle'+bean.id+'" id="nav'+bean.id+'" '+
						      'onclick="cutAction('+bean.id+')" class="'+cal+'" '+
							  'href="javascript:setContent('+bean.id+');" >'+bean.columns+'</a>';
							  
					  //这个是二级的内容部分。大坑！这破功能，一定要加排列方式
					  if(bean.display=="竖排"&&bean.children.length>0){
						 // alert(1)
						  menu+=' <ul class="toggle" style="display:block;">';
						  for(var j in bean.children){
							  var cbean=bean.children[j];
							  menu+='<li><a data-id="toggle'+cbean.id+'" id="nav'+cbean.id+'" '+
							  		        'href="javascript:setContent('+cbean.id+')">'+cbean.columns+'</a></li>';
						  } 
						  menu+=' </ul>';  
					  } 
					  menu+='</li>';
				  if(bean.children.length<=0){
					  var temp1='  <div class="toggle-item" data-id="toggleCont'+bean.id+'" id="data'+bean.id+'">'+
				          '<div class="text-box deteil-box"  id="data'+bean.id+'Text">'+
			          
				          '</div>'+
				          '</div>';
					  $("#toggleCont").append(temp1);
					  
					  $("#data"+bean.id+"Text").html(bean.content);
				  }
				 
			  }
			  $("#toggleNav").html(menu);
			  //高亮
			 highLight(list);
			 cleanArrayFunction();
		  }else{
			  str+='暂无发布的内容';
		  }
		}else{
			str+='数据库异常，请联系系统管理员';
		}
		if(str!=""){
			$("#temp_cont").html(str);
		}
	});
	}
});

function cutAction(id){
	 $('.deteil-nav li a').removeClass('active');
     $("#nav"+id).addClass('active');
     //$("#nav"+id).next('.toggle').toggle();
     // 右侧内容做相应的改变
     $('#toggleCont .toggle-item').hide();
     $("#data"+id).show();
	 //折叠function
	  toggleMenu(id);
}

function cutCAction(id,page,rows){
	 $('.deteil-nav li a').removeClass('active');
	 $('.toggle li a').removeClass('active');
     $("#nav"+id).addClass('active');      
     $("#nav"+id).next('.toggle').toggle();
     $.getJSON(baseUrl+"newtreeinfo/getObjectListIsFbByPid?page="+page+"&rows="+rows+"&pid="+id, function(data){
 		if(data.state){
 			let list=data.list;
 			var cont="";
 			if(list.length>0){  
 		            for(var i in list){
 		            	var bean=list[i];
 		            	cont+='<li class="clearfix">'+
		                         '<a href="javascript:setContent('+bean.id+')">'+
		                           '<span>'+bean.columns+'</span>'+
		                           '<span>'+bean.fbDate+'</span>'+
		                         '</a>'+
		                      '</li>';
 		            } 
 			}else{
 				cont+="没有发布的内容";
 			}
 			$("#data"+id+"Text").html(cont);
 		}
	 
     });
    // 右侧内容做相应的改变
    $('#toggleCont .toggle-item').hide();
    $("#data"+id).show();
}


function back10(){
	$('#temp_cont').show();
    $("#content_text").hide();
}

function setContent(id){
	var cont="";       
    $.getJSON(baseUrl+"newtreeinfo/getObjectById?id="+id, function(bean){
    	console.log(bean);
    	cont+='<div class="text-box deteil-box">'+
              '<div class="text-title">'+bean.columns+'</div>'+bean.content+'</div>';	  
        $("#content_text").html(cont);
        $("#content_text").show();
        //附件
		appendAttachments(bean)
    });     
	/* cutAction(id); */
	//点击高亮
	clickHighLight(id);
	
}


function setContent1(id){	
	var cont="";       
    $.getJSON(baseUrl+"newtreeinfo/getObjectById?id="+id, function(bean){
    	cont+='<div class="text-box deteil-box"><div class="text-title">'+bean.subhead+'</div>'+bean.content+'</div>';	  
        $("#content_text").html(cont);
        $('#temp_cont').hide();
        $("#content_text").show();
    });     
}

//附件
function appendAttachments(bean){
	var filestr = bean.files;
	if(filestr == null || filestr == "" || filestr == undefined){
		return;
	}
	var files = filestr.split(",");
	var ulTag =$("#content_text").append("<h2 style='margin-top:15px'><span style='font-size:large;'>附件下载：</span></h2>");		
	var attachments = ""
	for (var i = 0; i < files.length; i++) {
		attachments += '<li>'
					+		'<a style="font-size:1.4rem;font-style:italic" href="'+files[i]+'" target="_blank">'+ getFileName(files[i])
					+		'</a>'
					+	'</li>'
	}
	ulTag.append("<ul>"+attachments+"</ul>");
}

//截取字符串，获取附件名
function getFileName(str){
	var start = str.lastIndexOf("/");
	var end = str.length;
	var name = str.substring(start+1,end);
	return name;
}
