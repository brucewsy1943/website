/**
 * 
 */

function menuLoading(url){
	
	showTime();
	setInterval("showTime()",1000);

	jQuery("#xyz-accordion").accordion({ //初始化accordion
		fillSpace : true,
		fit : true,
		border : false,
		animate : true
	});

	$.get(url,//调用controller获取根节点菜单
	function(data) {
		
		
		data=data[0].children;
		//console.log("data："+JSON.stringify(data));
		$.each(data, function(i, n) {//循环展示主菜单
			var menu_id = n.id;
			var menu_name = n.text;
			var iconCls = n.iconCls;

			$('#xyz-accordion').accordion('add', {
				title : menu_name,
				//selected : i == 0,//默认展开第一个accordion，当i==0的时候，展开菜单，省去写ifelse的麻烦
				selected : false,
				iconCls : iconCls,
				content : "<ul id='tree" + menu_id + "' ></ul>",
			//content: '<div style="padding:10px 0px"><ul id="tree' + menu_id + '" ></ul></div>'
			});

			//////////////////////////////////////////////////////////////////
			$("#tree" + menu_id).tree({
				data : n.children,
				animate : true,//显示动画效果
				lines : false,// 显示虚线效果  
				onClick : function(node) {//if(node.url){//判断url是否存在，存在则创建tabs 
					//alert("node:"+node+"|node.state:"+node.state+"|node.url:"+node.url);
					if (node.state == "open") {
						$(this).tree('collapse', node.target);
					} else {
						$(this).tree('expand', node.target);
					}
					if (node.url) {
						addTab(node);
					}
				}
			});
			//////////////////////////////////////////////////////////////////
		});

	}, "json");
}



//退出登录
function getLogout() {
	$.messager.confirm('提示', '您确定退出登录吗？', function(r) {
		if (r) {
			location.href = 'login.jsp';
			/*location.href = 'exitLogin';*/
			//location.href = 'login/index?param=logout';
		}
	});
}


function showTime(){
    var nowtime=new Date();
    var year=nowtime.getFullYear();
    var month=nowtime.getMonth()+1;
    var date=nowtime.getDate();
    var hours=nowtime.getHours();
    var minu=nowtime.getMinutes();
    var ceconds=nowtime.getSeconds();
    if(minu<10){
      minu="0"+minu;
    }
    if(ceconds<10){
      ceconds="0"+ceconds;
    }
    document.getElementById("dpdata").innerText=year+"年"+month+"月"+date+"日   "+hours+" : "+minu+" : "+ceconds;
   }


/*
function addTab(node) {
     var tabExitOrNot = $('#xyz-tabs').tabs('exists', node.text);//判断此选项卡是否已存在
    if(tabExitOrNot == true) {
        $('#xyz-tabs').tabs('select', node.text);
        return;
    } 
    //添加选项卡
    $('#xyz-tabs').tabs('add', {
        title: node.text,
        iconCls:node.iconCls,
        content: '<iframe scrolling="auto" frameborder="0" src="'+ node.url +'" style="width:100%;height:100%;"></iframe>', 
        closable: true,
         tools:[{    
                iconCls:'icon-mini_refresh',    
                handler:function(){    
                	refreshTab(node.text);//刷新当前指定tab
                }    
            }] 

    });
}*/


function accordionAddTab(node,nodeurl) {
	$('#xyz-tabs').tabs(
			'add',
			{
				title : node.text,
				iconCls : node.iconCls,
				content : '<iframe scrolling="auto" frameborder="0" src="'+ nodeurl + '" style="width:100%;height:100%;"></iframe>',
				closable : true,
				/*
				tools : [ {
					//iconCls : 'icon-mini_refresh',
					
					handler : function() {
						refreshTab(node.text);//刷新当前指定tab
					}
					
				} ]*/
			});
}



function addTab(node) {
	var nodeurl = node.url;
	var tabExitOrNot = $('#xyz-tabs').tabs('exists', node.text);//判断此选项卡是否已存在
	if (tabExitOrNot == true) {
		$('#xyz-tabs').tabs('select', node.text);
		return;
	}
	/*
	if(node.text == "分公司大屏"){
		var fgsurl = "";
		if(fgsMapId == "LCw="){
			alert("您所属机构不属于38家分子公司，无法显示大屏监控！请联系技术管理部SSO询问用户信息是否录入错误！");
		}else if(fgsMapId == "MCw0ODAyMDAwMCww"){
			fgsurl = nodeurl + "fgs_view1.html";
			accordionAddTab(node,fgsurl);
		}else{
			fgsurl = nodeurl + "index.html?num=" + fgsMapId;
		    accordionAddTab(node,fgsurl);
		}
	}else if(nodeurl.search("report/sm_report") != -1){
		var url = nodeurl + "?num="  + fgsMapId
		accordionAddTab(node,url);
	}else if (nodeurl.search("view/app-ums") != -1) {
		if(zzywToken == ""){
			alert("Token值获取为空！当前功能无法正常使用！请联系系统管理员！");
		}else{
			var url = nodeurl + "?token=" + zzywToken;
		       accordionAddTab(node,url);
		}
	} else {
		*/
		accordionAddTab(node,nodeurl);
	/*}*/
}

function refreshTab(title) {
	var selectTab = $('#xyz-tabs').tabs('getSelected');
	var url = $(selectTab.panel('options').content).attr('src');
	$('#xyz-tabs').tabs('update', {
		tab : selectTab,
		options : {
			title : title,
			href : url
		}
	});
}



function openAbout() {
	var content = '<div style="background: linear-gradient(rgba(255,255,255,0),rgba(220,220,220,1));">'
		    + '<table style="width: 100%; height:100%;">'
			+ '<tbody>'
			+ '<tr>'
			+ '<td style="text-align: center;"><label>版本信息</label></td>'
			+ '<td style="text-align: left;"><label>1.0.0</label></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="text-align: center"><label>技术支持</label></td>'
			+ '<td style="text-align: left;"><label>QQ：2502734206</label></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="text-align: center; width: 28%"><label>版权所有</label></td>'
			+ '<td style="text-align: left;"><label>Copyright 2008-2018 sibcb.ac.cn All Right Reseved 中国科学院生物化学与细胞生物学研究所苏州研究院</label></td>'
			+ '</tr>' + '</tbody>' + '</table>' + '</div>';
	
	var aboutDiv = '<div id="about"></div>';
	$(document.body).append(aboutDiv);
	var win = $('#about').dialog({
		content : content,
		width : "40%",
		height : "30%",
		modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
		title : "关于 -中国科学院生物化学与细胞生物学研究所苏州研究院官网",
		onClose : function() {
			$(this).dialog('destroy');// 后面可以关闭后的事件
		}
	});
	win.dialog('open');
}