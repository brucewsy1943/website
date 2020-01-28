

var id=GetQueryString("id");

$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
	var str="";
	var type=fbean.menuType;
	
	$("#temp_img").attr("src",fbean.maxImg);
	$("#index_title").html('- '+fbean.text);
	$("#index_icon").html('<span class="icon icon-'+type+'"></span>'+fbean.text);
	$("#index_icon").attr("onclick","back('template4.html?id="+id+"')");
	
	$.getJSON(baseUrl+"newsinfo/getObjectListIsFb?page=1&rows=100&type="+type, function(data){
		if(data.state){
		  let list=data.list;
		  
		  if(list.length>0){
              let menu="";
              let cont="";
			  for(var i in list){
				  var bean=list[i];
				  
				  if(i==0){
					  menu+='<li><a data-id="toggle'+bean.id+'" id="nav'+bean.id+'" onclick="cutAction('+bean.id+')" class="active" href="javascript:void(0);">'+bean.title+'</a></li>';
				  }else{
					  menu+='<li><a data-id="toggle'+bean.id+'" id="nav'+bean.id+'" onclick="cutAction('+bean.id+')" href="javascript:void(0);">'+bean.title+'</a></li>';
				  }
				  
				  cont+='<div class="toggle-item" id="data'+bean.id+'" data-id="toggleCont'+bean.id+'">'+
		                 '<div class="text-box">'+bean.content+'</div>'+
		                 '</div>';
			  }
			  
			  str+='<ul class="deteil-nav" id="toggleNav">'+menu+'</ul>'+
	                '<div class="toggle-cont" id="toggleCont">'+cont+'</div>';
	               
	             
		  }else{
			  str+='没有发布的内容';
		  }
			
		}else{
			str+='数据库异常，请联系系统管理员';
		}
		
		$("#temp_cont").html(str);
		
	});

});


function cutAction(id){
	 $('.deteil-nav li a').removeClass('active');
     $("#nav"+id).addClass('active');
     // 右侧内容做相应的改变
     
     $('#toggleCont .toggle-item').hide();
     $("#data"+id).show();
}






