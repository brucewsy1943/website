var id = GetQueryString("id");
var page = 1;
var rows = 8;

var totalContentArrays = [];

$.getJSON(baseUrl + "menuinfo/getObjectById?id=" + id, function(fbean) {
	var str = "";
	var type = fbean.menuType;
	console.log(fbean)
	//$("#temp_img").attr("src", fbean.maxImg);
	$("#index_title").html('- ' + fbean.text);
	$("#index_icon").html('<span class="icon icon-' + type + '"></span>' + fbean.text);
	$("#index_icon").attr("onclick", "back('template-transform-center.html?id=" + id + "')");

	if (GetQueryString("cid") != null) {
		var cid = GetQueryString("cid");
		setContent1(cid);
	} else {
		$.getJSON(baseUrl + "newtreeinfo/getObjectListIsFb?type=" + type + "&pid=0", function(data) {
			console.log(data)
			if (data.state) {
				let list = data.list.children;
				//此处加入我们自己的代码
				generateTags(list);
				if (list.length > 0) {
					let menu = "";
					let cont = "";
					for (var i in list) {
						var bean = list[i];
						var cal = "";
						if (i == 0) {
							cal += " active ";
						}
						if (bean.display == "竖排" && bean.children.length > 0) {
							cal += " toggle-icon arrow-right";
							menu += '<li><a data-id="toggle' + bean.id + '" id="nav' + bean.id + '" ' +
								'onclick="toggle(' + bean.id + ')" class="' + cal + '" ' +
								'href="javascript:void(0);">' + bean.columns + '</a>';
						}else{
							menu += '<li><a data-id="toggle' + bean.id + '" id="nav' + bean.id + '" ' +
								'onclick="cutAction(' + bean.id + ')" class="' + cal + '" ' +
								'href="javascript:void(0);">' + bean.columns + '</a>';
						}

						if (bean.display == "竖排" && bean.children.length > 0) {
							menu += ' <ul class="toggle" style="display:block;">';
							for (var j in bean.children) {
								var cbean = bean.children[j];
								menu += '<li><a data-id="toggle' + cbean.id + '" id="nav' + cbean.id + '" ' +
									'onclick="cutCAction(' + cbean.id + ',' + page + ',' + rows + ')" ' +
									'href="javascript:void(0);">' + cbean.columns + '</a></li>';
							}
							menu += ' </ul>';
						}
						menu += '</li>';
						if (bean.id == 26) {
							$("#data" + bean.id + "Text").html(bean.content);
						}
						if (bean.children.length <= 0) {
							var temp1 = '  <div class="toggle-item" data-id="toggleCont' + bean.id + '" id="data' + bean.id + '">' +
								'<div style="width:80%" class="text-box deteil-box"  id="data' + bean.id + 'Text">' +
								'</div>' +
								'</div>';
							$("#toggleCont").append(temp1);
							$("#data" + bean.id + "Text").html(bean.content);
						}
					}
					$("#toggleNav").html(menu);
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

function toggle(id){
	$('.deteil-nav li a').removeClass('active');
	$("#nav" + id).addClass('active');
	$("#nav" + id).next('.toggle').toggle();
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
						'<a href="javascript:void(0);" onclick="setContent(' + bean.id + ')">' +
						'<span>' + bean.columns + '</span>' +
						'<span>' + bean.fbDate + '</span>' +
						'</a>' +
						'</li>';
				}
			} else {
				cont += "没有发布的内容";
			}
			$("#data" + id + "Text").html(cont);
			/* getpage(id,page,data.totsize,rows) */
		}

	});
	// 右侧内容做相应的改变
	$('#toggleCont .toggle-item').hide();
	$("#data" + id).show();
	
	$("#enterprise").hide();
}

function back10() {
	$('#temp_cont').show();
	$("#content_text").hide();
}

function setContent(id) {
	var cont = "";
	$.getJSON(baseUrl + "newtreeinfo/getObjectById?id=" + id, function(bean) {
		cont += '<div style="width:80%" class="text-box deteil-box">' +
			'<div class="text-title">' + bean.columns + '</div>' + bean.content + '</div>';
		
		$("#enterprise").show();
		$("#enterprise").html(cont);
		$(".toggle-item").hide();
		//$('#temp_cont').hide();
		//$("#content_text").show();
		
	});
}

//转移转化项目
function getZyzhxm(id, page, rows) {

	$.getJSON(baseUrl + "newtreeinfo/getObjectListIsFbByPid?page=" + page + "&rows=" + rows + "&pid=" + id, function(data) {
		if (data.state) {
			let list = data.list;
			var cont = "";
			if (list.length > 0) {
				for (var i in list) {
					var bean = list[i];
					cont += '<a class="ad-item" href="javascript:void(0);" onclick="setContent1(' + bean.id + ')">' +
						'<div class="time-box">' +
						'<img src="' + bean.img + '">' +
						'</div>' +
						'<div class="ad-text">' +
						'<div class="title2">' + bean.columns + '</div>' +
						'<p class="overflow-2 overflow-4">' + bean.intro + '</p>' +
						'</div>' +
						'<div class="tips">' +
						'<span class="icon icon-more"></span>' +
						'</div>' +
						'</a>';
				}
			} else {
				cont += "没有发布的内容";
			}
			$("#data" + id + "Text").html(cont);

			/* getpage(id,page,data.totsize,rows) */
		}

	});
}
//孵化项目
function getFhxm(id, page, rows) {

	$.getJSON(baseUrl + "newtreeinfo/getObjectListIsFbByPid?page=" + page + "&rows=" + rows + "&pid=" + id, function(data) {
		if (data.state) {
			let list = data.list;
			var cont = "";
			if (list.length > 0) {
				for (var i in list) {
					var bean = list[i];
					cont += '<a class="ad-item" href="javascript:void(0);" onclick="setContent1(' + bean.id + ')">' +
						'<div class="time-box">' +
						'<img src="' + bean.img + '">' +
						'</div>' +
						'<div class="ad-text">' +
						'<div class="title2">' + bean.columns + '</div>' +
						'<p class="overflow-2 overflow-4">' + bean.intro + '</p>' +
						'</div>' +
						'<div class="tips">' +
						'<span class="icon icon-more"></span>' +
						'</div>' +
						'</a>';
				}
			} else {
				cont += "没有发布的内容";
			}
			$("#data" + id + "Text").html(cont);

			/* getpage(id,page,data.totsize,rows); */
		}

	});
}

function setContent1(id) {
	var cont = "";
	$.getJSON(baseUrl + "newtreeinfo/getObjectById?id=" + id, function(bean) {
		cont += '<div style="width:80%" class="text-box deteil-box"><div class="text-title">' + bean.subhead + '</div>' + bean.content +
			'</div>';
		$("#enterprise").html(cont);
		//$('#temp_cont').hide();
		//$("#content_text").show();
		$(".toggle-item").hide();
	});
}


//注：由于之前的外包在html中把标签的id包含了后台数据库的id，并写死在页面上！吃屎去吧！从未见过如此无耻的代码！
//我们必须要把这部分写活。否则后台数据只要重新插入前台就会显示不出来！

//注意 以下不是左边栏列表，而是对应内容展示需要的骨架标签们，每个标签的id都是动态的，以对应之前外包公司写的破功能！
//生成一级菜单展示内容需要的骨架标签
function generateFirstMenuContentTags(firstMenuContentArray) {
	//中心介绍
	var firstMenuContentTags = "";
	for (var i = 0; i < firstMenuContentArray.length; i++) {
		firstMenuContentTags += '<div class="toggle-item" data-id="toggleCont1" id="data' + firstMenuContentArray[i].id +
			'">' +
			'<div class="text-box"id="data' + firstMenuContentArray[i].id + 'Text" style="width:100%;margin:0">' +
			'</div>' +
			'</div>'
	}
	return firstMenuContentTags;
}

//中心介绍下面的项目的骨架标签 杨安信息、任久建新等，胡萍、吴立刚等  
function generateProjectTags(projectArray) {
	console.log(projectArray);
	var project = "";
	for (var i = 0; i < projectArray.length; i++) {
		project += '<div class="deteil-item">' +
			'<div class="deteil-title">' + projectArray[i].columns + '</div>' +
			'<div class="academic-box user-box clearfix" id="data' + projectArray[i].id + 'Text"></div>'
			+	'<div class="pagination pagination_zyzh" id="pagination'+projectArray[i].id+'"></div>'
			+'</div>'
	}
	return project;
}

//二级菜单内容展示需要的骨架标签 人才扶持 人才激励 财政引导政策
function getSecondMenuContentTags(secondMenuArray) {
	console.log(secondMenuArray)
	var secondMenuContentTags = "";
	for (var i = 0; i < secondMenuArray.length; i++) {
		secondMenuContentTags += '<div class="toggle-item" data-id="toggleCont4" id="data' + secondMenuArray[i].id + '">' +
									'<div class="white-panel notice-box">' +
									'<ul class="list" id="data' + secondMenuArray[i].id + 'Text">' +
									'</ul>'
									+	'<div class=" pagination pagination_rcjl" id="pagination'+secondMenuArray[i].id+'"></div>'
									+'</div>' 
								+'</div>'
	}
	return secondMenuContentTags;
}

//总的拼接方法
function generateTags(firstMenuContentArray) {
	var first = generateFirstMenuContentTags(firstMenuContentArray);
	var secondMenuArray = [];
	var introId = "" //中心介绍的id
	var projectArray = []; //中心介绍下面的项目
	var bean;
	for (var i = 0; i < firstMenuContentArray.length; i++) {
		//注意 这里只能用顺序来标识了！
		//正常这种要写固定模板 但是他标签id都写死了，标签id又基于数据库id，而且整个js都是基于写死的标签id。。。实在是没办法
		if (firstMenuContentArray[i].num == "1") { //中心介绍
			bean = firstMenuContentArray[i]
			introId = firstMenuContentArray[i].id;
			projectArray = firstMenuContentArray[i].children;
		}
		if (firstMenuContentArray[i].num=="3") {//政策一览
			secondMenuArray = firstMenuContentArray[i].children;
		}
	}

	var second = getSecondMenuContentTags(secondMenuArray)
	$("#toggleCont").append(first + second);
	
	//在toggleCont下再来一个div，控制孵化项目和孵化企业的展示
	$("#toggleCont").append("<div style='margin-bottom:30px' id='enterprise'></div>")
	
	//拼接中心下面的项目
	//项目的整体骨架先行
	var projectStructure = ""
	projectStructure += '<div id="centerProjects" class="deteil-box" style="margin-top: 0;width:100%">' +
		'</div>'
	$("#data" + introId).append(projectStructure);

	//再拼接项目projectItems的骨架
	var project = generateProjectTags(projectArray);
	console.log(project)
	$("#centerProjects").html(project);
	
	//显示中心文章
	$("#data"+bean.id+"Text").html(bean.content);
	
	//调用外包的破方法显示项目
	getZyzhxm(projectArray[0].id, 1, 10);
	getFhxm(projectArray[1].id, 1, 10)
}
