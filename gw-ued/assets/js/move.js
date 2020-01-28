var scrollCount = 1, //每次滚动的条数
	speed =50, //滚动的速度
	displayCount = 1, //显示的条数
	delay = 2000; //延迟时间

var timer = null,
timeout = null;
json = null;
var box = document.getElementById('notice');
window.onload = function() {
	//复制出一份ul来填充,以达到无缝滚动
	box.innerHTML += box.innerHTML;

	//获取li的高度
	liHeight = box.getElementsByTagName('li')[0].offsetHeight;
	//获取div的初始高度
	divHeight = box.offsetHeight;
	//如果设置显示的条数超出了初始div的高度,将其设置为能显示的最大条数。
	//显示的条数不能小于1
	if (displayCount * liHeight > divHeight || displayCount < 1) {
		displayCount = Math.floor(divHeight / liHeight); //默认值
	}
	//每次滚动的条数不能大于可见条数
	if (displayCount < scrollCount) {
		scrollCount = displayCount;
	}

	//根据显示的条数，设置显示区div的高度
	box.style.height = divHeight - (Math.floor(divHeight / liHeight) - displayCount) * liHeight + 'px';
	//开始滚动
	setTimeout('startMove()', delay);
	//鼠标移入停止滚动
	box.onmouseover = function() {
		clearInterval(timer);
		clearTimeout(timeout);
	}
	//鼠标移出继续滚动
	box.onmouseout = function() {
		startMove();
	}

}

function startMove() {
	box.scrollTop++;
	timer = setInterval(function() {
		//每次滚动指定条数后间歇一段时间
		if (box.scrollTop % (scrollCount * 32) == 0) {//这个地方是li的高度
			clearInterval(timer);
			timeout = setTimeout('startMove()', delay);
		} else {
			box.scrollTop++;
			//当整个ul的内容显示完,让scrollTop回到初始状态
			if (box.scrollTop >= box.scrollHeight / 2) {
				box.scrollTop = 0;
			}
		}
	}, speed);
}
