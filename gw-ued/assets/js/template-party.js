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
	$("#index_icon").attr("onclick", "back('template-party.html?id=" + id + "')");
	
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
							cal += " toggle-icon arrow-right";
						}
						//假如一级菜单下面就由文章的list，则需要用cutCAction这个方法，下面这个要改，要判断
						if(bean.num == "2" || bean.num == "3"){
							menu += '<li><a data-id="toggle' + bean.id + '" id="nav' + bean.id + '" ' +
								'class="' + cal + '" ' +
								'href="javascript:cutCAction(' + bean.id + ',' + page + ',' + rows + ');">' + bean.columns + '</a>';
								var beanList = [];
								beanList.push(bean)
							getSecondMenuTags(beanList);	
								
						}else{
							menu += '<li><a data-id="toggle' + bean.id + '" id="nav' + bean.id + '" ' +
								'class="' + cal + '" ' +
								'href="javascript:setContent('+bean.id+');"  onclick="toggleMenu('+bean.id+')">' + bean.columns + '</a>';
						}

						if (bean.display == "竖排" && bean.children.length > 0) {
							getSecondMenuTags(bean.children);
							menu += ' <ul class="toggle" style="display:block;">';
							for (var j in bean.children) {
								var cbean = bean.children[j];
								menu += '<li><a data-id="toggle' + cbean.id + '" id="nav' + cbean.id + '" ' +
									'href="javascript:cutCAction(' + cbean.id + ',' + page + ',' + rows + ');">' + cbean.columns + '</a></li>';
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
							
							//横排，做一个tab
							if(bean.display == "横排"){
								
							}
						}
						
					}
					$("#toggleNav").html(menu);
					//默认高亮
					highLight(list);
					//去除箭头上的点击事件
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
		cont += '<div class="text-box deteil-box" style="width:80%">' +
			'<div class="text-title">' + bean.columns + '</div>' + bean.content + '</div>';
		$("#article").html(cont)
		$('#toggleCont').hide();
		$("#article").show();
		//点击高亮
		clickHighLight(id);
	});
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

