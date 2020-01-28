//var baseUrl = "http://localhost:8080/brics/";
//var baseUrl = "http://192.168.1.122:8080/brics/";
var baseUrl = "http://localhost:8080/brics/";
$(function(){
  if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
    alert("您的浏览器版本过低，请下载IE9及以上版本");
  }
})

function toggleMenu(id){
	if($("#nav"+id).next().css("display") == 'none' || $("#nav"+id).next().css("display") == null){
		$("#nav"+id).next().css({"display":"block"})
	}else{
		$("#nav"+id).next().css({"display":"none"})
	}
}