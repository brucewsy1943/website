

var id=GetQueryString("id");
var page=1;
var rows=8;

$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
	var str="";
	var type=fbean.menuType;
	
	$("#temp_img").attr("src",fbean.maxImg);
	$("#index_title").html('- '+fbean.text);
	$("#index_icon").html('<span class="icon icon-'+type+'"></span>'+fbean.text);
	$("#index_icon").attr("onclick","back('template10.html?id="+id+"')");

	if(GetQueryString("cid")!=null){
		var cid=GetQueryString("cid");
		setContent1(cid);
	}else{
	
	$.getJSON(baseUrl+"newtreeinfo/getObjectListIsFb?type="+type+"&pid=0", function(data){

		if(data.state){
			let list=data.list.children;
			//console.log(JSON.stringify(data.list));
		  if(list.length>0){
              let menu="";
              let cont="";
			  for(var i in list){
				  var bean=list[i];
				  var cal="";
			      if(i==0){
			    	  cal+=" active ";
			      }
			      
			      if(bean.display=="竖排"&&bean.children.length>0){
			    	  cal+=" toggle-icon arrow-right";
			      }

					  menu+='<li><a data-id="toggle'+bean.id+'" id="nav'+bean.id+'" '+
						      'onclick="cutAction('+bean.id+')" class="'+cal+'" '+
							  'href="javascript:void(0);">'+bean.columns+'</a>';
					  
					  if(bean.display=="竖排"&&bean.children.length>0){
						  menu+=' <ul class="toggle" style="display:block;">';
						  for(var j in bean.children){
							  var cbean=bean.children[j];
							  menu+='<li><a data-id="toggle'+cbean.id+'" id="nav'+cbean.id+'" '+
								            'onclick="cutCAction('+cbean.id+','+page+','+rows+')" '+
									        'href="javascript:void(0);">'+cbean.columns+'</a></li>';
						  } 
						  menu+=' </ul>';  
					  } 
					  menu+='</li>';
				  if(bean.id==26){
					  $("#data"+bean.id+"Text").html(bean.content);
				  }
				  
				  if(bean.children.length<=0){
					  
					  
					 
					  var temp1='  <div class="toggle-item" data-id="toggleCont'+bean.id+'" id="data'+bean.id+'">'+
				          '<div class="text-box deteil-box"  id="data'+bean.id+'Text">'+
			          
				          '</div>'+
				          '</div>';
					  $("#toggleCont").append(temp1);
					  $("#data"+bean.id+"Text").html(bean.content);
				  }
			  }
			  
			  $("#toggleNav").html(menu);
	               
	             
		  }else{
			  str+='没有发布的内容';
		  }
			
		}else{
			str+='数据库异常，请联系系统管理员';
		}
		
		if(str!=""){
			$("#temp_cont").html(str);
		}
		
	});
	}
});


function cutAction(id){
	 $('.deteil-nav li a').removeClass('active');
     $("#nav"+id).addClass('active');
     $("#nav"+id).next('.toggle').toggle();
     // 右侧内容做相应的改变
     $('#toggleCont .toggle-item').hide();
     $("#data"+id).show();
}


function cutCAction(id,page,rows){
	 $('.deteil-nav li a').removeClass('active');
	 $('.toggle li a').removeClass('active');
     $("#nav"+id).addClass('active');      
     $("#nav"+id).next('.toggle').toggle();
     $.getJSON(baseUrl+"newtreeinfo/getObjectListIsFbByPid?page="+page+"&rows="+rows+"&pid="+id, function(data){
 		if(data.state){
 			let list=data.list;
 			var cont="";
 			if(list.length>0){  
 		            for(var i in list){
 		            	var bean=list[i];
 		            	cont+='<li class="clearfix">'+
		                         '<a href="javascript:void(0);" onclick="setContent('+bean.id+')">'+
		                           '<span>'+bean.columns+'</span>'+
		                           '<span>'+bean.fbDate+'</span>'+
		                         '</a>'+
		                      '</li>';
 		            } 
 			}else{
 				cont+="没有发布的内容";
 			}
 			$("#data"+id+"Text").html(cont);
 			
 			getpage(id,page,data.totsize,rows)
 		}
	 
     });
    // 右侧内容做相应的改变
    $('#toggleCont .toggle-item').hide();
    $("#data"+id).show();
}


