createMenu();

function createMenu(){
	
	var footer='<div class="clearfix">'+
	'<a class="ad" href="http://www.sibcb.ac.cn/">'+
	'<img src="../assets/images/ad-center.png"></a>'+
	'<a class="ad" href="http://www.sipac.gov.cn/">'+
	'<img src="../assets/images/ad-sip.png"></a>'+
	'<a class="ad" href="javascript:;">'+
	'<img src="../assets/images/ad-right.png"></a>'+
	'</div>'+
	'<p>Copyright 2008-2018 sibcb.ac.cn All Right Reseved 中国科学院生物化学与细胞生物学研究所苏州研究院 版权所有</p>'+
	'<p>中国科学院生物化学与细胞生物学研究所苏州研究院 苏ICP备09005103号-10</p>'+
	'<p>苏公网安备 31010402004834号</p>';

	$("#footer_text").html(footer);
	
	$.getJSON(baseUrl+"menuinfo/getObjectList?F=T&T=T", function(data){
	  		var str='<li><a href="index.html">首页</a></li>';
	  		
	  		for(var index in data[0].children){
	  			var p=data[0].children[index];
				//假如没有子目录
				if(p.children.length == 0){
					str+='<li>'+p.text+'</li>';
					continue;
				}
				//假如只有一个子菜单，则父菜单直接显示子菜单的链接
				if (p.children.length == 1) {
					var c=p.children[0];
					str+='<li><a href="'+c.url1+'?id='+c.id+'">'+c.text+'</a></li>';
					continue;
				}else{
					str+='<li>'+p.text+'<ul class="toggle clearfix">';
				}
				console.log(p.children)
	  			for(var i in p.children){
	  				var c=p.children[i];
					if(c.isFb != "已发布"){
						continue;
					}
	  				str+='<li><a href="'+c.url1+'?id='+c.id+'">'+c.text+'</a></li>';
	  			}
	  			str+=' </ul></li>';
	  		}
	  		
	  		$("#menu_head").html(str);
	  		

	  		var but="";
	  		for(var index in data[0].children){
	  			var p=data[0].children[index];
	  			
	  			if(p.text!='人才队伍'&&p.text!='细胞联盟'){
	  				but+='<li><h1>'+p.text+'</h1>';
		  			for(var i in p.children){
		  				var c=p.children[i];
		  				but+='<a href="'+c.url1+'?id='+c.id+'">'+c.text+'</a>';
		  			}
		  			but+='</li>';
	  			}
	  		}
	  		
	  		but+=' <li class="contact"><h1>联系我们</h1><a href="template6.html?id=25"><span>苏州工业园区金鸡湖大道99号苏州纳米城西北区10幢301</span></a></li>';
	  		$("#menu_buto").html(but);
	  		
    });

}


function GetQueryString(name){

    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则

    if(r!=null)return  unescape(r[2]); return null;

}


function  back(url){
	
	window.location.href=url;
}


