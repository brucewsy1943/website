var id = GetQueryString("id");
var page = 1;
var rows = 8;

var totalContentArrays = [];

$.getJSON(baseUrl + "menuinfo/getObjectById?id=" + id, function(fbean) {
	var str = "";
	var type = fbean.menuType;
	console.log(fbean)
	$("#temp_img").attr("src", fbean.maxImg);
	$("#index_title").html('- ' + fbean.text);
	$("#index_icon").html('<span class="icon icon-' + type + '"></span>' + fbean.text);
	$("#index_icon").attr("onclick", "back('template-aboutus.html?id=" + id + "')");
	
	if (GetQueryString("cid") != null) {
		var cid = GetQueryString("cid");
		setContent1(cid);
	} else {
		$.getJSON(baseUrl + "newtreeinfo/getObjectListIsFb?type=" + type + "&pid=0", function(data) {
			console.log(data)
			if (data.state) {
				let list = data.list.children;
				//此处加入我们自己的代码
				if (list.length > 0) {
					let menu = "";
					let cont = "";
					var secondMenuTags = "";
					for (var i in list) {
						var bean = list[i];
						var cal = "";
						if (i == 0) {
							cal += " active ";
						}
						if (bean.display == "竖排" && bean.children.length > 0) {
							cal += "toggle-icon arrow-right";
						}
						//假如一级菜单下面就由文章的list，则需要用cutCAction这个方法，下面这个要改，要判断
						/* if(bean.num == "2" || bean.num == "3"){
							menu += '<li><a data-id="toggle' + bean.id + '" id="nav' + bean.id + '" ' +
								'class="' + cal + '" ' +
								'href="javascript:cutCAction(' + bean.id + ',' + page + ',' + rows + ');">' + bean.columns + '</a>';
								var beanList = [];
								beanList.push(bean)
							getSecondMenuTags(beanList);	 */
								
						//}else{
							menu += '<li><a data-id="toggle' + bean.id + '" id="nav' + bean.id + '" ' +
								'class="' + cal + '" ' +
								'href="javascript:setContent('+bean.id+');" onclick="toggleMenu('+bean.id+')">' + bean.columns + '</a>';
						//} 
						//关于我们的二级不用通用的，用另外的onclick触发方法
						if (bean.display == "竖排" && bean.children.length > 0) {
							getSecondMenuTags(bean.children);
							menu += ' <ul class="toggle" style="display:block;">';
							for (var j in bean.children) {
								var cbean = bean.children[j];
								menu += '<li><a data-id="toggle' + cbean.id + '" id="nav' + cbean.id + '" ' +
									'href="javascript:setThirdMenuTags(' + cbean.id + ');">' + cbean.columns + '</a></li>';
							}
							menu += ' </ul>';
							menu += '</li>';
							//不搞特殊化
							/* if (bean.id == 26) {
								$("#data" + bean.id + "Text").html(bean.content);
							} */
							//为什么要加这个条件？难道不应该有内容的才加吗？为了下面可以根据id放置内容啊！
							if (bean.children.length <= 0) {
								var temp1 = '<div class="toggle-item" data-id="toggleCont' + bean.id + '" id="data' + bean.id + '">' +
												'<div class="text-box deteil-box" style="width: 80%"  id="data' + bean.id + 'Text">' +
												'</div>' +
											'</div>';
								$("#toggleCont").append(temp1);
								$("#data" + bean.id + "Text").html(bean.content);
							}
							
						}
					}
					$("#toggleNav").html(menu);
					//默认高亮
					highLight(list);
					//去除箭头的href
					cleanArrayFunction();
				} else {
					str += '没有发布的内容';
				}
			} else {
				str += '数据库异常，请联系系统管理员';
			}
			if (str != "") {
				$("#temp_cont").html(str);
			}
		});
	}

});

function cutAction(id) {
	$('.deteil-nav li a').removeClass('active');
	$("#nav" + id).addClass('active');
	$("#nav" + id).next('.toggle').toggle();
	// 右侧内容做相应的改变
	$('#toggleCont .toggle-item').hide();
	$("#data" + id).show();
}

