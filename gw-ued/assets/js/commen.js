//var baseUrl = "http://localhost:8080/brics/";
//var baseUrl = "http://192.168.1.122:8080/brics/";
var baseUrl = "http://localhost:8081/brics/";
$(function(){
  if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
    alert("您的浏览器版本过低，请下载IE9及以上版本");
  }
})

//折叠菜单
function toggleMenu(id){
	if($("#nav"+id).next().css("display") == 'none' || $("#nav"+id).next().css("display") == null){
		$("#nav"+id).next().css({"display":"block"})
	}else{
		$("#nav"+id).next().css({"display":"none"})
	}
}

//消除所有的箭头符号的点击事件
function cleanArrayFunction(){
	var flag = true;
		if($(".arrow-right")!=undefined){
			flag = false;
			$(".arrow-right").each(function(){
				$(this).removeAttr("href");
			});
		}
}

//默认高亮
function highLight(list){
	var flag = false;
	for (var i = 0; i < list.length; i++) {
		 var bean=list[i];
		  //二级有货 则显示二级。默认显示第一个二级菜单
		if(!flag && bean.children.length>0){
			  flag = true;
			  /* alert('二级') */
			  setContent(bean.children[0].id);
			  //高亮
			  $("#nav"+bean.children[0].id).addClass("active")
		}
		//二级没货，显示一级的内容
		if(!flag && list.length >= 0 && bean.children.length==0){
			  flag = true;
			  /* alert("一级") */
			  setContent(list[0].id);
			  //高亮
			  $("#nav"+list[0].id).addClass("active")
		}
	}
}

//点击高亮
function clickHighLight(id){
	$("a").each(function(){
		$(this).removeClass('active');
	})
	$("#nav"+id).addClass('active');
}
