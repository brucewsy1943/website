
//选中校验方法
function checkDelEdit(selectRows,oper){
  	   if (selectRows.length < 1) {  
 	        $.messager.alert("提示消息", "请选择要"+oper+"的记录！", 'info');
 	        return false;  
 	    } 
 	    if (selectRows.length > 1 && oper == "修改") {  
 	        $.messager.alert("提示消息", "您每次只能修改一条数据！", 'info');
 	        return false;  
 	    }
 	    var re = /^[0-9]+.?[0-9]*$/;
 	 	var wp_id = selectRows[0].id;
 	    if (!re.test(wp_id)) { 
 	        $.messager.alert("提示消息", "没有可"+oper+"的记录！", 'info');
 	        return false;  
 	    }
 	    return true;
     }
//获取弹出修改框div节点
var editDiv = $("#editDiv");

//获取弹出修改框form节点
var editForm = $("#editForm");

//按钮提交的方法
function formsubmit(){
	
	/*if(GetQueryString("id")!=null){
		var id=GetQueryString("id");
		document.getElementById("tid").value=id;
	}
	
	*/
	
	$("#editForm").form('submit', {
         url: $("#editForm")[0].action,
         success: function (data) {
      	   var jsonObj = eval('(' + data + ')');
             if(jsonObj.status){
          	   $.messager.alert("提示消息", jsonObj.msg, 'info');
                 $("#dg").treegrid('reload');
                 $("#editDiv").window('close');
             }else{
                 $.messager.alert("提示消息", jsonObj.msg,'error');
                 $("#editDiv").window('close');
                 
             }
         }
     });
 }




//单笔新增的方法
function add(subUrl){
	  /* alert("没有进来吗？");*/
	   $("#editDiv").dialog({
			title: "新增信息",
			modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
		});
	   $("#min_img_div").html('');
	   $("#editForm").form('clear');
	   $("#editForm").attr('action',subUrl); 
	   
	   
	   $("#editForm").find('input,textarea,select').attr('disabled',false);//取消完全禁用
	   $("#editDiv").dialog('open');
}


//单笔修改的方法
function edit(subUrl){
	var selectRows = $("#dg").datagrid("getSelections");//获取的是数组，多行数据
	if(!checkDelEdit(selectRows,"修改")){
	   return;
   }
	$("#editDiv").dialog({
		title: "修改信息",
		modal : true,// 模拟弹出对话框，添加mask层，弹出后，背景变灰色
	});
	$("#editForm").form('clear');
	var wp_id = selectRows[0].id;
	$("#editForm").attr('action',subUrl+"?id="+wp_id); 
	$("#editForm").form('load', selectRows[0]);
	$("#editDiv").dialog('open');
	if(selectRows[0].maxImg!=""&&selectRows[0].maxImg!=null){
		var str="";
		  var val=selectRows[0].maxImg.split(",");
		  for(var v in val){
			  str+= "<img src='"+val[v]+"' style='width:32px;height:32px;'/>";
		  }
		$("#min_img_div").html(str);
	}
}
 
//批量删除方法 
 function del(subUrl){
	   var selectRows = $("#dg").datagrid("getSelections");//获取的是数组，多行数据

	   if(!checkDelEdit(selectRows,"删除")){
		   return;
	   }
	   var deleteArray = new Array();
	   for (var i = 0; i < selectRows.length; i++) {  
		   deleteArray[i] = selectRows[i].id;  
      }

	    //如果选中行了，则要进行判断  
	    $.messager.confirm("确认消息", "确定要删除所选的"+selectRows.length+
	    		"条记录吗？", function (isDelete) {
	    	if (!isDelete) {  
               return;  
           }

           $.post(subUrl+'?ids=' + deleteArray, function (jsonObj) {
               if (jsonObj.status) {  
                   $.messager.alert('提示', '成功删除选中的记录！');  
                   $("#dg").treegrid("reload"); //删除成功后 刷新页面  
               } else {  
                   $.messager.alert('提示信息', '删除失败，请联系管理员！', 'warning');  
               }  
           }, "json");

	    });
  }
 
 function ref(){
	 $("#dg").treegrid("reload");
 }
 