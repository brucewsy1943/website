

var net_id;


function getDataSAndlinkS(id,xAxis_is_show,yAxis_is_show,bgColor){
	
	
	  $.getJSON("../../echarts_ement/getObjectListBtid?tid="+id, function (data) {
		  if(data.status){
			  var list=data.list;
			  var datas=[];
			  var links=[];
			  
			  for(var i=0;i<list.length;i++){
				  var bean=list[i];
				  var size=(bean.symbolSize!=null&&bean.symbolSize!="")?bean.symbolSize.split(","):"50,50";
				  var font_show=(bean.font_show!=null&&bean.font_show=="true")?true:false;
				  var fontSize=(bean.font_size!=null&&bean.font_size!="")?parseInt(bean.font_size):12;
				  var font_color=(bean.font_color!=null&&bean.font_color!="")?bean.font_color:"#000";
				  var position=(bean.font_position!=null&&bean.font_position!="")?bean.font_position:'';
				  datas.push(
						  {
						      num:bean.num,
						      name: bean.name,
						      rsv5:bean.rsv5,
						      symbol : 'image://'+bean.symbol,
						      symbolSize: [parseInt(size[0]),parseInt(size[1])],
						      value: [parseFloat(bean.x_value), parseFloat(bean.y_value)],
						      opacity : 1,
						      label: {
						          normal: {
						              show: font_show,
						              position:position,
						              textStyle: {
						                  fontSize: fontSize,
						                  color:font_color,
						              },
						            
						          }
						      },
						  }	  
				  );
				  
			
				  if(bean.link_source!=null&&bean.link_source!=""&&bean.link_target!=""&&bean.link_target!=null){
					  var link_source=bean.link_source.split(",");
					  var link_target=bean.link_target.split(",");
					  var link_color=bean.link_color!=""?bean.link_color:"#000";
					  var link_width=bean.link_width!=""?parseFloat(bean.link_width):1;
					  var link_type=bean.link_type!=""?bean.link_type:"solid";
					  var link_curveness=bean.link_curveness!=""?parseFloat(bean.link_curveness):0;
					  var rsv4=bean.rsv4!=""?parseFloat(bean.rsv4):0;
					  
					
					  var  effect={symbolSize: rsv4 };
					  
					  var lineStyle={ //==========关系边的公用线条样式。
			                    normal : {
			                        color : link_color,
			                        width : link_width,
			                        type : link_type, //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
			                        curveness : link_curveness, //线条的曲线程度，从0到1
			                        opacity : 1
			                    // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
			                    },
			                    
			                };
					  
					  
			
					  links.push([{
			                coord: [parseFloat(link_source[0]),parseFloat(link_source[1])],
			            }, {
			                coord: [parseFloat(link_target[0]),parseFloat(link_target[1])],
			     		    effect:effect,
			                category: 0, //箭头的级别，0 箭头先走
			                lineStyle : lineStyle,
			            }]);
					  
					  if(bean.rsv1!=""&&bean.rsv1!=null){
						  link_target=bean.rsv1.split(",");
						  links.push([{
				                coord: [parseFloat(link_source[0]),parseFloat(link_source[1])],
				            }, {
				                coord: [parseFloat(link_target[0]),parseFloat(link_target[1])],
				     		    effect:effect,
				                category: 0, //箭头的级别，0 箭头先走
				                lineStyle : lineStyle,
				            }]);
					  }
					  
					  if(bean.rsv2!=""&&bean.rsv2!=null){
						  link_target=bean.rsv2.split(",");
						  links.push([{
				                coord: [parseFloat(link_source[0]),parseFloat(link_source[1])],
				            }, {
				                coord: [parseFloat(link_target[0]),parseFloat(link_target[1])],
				     		    effect:effect,
				                category: 0, //箭头的级别，0 箭头先走
				                lineStyle : lineStyle,
				            }]);
					  }
					  
					  if(bean.rsv3!=""&&bean.rsv3!=null){
						  link_target=bean.rsv3.split(",");
						  links.push([{
				                coord: [parseFloat(link_source[0]),parseFloat(link_source[1])],
				            }, {
				                coord: [parseFloat(link_target[0]),parseFloat(link_target[1])],
				     		    effect:effect,
				                category: 0, //箭头的级别，0 箭头先走
				                lineStyle : lineStyle,
				            }]);
					  }
				  }
			  
			  
			  }
			  
			  if (net_id != null && net_id != "" && net_id != undefined) {
				  net_id.dispose();
			    }
			 
			  net_id=echarts.init(document.getElementById("net_id"));
			  var option=setOption(id,bean.name,xAxis_is_show,yAxis_is_show,bgColor,datas,links);
			  
			 
			  net_id.setOption(option); 
			
			  var bindEChcartsContextMenu = function(ec){
					
					/*
					 
					 这里占用了 mouseover 和  mouseout 事件，如果已经绑定了这两个事件的话，
					 只需要把 currentItem 赋值的代码放在事件中即可
					 
					 */
					var currentItem = null;
					 
			        ec.on("mouseover",function(pItem){
			        	currentItem = pItem;
			        	return false;
			        	//console.log("mouseover");
			        });
			        ec.on("mouseout",function(pItem){
			        	currentItem = null;
			        });
			        
			        window.document.onclick = function(){
			        	hideMenu()
			        }
			        
			        document.oncontextmenu=function(event){
						if(currentItem){
							//currentItem 的右键菜单；
							showMenu(event,currentItem);
						}
						return false;
					}
				}
				
				//显示菜单 这里随便写一个
				var showMenu = function(event,item){
					var menu = document.getElementById("menuBox");
					menu.style.display = "block";
					menu.style.left = event.zrX+20+"px";
					menu.style.top = event.zrY+20+"px";
					menu.getElementsByClassName("menuTitle")[0].innerHTML = item.data.name;
					//menu.getElementsByClassName("menuTitle")[1].innerHTML = item.data.rsv20;
					$('#menu_span').html(item.data.rsv5);
					
				}
				var hideMenu = function(){
					document.getElementById("menuBox").style.display = "none";
				}
			   bindEChcartsContextMenu(net_id);
		  }
	  });
	  
	
	
	
}








