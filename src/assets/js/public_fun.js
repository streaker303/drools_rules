export const Format = (time, fmt) => { //author: meizz
	var o = {
		"M+": time.getMonth() + 1, //月份
		"d+": time.getDate(), //日
		"h+": time.getHours(), //小时
		"m+": time.getMinutes(), //分
		"s+": time.getSeconds(), //秒
		"q+": Math.floor((time.getMonth() + 3) / 3), //季度
		"S": time.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;

}

function two(n) {
	return n < 10 ? '0' + n : '' + n;
}
export const getTime = (time, sp, istrue) => {
	var b;
	if(time==null){
		return '';
	}
	if(time.length == 10) {
		time = time + "000";
	}
	var a = parseInt(time);
	if(time == '') {
		b = new Date();
	} else {
		b = new Date(a);
	}
	var year = b.getFullYear();
	var mouth = b.getMonth() + 1;
	var day = b.getDate();
	var h = b.getHours();
	var m = b.getMinutes();
	var s = b.getSeconds();
	var c = year + sp + two(mouth) + sp + two(day);
	if(istrue) {
		c = c + " " + two(h) + ":" + two(m) + ":" + two(s);
		return c;
	} else {
		return c;
	}
}

export const get_deviceInfo = () => {
	var device = navigator.userAgent;
	if(device.match('Android')) {
		return 'android';
	} else if(device.match('iPhone')) {
		return 'iphone';
	} else {
		return 'pc';
	}
}
/*防止多次点击*/
var isclick = false;
export const isClick = (callBack) =>{
	if(isclick == false) {
		isclick = true;
		setTimeout(() => {
			isclick = false;
		}, 2000);
		callBack && callBack();
	}
}
/*设置储存的值*/
export const setsessionStorage = (keys, value) => {
	if(sessionStorage) {
		var jsom = sessionStorage['jsom'];
		var mp = {};
		if(jsom && jsom != '') {
			mp = JSON.parse(jsom);
		}
		mp[keys] = value;
		jsom = JSON.stringify(mp);
		sessionStorage['jsom'] = jsom;
	}
	return '';
}

/*删除储存的值*/
export const removesessionStorage = (keys) => {
	if(sessionStorage) {
		var jsom = sessionStorage['jsom'];
		if(jsom && jsom != '') {
			var mp = JSON.parse(jsom);
			var _mp = {};
			if(keys === undefined) {
				for(var i in mp) {
					if(i === '_key' || i === 'uname') {
						_mp[i] = mp[i];
					}
				}
			} else {
				for(var i in mp) {
					if(i !== keys) {
						_mp[i] = mp[i];
					}
				}
			}

			_mp = JSON.stringify(_mp);
			sessionStorage['jsom'] = _mp;
		}
		return '';
	}
}
export const setlocalStorage = (keys, value) => {
			if (localStorage) {
				var jsom = localStorage['jsom'];
				var mp = {};
				if (jsom && jsom != '') {
					mp = JSON.parse(jsom);
				}
				mp[keys] = value;
				jsom = JSON.stringify(mp);
				localStorage['jsom'] = jsom;
			} else {
				/*不支持sessionStorage*/
			}

		}
export const removelocalStorage = (keys) => {
		if (localStorage && localStorage['jsom'] != undefined) {
			var jsom = localStorage['jsom'];
			if (jsom && jsom != '') {
				var a = {};
				var mp = JSON.parse(jsom);
				for (var i in mp) {
					if (i != keys) {
						a[i] = mp[i];
					}
				}
				//mp[keys] = '';
				jsom = JSON.stringify(a);
				localStorage['jsom'] = jsom;
			}
		}
	}

export const getlocalStorage = (keys) => {
		if (localStorage && localStorage['jsom'] != undefined) {
				var jsom = localStorage['jsom'];
				if (jsom && jsom != '') {
					var mp = JSON.parse(jsom);
					if (mp[keys] && mp[keys] != '') {
						return mp[keys];
					} else {
						return "";
					}
				}
			} else {
				return "";
			}
	}


/*
 *获取url参数信息
 *name:参数名称
 */
export const getQueryString = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}
/*获取储存的值*/
export const getsessionStorage = (keys) => {
	if(sessionStorage && sessionStorage['jsom'] != undefined) {
		var jsom = sessionStorage['jsom'];
		if(jsom && jsom != '') {
			var mp = JSON.parse(jsom);
			if(mp[keys] && mp[keys] != '') {
				return mp[keys];
			} else {
				return "";
			}
		}
	} else {
		return "";
	}
}
const _typeOf = (obj) => {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
export const typeOf =_typeOf;
export const getObjectValue = function(obj, text) {
	try {
		if((_typeOf(obj) === 'object' || _typeOf(obj) === 'array') && text) {
			let textArray = text.split('.');
			let get_value = function(obj, textArray) {
				let key = textArray.shift();
				if(key.length < 5 && parseInt(key)) {
					key = parseInt(key);
				}
				if(typeof obj[key] == 'undefined' || obj[key] == null) {
					return '';
				}
				if(textArray.length == 0) {
					return obj[key];
				}
				obj = obj[key];
				return get_value(obj, textArray);
			}
			return get_value(obj, textArray);
		}
		return '';
	} catch(error) {
		console.log(error);
	}
}
export const nativeBack = function() {
	setTimeout(() => {
		try {
			window.webkit.messageHandlers.goBack.postMessage("");
		} catch(e) {
			window.android.goBack();
		}
	}, 1500)

}
export const hasClass = (el, className)=>{
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el, className)=>{
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export const removeClass = (el, className)=>{
  if (!hasClass(el, className)) {
    return
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}
export const uni = (arr)=>{
 let obj = {};
 let arr1 = [];
 for(let index=0;index<arr.length;index++){
 	let str = typeof arr[index] + arr[index];
 	if(!obj[str]){
 		obj[str] = true;
 		arr1.push(arr[index])
 	}
 }
 return arr1;
}

export const numChange=function(value){
	let num;
	if(value > 9999 && value < 99999999){//大于9999显示x.xx万
		num=(Math.floor(value/1000)/10);
	}else if( value > 99999999){
		num=(Math.floor(value/10000000)/10);
	}else if( value < 9999 && value>-9999){
		num=value
	}else if(value<-9999){//小于-9999显示-x.xx万
		num = -(Math.floor(Math.abs(value)/1000)/10);
	}
	return num;

}


