
$(function(){
	//getTzgg();
	//getRczp();
	
    jQuery(".banner").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:false,vis:1});
    /* jQuery(".notice").slide({mainCell:".bd ul",effect:"top",autoPlay:true,vis:1}); */
    // $('.toggle li').on('click', function () {
    //     $(this).addClass('active');
    //     $(this).siblings().removeClass('active');
    // })
    $(window).resize(function () {
        jQuery(".banner").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:false,vis:1});
        /* jQuery(".notice").slide({mainCell:".bd ul",effect:"top",autoPlay:true,vis:1}); */
    });
});


//滚动通知  （通知公告3条+新闻资讯3条）
$.getJSON(baseUrl + "newsinfo/getObjectListIsFb?page=1&rows=3&type=slowvirus", function(data){
	console.log(data)
  	var str="";
	if(data.state){
	  var list=data.list;
	  //console.log(JSON.stringify(list));
	  var gd_str = "";
	  if(list.length>0){
			 for(var i=0;i<list.length;i++){
				 var bean=list[i];
				 gd_str +='<li><a style="color:black" href="template-with-attachment.html?id=21&cid='+bean.id+'">【综合新闻】'+bean.title+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+bean.rsv20+'</a></li>';
				 //console.log(gd_str);
			 }
			$("#notice").html(gd_str);
	  }else{
		  str+='没有发布的内容';
	  }
		
	}else{
		str+='数据库异常，请联系系统管理员';
	}
});






	