function setOption(id,name,xAxis_is_show,yAxis_is_show,bgColor,datas,links){
	//console.log("links:"+JSON.stringify(links));

	var option = {
			
    backgroundColor: bgColor,
	xAxis: {
	  show: xAxis_is_show,   //横坐标是否显示   开发时建议设置为true
	  type: 'value' //横坐标上的数值    开发时建议设置为true
	},
	yAxis: {
	  show: yAxis_is_show,   //竖坐标是否显示
	  type: 'value' //竖坐标上的数值
	},
	
	 toolbox: { 
	    	 show: true,
	    	 x:50,
             y:5,
             itemSize:30,
             itemGap:20,
	    	 feature: {
	    
               
          
           myTool0: {
               show: true,
               title: '刷新',
               icon: 'image://../../Source/img/shuaxin.png',
               onclick: function (){
            	   window.location.reload();
               }
           },
           myTool1: {
               show: true,
               title: '预览',
               icon: 'image://../../Source/img/yulan.png',
               onclick: function (){
                   window.open('graph_preview.html?id='+id);
               }
           },
           saveAsImage: {//保存图片
               show: true,
               
             },
       
    
	        }
     },
	series: [{
	
	  type: 'graph',
	  layout: 'force',
	  coordinateSystem : 'cartesian2d',//坐标系可选

	  focusNodeAdjacency: false,
	  roam: true,
	  draggable: false,
	  xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
	  yAxisIndex : 0, //y轴坐标 

	 /*
	  force: {
	      repulsion: 2000,
	      layoutAnimation:false,
	      //edgeLength :100,
	  },
      */
	  label: {
	      normal: {
	          show: true,
	          textStyle: {
	              fontSize: 12,
	              color:'#000'
	              
	          },
	      }
	  },
	  data: datas,
	},
	 {
        type: 'lines',   //图表类型 lines 线
        coordinateSystem: 'cartesian2d',
        effect:{
                show: true,
                symbo:'arrow',
                period: 5,
                color: '#3385FF',
                trailLength: 0.1,// 运动轨迹  
                symbolSize: 0,   //箭头大小
                shadowBlur:2
              },
        /*
		   effect: {
         show: true,
         symbo:'arrow',
         period: 20,
         color: '#ffff00',
         trailLength: 0.1,// 运动轨迹  
         symbolSize: 0,   //箭头大小
         shadowBlur:10
       },
       */
  
     
     data: links
	 }
	]

	};
	
	return option;
	
}

  

  
  