function cutCAction(id, page, rows) {
	$('.deteil-nav li a').removeClass('active');
	$('.toggle li a').removeClass('active');
	$("#nav" + id).addClass('active');
	$("#nav" + id).next('.toggle').toggle();
	
	$.getJSON(baseUrl + "newtreeinfo/getObjectListIsFbByPid?page=" + page + "&rows=" + rows + "&pid=" + id, function(data) {
		if (data.state) {
			let list = data.list;
			console.log(list)
			var cont = "";
			if (list.length > 0) {
				for (var i in list) {
					var bean = list[i];
					cont += '<li class="clearfix">' +
								'<a href="javascript:setContent(' + bean.id + ')">' +
								'<span>' + bean.columns + '</span>' +
								'<span>' + bean.fbDate + '</span>' +
								'</a>' +
							'</li>';
				}
			} else {
				cont += "没有发布的内容";
			}
			$("#data" + id + "Text").html(cont); 
			$("#article").hide()
			/* getpage(id,page,data.totsize,rows) */
		}

	});
	// 右侧内容做相应的改变
	$('#toggleCont .toggle-item').hide();
	$("#data" + id).show();
	$("#toggleCont").show()
}

function back10() {
	$('#temp_cont').show();
	$("#content_text").hide();
}

function setContent(id) {
	var cont = "";
	$.getJSON(baseUrl + "newtreeinfo/getObjectById?id=" + id, function(bean) {
		console.log(bean)
		cont += '<div class="text-box deteil-box" style="width: 80%">' +
			'<div class="text-title">' + bean.columns + '</div>' + bean.content + '</div>';
		$("#article").html(cont)
		$('#toggleCont').hide();
		$('#tab-content').hide();
		$("#article").show();
		$("#alias").hide();
	});
	//点击高亮
	clickHighLight(id);
}

function getSecondMenuTags(secondMenuArray){
	var secondMenuTags = "";
	for (var i = 0; i < secondMenuArray.length; i++) {
		secondMenuTags +='<div class="toggle-item" data-id="toggleCont4" id="data' + secondMenuArray[i].id + '">' +
							'<div class="white-panel notice-box">' +
							'<ul class="list" id="data' + secondMenuArray[i].id + 'Text">' +
							'</ul>'
							+	'<div class=" pagination pagination_rcjl" id="pagination'+secondMenuArray[i].id+'"></div>'
							+'</div>' 
						+'</div>'
	}
	$("#toggleCont").append(secondMenuTags);
	
	return secondMenuTags;
}

$("#alias").children(":first").children().click(function(){
	if($(this).attr("class")=="" || "tab-active".indexOf($(this).attr("class")) == -1){
		//其他的红也要去掉
		$(this).siblings().removeClass("tab-active")
		$(this).addClass("tab-active")
	}
})

function generateThirdMenuTags(thirdMenuArray){
	//1、生成ul
	var ul = '<ul id="thirdMenuId" class="nav-bar"></ul>';
	
	//2、生成li 生成4级菜单
	var li = "";
	for (var i = 0; i < thirdMenuArray.length; i++) {
		li += '<li><a onclick="setThirdMenuContent('+thirdMenuArray[i].id+',this)">'+thirdMenuArray[i].columns+'</a></li>'
	}
	var tabcontent = '<div id="tab-content" style="margin-top:3%"></div>';
	$("#alias").empty();
	$("#alias").append(ul)
	$("#thirdMenuId").append(li)
	$("#alias").append(tabcontent);
	$("#alias").show();
	$("#article").hide();
}

function setThirdMenuTags(pid){
	$.getJSON(baseUrl + "newtreeinfo/getObjectListIsFbByPid?page=" + page + "&rows=" + rows + "&pid=" + pid, function(data) {
		if (data.state) {
			let list = data.list;
			console.log(list);
			generateThirdMenuTags(list);
			//三级默认第一个变红并显示内容
			initThirdMenu();
		}
	});
	//左边栏高亮
	clickHighLight(pid);

}
//这个方法要加在tab上面
function setThirdMenuContent(id,obj){
	var cont = "";
	$.getJSON(baseUrl + "newtreeinfo/getObjectById?id=" + id, function(bean) {
		console.log(bean)
		/* cont += '<div class="text-box deteil-box" style="width: 80%">' +
			'<div class="text-title">' + bean.columns + '</div>' + bean.content + '</div>'; */
			
		$("#alias").show()
		$("#tab-content").html(bean.content);
		$('#toggleCont').hide();
		$("#article").hide();
	});
	
	//其他的都变成灰色
	$(obj).parent().parent().children().each(function(){
		$(this).css("background","#CCCCCC");
	});
	
	$(obj).parent().css("background","#8b2028");
}

//三级菜单默认显示左边第一个，并显示内容
function initThirdMenu(){
	//设置第一个li的背景色为#8b2028
	$("#thirdMenuId").children(":first").css("background","#8b2028");
	
	//触发第一个li下面的a标签的点击事件
	$("#thirdMenuId").children(":first").children(":first").click();
}


