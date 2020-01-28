

var id=GetQueryString("id");

$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
	var str="";
	var type=fbean.menuType;
	
	$("#temp_img").attr("src",fbean.maxImg);
	$("#index_title").html('- '+fbean.text);
	$("#index_icon").html('<span class="icon icon-'+type+'"></span>'+fbean.text);
	$("#index_icon").attr("onclick","back('template1.html?id="+id+"')");
	
	$.getJSON("../../newsinfo/getObjectListIsFb?page=1&rows=1&type="+type, function(data){
	  	
		if(data.state){
		  let list=data.list;
		  if(list.length>0){
			  let bean=list[0];
			  str+='<div class="text-title">'+bean.title+'</div>'+bean.content;
		  }else{
			  str+='没有发布的内容';
		  }
			
		}else{
			str+='数据库异常，请联系系统管理员';
		}
		
		$("#temp_cont").html(str);
		
	});
	
	
});



