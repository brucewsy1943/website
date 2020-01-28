

var id=GetQueryString("id");

var rows=6;
getObject(1);
function getObject(page){
	
	$.getJSON(baseUrl+"menuinfo/getObjectById?id="+id, function(fbean){
		var str="";
		var type=fbean.menuType;
		
		$("#temp_img").attr("src",fbean.maxImg);
		$("#index_title").html('- '+fbean.text);
		$("#index_icon").html('<span class="icon icon-'+type+'"></span>'+fbean.text);
		$("#index_icon").attr("onclick","back('template7.html?id="+id+"')");
		if(GetQueryString("cid")!=null){
			var cid=GetQueryString("cid");
			setContent(cid);
		}else{
		$.getJSON(baseUrl+"newsinfo/getObjectListIsFb?page="+page+"&rows="+rows+"&type="+type, function(data){
			if(data.state){
			  
			  let list=data.list;
			  if(list.length>0){
				       for(var index in list){
				    	   let bean=list[index];
				    	   str+='<a class="news-item clearfix" href="javascript:void(0);"  onclick="setContent('+bean.id+')">'+
					            '<img src="'+bean.img+'">'+
					            '<div class="right">'+
					            '<div class="title2">'+bean.title+'</div>'+
					            '<p >'+bean.intro+'</p>'+
					            '</div>'+
					            '</a>';
				       }
			  }else{
				  str+='没有发布的内容';
			  }
			  
			}else{
				str+='数据库异常，请联系系统管理员';
			}
			
			$("#temp_cont").html(str);
			getpage(page,rows,data.totsize);
			
		});
		
		}
		
	});

}




function setContent(id){
	
	var cont="";
	
	$("#page_index").attr("class","page index");
	
    $.getJSON(baseUrl+"newsinfo/getObjectById?id="+id, function(bean){
    	cont+='<div class="text-box deteil-box">'+
              '<div class="text-title">'+bean.title+'</div>'+bean.content+'</div>';	  
        $("#temp_cont").html(cont);
    }); 
    $("#paginationid").hide();
    
    

}





function getpage(page,pagesize,rows){
	
	 var container = $('#paginationid');

    var sources = function () {
        var result = [];

        for (var i = 1; i <=rows; i++) {
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


        pageSize: pagesize,     // 默认显示几个页码，每页的条目数
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
    	getObject(page);
        // 点击页码之前调用
        window.console && console.log('beforePageOnClick...');
        //return false
    });
    container.addHook('beforeRender', function (ement,page) {
        // 每次分页时会重新渲染分页条，渲染之前调用
        console.log("渲染之前触发");
    });
    container.addHook('beforePreviousOnClick', function (ement,page) {
    	getObject(page);
        console.log('点击上一页之前调用');
    });
    container.addHook('beforeNextOnClick', function (ement,page) {
    	getObject(page);
        console.log('点击下一页之前调用');
    });
    container.addHook('beforeGoButtonOnClick', function () {
        console.log('分页跳转按钮点击之前调用');
    });
	
	
}








