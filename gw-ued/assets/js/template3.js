

var id=GetQueryString("id");

$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
	var str="";
	var type=fbean.menuType;
	
	$("#temp_img").attr("src",fbean.rsv11);
	str+='<div class="title"><a href="index.html">首页</a> <span>- '+fbean.text+'</span></div>'+
         '<div class="pro-name"><span class="icon icon-'+type+'"></span>'+fbean.text+'</div>';
	
	$.getJSON(baseUrl+"newsinfo/getObjectListIsFb?page=1&rows=100&type="+type, function(data){
		if(data.state){
		  let list=data.list;
		  if(list.length>0){
			  var jj="";
			  var names="";
			  var lists="";
			  console.log(list.length);
			  
			  
			  for(var i in list){
				  let bean=list[i];
				  if(i==0&&bean.title=="人才队伍"){
					  jj=bean.content
				  } else{
					  var a="";
					  if(i<list.length-1){
						  a='<a name="researcher'+list[parseInt(i)+1].id+'"></a>';
					  }
					  names+='<a href="#researcher'+bean.id+'">'+bean.title+'</a>';
					  
					  lists+='<div class="deteil-item" >'+
				             '<div class="deteil-title" >'+bean.title+'&nbsp;&nbsp;&nbsp;&nbsp;'+bean.subhead+'</div>'+
				             bean.content+a+
				             '</br></br>'+
				             '</div>';
				  }
			  }
                
			 // console.log(lists);
			 
			  str+='<a class="to-top" href="#top">返<br>回<br>顶<br>部</a>'+
			       '<div class="deteil-box">'+
			       '<a name="top"><p class="index">'+jj+'</p></a>'+
			       '<div class="link-box">'+names+'</div>'+lists+'</div>';
			 
		  }else{
			  str+='没有发布的内容';
		  }
			
		}else{
			str+='数据库异常，请联系系统管理员';
		}
		
		$("#temp_cont").html(str);
		
	});
	
	
	
});



