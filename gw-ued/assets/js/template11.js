var id=GetQueryString("id");


var page=1;
var rows=20;

$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
	var str="";
	var type=fbean.menuType;
	
	$("#temp_img").attr("src",fbean.maxImg);
	$("#index_title").html('- '+fbean.text);
	$("#index_icon").html('<span class="icon icon-'+type+'"></span>'+fbean.text);
	$("#index_icon").attr("onclick","back('template11.html?id="+id+"')");
	
	$.getJSON(baseUrl+"newtreeinfo/getObjectListIsFb?type="+type+"&pid=0", function(data){

		if(data.state){
			let list=data.list.children;
		  if(list.length>0){
              let menu="";
              let cont="";
			  for(var i in list){
				  var bean=list[i];
				  var cal="";
				  
				  var display="style='display: none'";
				  if(i==0){
				    	  cal+=" active ";
				    	  display="style='display: block'";
				  }
				      
				  if(bean.display=="竖排"&&bean.children.length>0){
				    	  cal+=" toggle-icon arrow-right";
				  }
				  menu+='<li><a data-id="toggle'+bean.id+'" id="nav'+bean.id+'" class="'+cal+'"'+
					'onclick="cutAction('+bean.id+')"  href="javascript:void(0);">'+bean.columns+'</a>';
					  
				  if(bean.display=="竖排"&&bean.children.length>0){
						  menu+=' <ul class="toggle"  id="toggle'+bean.id+'Tab" style="display:none;">';
						  for(var j in bean.children){
							  var cbean=bean.children[j];
							  var cal="";
							  if(i==0){
								  cal+='class="active"';
							  }
							  menu+='<li><a data-id="toggle'+cbean.id+'" id="snav'+cbean.id+'" '+
								            'onclick="cutTextAction('+bean.id+','+cbean.id+')" '+
								             cal+
									        'href="javascript:void(0);">'+cbean.columns+'</a></li>';
						  } 
						  menu+=' </ul>';  
						  setText(bean.id,bean.children);
				  } 
				  menu+='</li>';
				  
		           
				  if(bean.children.length<=0){
					  var temp1=' <div class="toggle-cont" '+display+' id="data'+bean.id+'">'+
					         '<div class="toggle-item"  >'+
					          '<div class="text-box no-index" id="data'+bean.id+'Text">'+
					        '</div>'+
					     ' </div>';
					  $("#togglebox").append(temp1);
					  $("#data"+bean.id+"Text").html(bean.content);
				  }
				  
				  if(bean.children.length>0&&bean.display=="横排"){
					  setCCRBProject(bean.id,bean.children);
				  }
				  
				  if(bean.children.length>0&&bean.display=="模块"){
					  setXbk(bean.id,bean.children);
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

});

function setXbk(id,lists){
	var type="";
	var mkcont="";
	if(id==6){
		type="xbk";
	}
	if(id==10){
		type="zlk";
	}

	var text="";
	for(var i in lists){
		var bean=lists[i];
		text+='<a class="ad-item" href="javascript:void(0)" onclick="searchContent(1,&quot;MK&quot;,&quot;'+bean.subhead+'&quot;,&quot;'+type+'&quot;,'+id+')"  style="height:430px;">'+
                 '<div class="time-box">'+
                   '<img src="'+bean.img+'">'+
                 '</div>'+
                 '<div class="ad-text">'+
                   '<div class="title2">'+bean.columns+'</div>'+
                   '<p class="">'+bean.intro+'</p>'+
                 '</div>'+
                '<div class="tips">'+
                   '<span class="icon icon-more"></span>'+
                '</div>'+
               '</a>';
	}
	$("#data"+id+"Text").html(text);
	
}


function setCCRBProject(id,lists){	
	var tab="";
	var text="";
	for(var i in lists){
		var bean=lists[i];
		var cal="";
		if(i==0){
			cal+='class="active"';
		}

		tab+='<li><a data-id="toggle'+bean.id+'"  id="cnav'+bean.id+'" onclick="cutTabAction('+id+','+bean.id+')" '+cal+'  href="javascript:void(0);">'+bean.columns+'</a></li>';
		text+='<div class="text-box no-index" id="tabData'+bean.id+'">'+bean.content+'</div>';
	}
	$("#toggle"+id+"Tab").html(tab);
	$("#toggle"+id+"Text").html(text);
	
}



function setText(id,lists){
	var str="";
	
	for(var i in lists){
		var bean=lists[i];
		
		str+='<div class="text-box no-index" style="display: none" id="data'+bean.id+'Text">'+bean.content+'</div>';
	}
	
	//console.log(str);
	
	$("#dataList"+id).html(str);
	
}



function cutAction(id){
	 $('#toggleNav li a').removeClass('active');
     $("#nav"+id).addClass('active');
     $("#nav"+id).next('.toggle').toggle();
     // 右侧内容做相应的改变
     
     $('#togglebox .toggle-cont').hide();
     
     
     $("#data"+id).show();
     $("#toggle"+id+"list").show();

}

function cutTabAction(pid,id){
	
	$('#toggle'+pid+'Tab li a').removeClass('active');
    $("#cnav"+id).addClass('active');
    //$("#cnav$"+id).next('.toggle').toggle();
    // 右侧内容做相应的改变
    
    //$('#togglebox .toggle-cont').hide();
    
  //  $("#data"+pid).show();
    
    $('#toggle'+pid+'Text .text-box').hide();
    
    $("#tabData"+id).show();
   


}


function cutTextAction(pid,id){
	// $('.deteil-nav li a').removeClass('active');
	 $('#toggleNav li a').removeClass('active');
	 $('#toggle'+pid+'Tab li a').removeClass('active');
     $("#snav"+id).addClass('active');   
     $('#togglebox .toggle-cont').hide();
     
     $("#data"+pid).show();
     // 右侧内容做相应的改变
     $('#dataList'+pid+' .text-box').hide();
    
     $("#data"+id+"Text").show();
}




function searchContent(page,t,m,tr,id){
	$("#kgyxbDiv").show();
	$("#data"+id).hide();
	
	
	var url="";
	if(t=="KJ"){
		var kgyxb_all=$("#"+id+"kgyxb_all").val();

		url=baseUrl+"kgyxbinfo/getObjectListByKj?name="+kgyxb_all+"&type="+tr+"&page="+page+"&rows="+rows;
	}else if(t=="FL"){
		var rsv1=tr;
		var rsv2=$("#"+id+"rsv2").val()!=null?$("#"+id+"rsv2").val():"";
		var rsv3=$("#"+id+"rsv3").val()!=null?$("#"+id+"rsv3").val():"";
		var rsv4=$("#"+id+"rsv4").val()!=null?$("#"+id+"rsv4").val():"";
		var rsv5=$("#"+id+"rsv5").val()!=null?$("#"+id+"rsv5").val():"";
		var rsv6=$("#"+id+"rsv6").val()!=null?$("#"+id+"rsv6").val():"";
		var rsv7=$("#"+id+"rsv7").val()!=null?$("#"+id+"rsv7").val():"";
		var rsv8=$("#"+id+"rsv8").val()!=null?$("#"+id+"rsv8").val():"";
		var rsv9=$("#"+id+"rsv9").val()!=null?$("#"+id+"rsv9").val():"";
		var rsv10=$("#"+id+"rsv10").val()!=null?$("#"+id+"rsv10").val():"";
		var rsv11=$("#"+id+"rsv11").val()!=null?$("#"+id+"rsv11").val():"";
		var rsv12=$("#"+id+"rsv12").val()!=null?$("#"+id+"rsv12").val():"";
		var rsv13=$("#"+id+"rsv13").val()!=null?$("#"+id+"rsv13").val():"";
		var rsv14=$("#"+id+"rsv14").val()!=null?$("#"+id+"rsv14").val():"";
		var rsv15=$("#"+id+"rsv15").val()!=null?$("#"+id+"rsv15").val():"";
		var rsv16=$("#"+id+"rsv16").val()!=null?$("#"+id+"rsv16").val():"";
		var rsv17=$("#"+id+"rsv17").val()!=null?$("#"+id+"rsv17").val():"";
		var rsv18=$("#"+id+"rsv18").val()!=null?$("#"+id+"rsv18").val():"";
		var rsv19=$("#"+id+"rsv19").val()!=null?$("#"+id+"rsv19").val():"";
		
		
		url=baseUrl+"kgyxbinfo/getObjectListByFl?type="+rsv1+"&rsv2="+rsv2+
		"&rsv3="+rsv3+"&rsv4="+rsv4+"&rsv5="+rsv5+"&rsv6="+rsv6+
		"&rsv7="+rsv7+"&rsv8="+rsv8+"&rsv9="+rsv9+"&rsv10="+rsv10+
		"&rsv11="+rsv11+"&rsv12="+rsv12+"&rsv13="+rsv13+"&rsv14="+rsv14+
		"&rsv15="+rsv15+"&rsv16="+rsv16+"&rsv17="+rsv17+"&rsv18="+rsv18+
		"&rsv19="+rsv19+"&page="+page+"&rows="+rows;
	}else if(t=="MK"){
		url=baseUrl+"kgyxbinfo/getObjectListByMk?type="+tr+"&model="+m+"&page="+page+"&rows="+rows;
	}
	$.getJSON(url, function(data){
	  	if(data.rows.length>0){
	  	  var num=(page-1)*parseInt(rows);
	      var list= data.rows;
	      var li="";
	     
	    	  for(var i in list){
		    	  var bean=list[i];
		    	  li+='<li>'+
                          '<a href="javascript:void(0)" onclick="openKgyxq(&quot;'+bean.details+'&quot;)">'+
                            '<span style="width:5%">'+(num+parseInt(i)+1)+'</span>'+
                            '<span style="width:15%">'+bean.name+'</span>'+
                            '<span style="width:10%">'+bean.num+'</span>'+
                            '<span style="width:40%">'+bean.description+'</span>'+
                            '<span style="width:20%">'+bean.model+'</span>'+
                            '<span style="width:10%">'+bean.state+'</span>'+
                          '</a>'+
                       '</li>';
		      } 
	         $("#kgyxbList").html(li);
	         getpage(id,page,data.total,rows,t,m,tr)
	  	}else{
	  		 li="未发现符合条件的记录!";
	  		 $("#kgyxbList").html(li);
	  	}
	});
}

function openKgyxqback(){
	
	$("#kgyxbDiv").show();
	$("#toggle_kgyxq").hide();
}

function openKgyxq(url){
	var back="<div class='back-btn'>"+
    "<a href='javascript:void(0);' onclick='openKgyxqback()'>返回</a>"+
    "</div>"
    var str="";
	var downFile="";
	if(url!=""&&url!="无"){
		var urlList=url.split(",");
		for(var i=0;i<urlList.length;i++){
			if(urlList[i].indexOf(".jpg") != -1||urlList[i].indexOf(".png") != -1||urlList[i].indexOf(".gif") != -1 ){
				str+="<img src='"+urlList[i]+"' /><br/><br/>";
			}else{
				var fileName=urlList[i].substr(urlList[i].lastIndexOf("/")+1,urlList[i].length);
				downFile+="<h2>附件下载：<a href='"+urlList[i]+"' >"+fileName+"</a></h2><br>";
				
			}
		}
	}else{
		str+="<h2>抱歉，此细胞暂无细胞详情</h2>";
	}
	
	$("#kgyxbDiv").hide();
	$("#kgyxq_file").html(downFile);
	$("#kgyxq_img").html(str);
	
	$("#kgyxbDiv").hide();
	$("#toggle_kgyxq").show();
}





function getpage(id,page,count,rows,t,m,tr){
	
	
	//searchContent(page,t,m,tr,id)
	
  var container = $('#kgyxbpagination');

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
	  searchContent(page,t,m,tr,id);
	   
      // 点击页码之前调用
      window.console && console.log('beforePageOnClick...');
      //return false
  });
  container.addHook('beforeRender', function (ement,page) {
      // 每次分页时会重新渲染分页条，渲染之前调用
      console.log("渲染之前触发");
  });
  container.addHook('beforePreviousOnClick', function (ement,page) {
	  searchContent(page,t,m,tr,id);
      console.log('点击上一页之前调用');
  });
  container.addHook('beforeNextOnClick', function (ement,page) {
	  searchContent(page,t,m,tr,id);
      console.log('点击下一页之前调用');
  });
  container.addHook('beforeGoButtonOnClick', function () {
      console.log('分页跳转按钮点击之前调用');
  });
	
	
}
