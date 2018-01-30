function $(selector,context){
	//拿到第一个字符
	selector = selector.trim();  // 去除前后空格
	if(!context){  // 如果context没有接受任何值，contex为document
		context = document;
	}
	if(selector.indexOf(" ") !== -1){  // 判断是有空格，交给querySelectorAll处理
		return context.querySelectorAll(selector);
	}
	var firstChar = selector.charAt(0);
	if(firstChar === '#'){  // id获取
		// 截取字符串一部分
		return document.getElementById(selector.slice(1));
	}else if(firstChar === '.'){  // className获取
		return context.getElementsByClassName(selector.slice(1))
	}else{ //tagName
		return context.getElementsByTagName(selector);
	}
}
function css(element,prop,value){
	// 判断argumnets的length
	if(arguments.length>2){
		// 设置
		element.style[prop] = value;
	}else{
		// 获取
		return parseFloat(getComputedStyle(element)[prop]);
	}
}
/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}
function mTween(element,attr,target,d,fx,callback){	
	var now = Date.now();  // 开始运动的时间
	var b = parseFloat(getComputedStyle(element)[attr]);  // 起始位置
	var c = target - b; //总距离
	fx = fx || 'linear'; //运动形式
	clearInterval(element.timer);
	element.timer = setInterval(function (){
		var t = Date.now() - now; //已过去时间		
		if( t >= d ){
			t = d;
			clearInterval(element.timer);
			element.timer = null;
		}
		element.style[attr] = Tween[fx](t, b, c, d) + 'px';	
		if(t == d){
			typeof callback === 'function' && callback();
		}
	},4)

};
function shake(element,attr,fudu,callback){
	if(element.shakeTimer){
		return;
	}
	var arr = [];
	for( var i = fudu; i >= 0; i-=5 ){
		
		arr.push(i,-i)
	}

	arr.push(0);  // 保证最后一位是0

	var n = 0;
	var l = parseFloat(getComputedStyle(element)[attr]);  // 现获取到原来的位置

	clearInterval(element.shakeTimer);
	element.shakeTimer = setInterval(function (){
		n++;
		element.style[attr] = l + arr[n] + 'px';
		if( n >= arr.length-1 ){
			clearInterval(element.shakeTimer);
			element.shakeTimer = null;
			callback();
		}
		
	},30)	
}



function mTween(element,attrObj,duration,fx,callback){
	// 要算出来每一个样式的起始位置和总距离
	// 循环对象attrObj，算出每一个用时的起始位置和总距离

	var beginObj = {}; // 每一个样式的起始位置
	var countObj = {}; // 每一个样式的总距离
	for(var attr in attrObj){
		beginObj[attr] = parseFloat(getComputedStyle(element)[attr]);
		// 每一个样式要运动的的总距离
		countObj[attr] = attrObj[attr] - beginObj[attr];
	}

	// 开始运动的时间
	var startTime = Date.now();

	fx = fx || 'linear';

	clearInterval(element.timer);
	element.timer = setInterval(function (){
		// 已过去时间
		var t = Date.now() - startTime;

		if(t >= duration){
			t = duration;
			clearInterval(element.timer);
		}

		// 循环传过来的对象,要运动的是对象的key值这个样式

		for(var prop in attrObj){

			//判断属性是不是改变透明读的样式名
			if(prop === 'opacity'){
				element.style[prop] = Tween[fx](t,beginObj[prop],countObj[prop],duration);
			}else{
				element.style[prop] = Tween[fx](t,beginObj[prop],countObj[prop],duration) + 'px';
			}
			
		}
		if(t === duration){
			typeof callback === 'function' && callback();
		}

	},4)
}

function addZero(n){
				return n < 10 ? '0'+n : n;
		}

//===========================数据处理
function getDateById(id){
		if(data[id]){
			return data[id]
		}

		return null;
	}

function getChildsById(id){  // id 父id
	var arr = [];
	for(var attr in data){
		if(data[attr].pid == id){
			arr.push(data[attr])
		}
	}

	return arr;
}
//——————给一个ID可以找到这个id元素,利用data自定义属性id
positionElement(0);
function positionElement(positionId){
	var content_left = $(".content_left")[0];
	var treeDivs = content_left.getElementsByTagName("div");
	// 给一个id，我给这个id对应的div添加样式
	for( var i = 0; i < treeDivs.length; i++ ){
		treeDivs[i].classList.remove('active');
		if(treeDivs[i].dataset.id == positionId){
			treeDivs[i].classList.add("active");
		}
	}
}
// 找到指定id的祖先数据，一直找到最顶层
function getParentsById(id){
	var arr = [];
	for(var attr in data){
		if(data[attr].id == id){
			arr.push(data[attr]);
			// 传入父级的id，getParentsById返回是这个id的父级数据，
			// 使用concat把指定id的数据和父数据练级起来
			// 返回的是新数组，arr重新赋值这个新数组
			arr = arr.concat(getParentsById(data[attr].pid));
			break;
		}
	}
	return arr;
}	
// 找到指定id所有的子孙数据 包括自身
function getChildsAllById(id){
	var arr = [];
	// 找到要删除数据本身
	var item = getDateById(id);
	arr.push(item);
	for(var attr in data){
		if(data[attr].pid == id){
			//arr.push(data[attr]);
			arr = arr.concat(getChildsAllById(data[attr].id))
		};
	};
	return arr;
};
// 删除包含指定id自身
function deleteChildsAllById(id){
	var childsAll = getChildsAllById(id);
	for( var i = 0; i < childsAll.length; i++ ){
		
		//console.log(data[childsAll[i].id]);
		if(data[childsAll[i].id]){
			delete data[childsAll[i].id];
		}
		
	}
}
//===========================碰撞函数
function collision(obj1,obj2){
	var obj1Rect = obj1.getBoundingClientRect();	
	var obj2Rect = obj2.getBoundingClientRect();	
	if(obj1Rect.right < obj2Rect.left || obj1Rect.bottom < obj2Rect.top || obj1Rect.left > obj2Rect.right || obj1Rect.top > obj2Rect.bottom){
		return false;
	}else{
		return true;
	};
};
//===========================cookie
function setCookie(key,value,n){
	// n为0，已经设置了过期时间，设置cookie的那一刻是过期时间，停留一下就过期了
	if(n){
		let d = new Date();
		d.setDate(d.getDate()+n);
		document.cookie = key+'='+value+"; expires="+d.toUTCString();
	}else{
		document.cookie = key+'='+value;
	}
}

function getCookie(key){
	let cookies = document.cookie;
	cookies = cookies.split('; ');
	for( var i = 0; i < cookies.length; i++ ){
		let arr = cookies[i].split('=');
		if(arr[0] === key){
			return arr[1];
		}
	}
}

function removeCookie(key){
	//删除cookie
	setCookie(key,null,-1)	
}