function getpage(id,page,count,rows){
	
	var container = $('#pagination'+id);

	var sources = function () {
       var result = [];

       for (var i = 1; i <=count; i++) {
           result.push(i);
       }
       return result;
   }();

   var options = {
       dataSource: sources,  // 数据源，最终提供给分页组件的是一个数组
       // 如果是ajax请求就用下面这段：
       locator: function () {   // 这个参数与 dataSource 相关，一般情况下，dataSource 是一个数组，可以直接传给分页组件处理。但如果返回的是 Object，那么就需要指定那个数组，默认为 data
           // find data and return
           return 'a.b';
       },
       // dataSource: '填写接口',
       // locator: '指定数据源中的哪个数组',


       pageSize: rows,     // 默认显示几个页码，每页的条目数
       pageNumber: page,  // 默认在第几页，初始化时加载哪一页的数据
       pageRange: 2,  //可见的页码范围，即当前页码两边的页码数量。比如当前是第 6 页，设置 pageRange 为 2，则页码条显示为 '1... 4 5 6 7 8'
       showNavigator: true,  // 显示总页码数和当前第几页
      // showGoInput: true,   // 显示跳转到第多少页
       //showGoButton: true,  // 显示点击跳转的按钮
       // activeClassName: 'systemPagerActive',
       prevText: ' 上一页 ',
       nextText: ' 下一页 ',
       goButtonText: 'go',
       formatGoInput: '跳转到第 <%= input %> 页',
       className: 'paginationjs-small',

       //callback 每次翻页时的回调
       callback: function (response, pagination) {

       }
   };

   //$.pagination(container, options);

   container.addHook('beforeInit', function () {
       // 初始化的时候触发
       window.console && console.log('beforeInit...');
   });

   // 将配制转给分页容器
   container.pagination(options);

   container.addHook('beforePageOnClick', function (ement,page) {
	   if(id==27){
		   getZyzhxm("27",page,rows);
	   }else if(id==28){
		   
		   getFhxm("28",page,rows);
	   }else{
		   cutCAction(id,page,rows);
	   }
	   
       // 点击页码之前调用
       window.console && console.log('beforePageOnClick...');
       //return false
   });
   container.addHook('beforeRender', function (ement,page) {
       // 每次分页时会重新渲染分页条，渲染之前调用
       console.log("渲染之前触发");
   });
   container.addHook('beforePreviousOnClick', function (ement,page) {
	   if(id==27){
		   getZyzhxm("27",page,rows);
	   }else if(id==28){
		   
		   getFhxm("28",page,rows);
	   }else{
		   cutCAction(id,page,rows);
	   }
       console.log('点击上一页之前调用');
   });
   container.addHook('beforeNextOnClick', function (ement,page) {
	   if(id==27){
		   getZyzhxm("27",page,rows);
	   }else if(id==28){
		   
		   getFhxm("28",page,rows);
	   }else{
		   cutCAction(id,page,rows);
	   }
       console.log('点击下一页之前调用');
   });
   container.addHook('beforeGoButtonOnClick', function () {
       console.log('分页跳转按钮点击之前调用');
   });
	
	
}

function back10(){
	
	$('#temp_cont').show();
    $("#content_text").hide();

}

function setContent(id){	
	var cont="";       
    $.getJSON(baseUrl+"newtreeinfo/getObjectById?id="+id, function(bean){
    	cont+='<div class="text-box deteil-box">'+
              '<div class="text-title">'+bean.columns+'</div>'+bean.content+'</div>';	  
        $("#content_text").html(cont);
        $('#temp_cont').hide();
        $("#content_text").show();
    });     
}

getZyzhxm("27",page,rows);

//转移转化项目
function getZyzhxm(id,page,rows){
	
	$.getJSON(baseUrl+"newtreeinfo/getObjectListIsFbByPid?page="+page+"&rows="+rows+"&pid="+id, function(data){
		if(data.state){
			let list=data.list;
			var cont="";
			if(list.length>0){  
		            for(var i in list){
		            	var bean=list[i];
		        cont+='<a class="ad-item" href="javascript:void(0);" onclick="setContent1('+bean.id+')">'+
	                    '<div class="time-box">'+
	                        '<img src="'+bean.img+'">'+
	                    '</div>'+
	                    '<div class="ad-text">'+
	                        '<div class="title2">'+bean.columns+'</div>'+
	                        '<p class="overflow-2 overflow-4">'+bean.intro+'</p>'+
	                    '</div>'+
	                    '<div class="tips">'+
	                        '<span class="icon icon-more"></span>'+
	                    '</div>'+
	                  '</a>';
		            } 
			}else{
				cont+="没有发布的内容";
			}
			$("#data"+id+"Text").html(cont);
			
			getpage(id,page,data.totsize,rows)
		}
 
 });
}


getFhxm("28",page,rows);

//孵化项目
function getFhxm(id,page,rows){
	
	$.getJSON(baseUrl+"newtreeinfo/getObjectListIsFbByPid?page="+page+"&rows="+rows+"&pid="+id, function(data){
		if(data.state){
			let list=data.list;
			var cont="";
			if(list.length>0){  
		            for(var i in list){
		            	var bean=list[i];
		        cont+='<a class="ad-item" href="javascript:void(0);" onclick="setContent1('+bean.id+')">'+
	                    '<div class="time-box">'+
	                        '<img src="'+bean.img+'">'+
	                    '</div>'+
	                    '<div class="ad-text">'+
	                        '<div class="title2">'+bean.columns+'</div>'+
	                        '<p class="overflow-2 overflow-4">'+bean.intro+'</p>'+
	                    '</div>'+
	                    '<div class="tips">'+
	                        '<span class="icon icon-more"></span>'+
	                    '</div>'+
	                  '</a>';
		            } 
			}else{
				cont+="没有发布的内容";
			}
			$("#data"+id+"Text").html(cont);
			
			getpage(id,page,data.totsize,rows);
		}

});
}


function setContent1(id){	
	var cont="";       
    $.getJSON(baseUrl+"newtreeinfo/getObjectById?id="+id, function(bean){
    	cont+='<div class="text-box deteil-box"><div class="text-title">'+bean.subhead+'</div>'+bean.content+'</div>';	  
        $("#content_text").html(cont);
        $('#temp_cont').hide();
        $("#content_text").show();
    });     
}







