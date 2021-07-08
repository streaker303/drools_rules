import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import { Message,MessageBox } from 'element-ui';
//import Vuex from '../store/index.js'
import { setsessionStorage } from '../assets/js/public_fun.js';
// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = '';//带重点
	// axios.defaults.baseURL = 'http://10.1.225.74:10001/';
	axios.defaults.headers.post['Content-Type'] = 'application/json';//'application/x-www-form-urlencoded';
	axios.defaults.timeout = 60000;
}
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)

    if (start == -1) {
        return null;
    }

    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }

    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
axios_config();
var getAjax = result => {
	return new Promise((resolve, reject) => {
		console.log('result',result);
		if((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data.data);
		} else {
			if(result.data.code == 2){//请求成功但流程不对
				Message({
			          message: result.data.message,
			          type: 'warning'
			        });
			}else if(result.data.code == 9999){
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			}else if(result.data.code == 9005){
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
			  setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			}else{
				Message({
		          message: result.data.message,
		          type: 'warning'
		        });
			}
			reject(result.data);
		}
	})
}
var getAjaxSome = result => {
	return new Promise((resolve, reject) => {
		if((typeof result.data.code !== 'undefined' && result.data.code == 1) ) {
			resolve(result.data);
		} else {
			if(result.data.code == 2){//请求成功但流程不对
				Message({
			          message: result.data.message,
			          type: 'warning'
			        });
			}else if(result.data.code == 9999){
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			}else if(result.data.code == 9005){

				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
			   setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			}else{
				Message({
		          message: result.data.message,
		          type: 'warning'
		        });
			}
			reject(result.data);
		}
	})
}
var getAjaxFile = result => {
	// console.log(result)
	return new Promise((resolve, reject) => {
		if(result.status == 200 ) {
			resolve(result.data);
		} else {
			if(result.data.code == 2){//请求成功但流程不对
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}else if(result.data.code == 9999){
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			}else if(result.data.code == 9005){
				if (document.getElementsByClassName('el-message').length === 0) {
					Message({
						message: '登录已失效，请重新登录！',
						type: 'warning'
					});
				}
				setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			}else{
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}
// export const add_device = (data) => 	{
// 	console.log(data)
// 	return axios.request({
// 		url: 'api/manage/attackshow/db/addIPMapper',
// 		method: 'post',
// 		params: data.queryData,
// 		data: data.paramsData,
// 	}).then(result => {
// 		console.log(result)
// 		return getAjax(result);
// 	})
// }
//系统列表
export const get_menu = (data) => {
	return axios.request({
		url: 'api/manage/permission/getMenu',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjaxSome(result);
	})
}

// 告警类别--规则
export const get_alarm_type_rule = (data) => {
    return axios.request({
        url: '../../../static/json/alarmType.json',
        method: 'get',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
// 告警类型
export const get_alarm_type = (data) => {
    return axios.request({
        url: 'api/manage/alarmType/get',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
export const save_alarm_type = (data) => {
    return axios.request({
        url: 'api/manage/alarmType/save',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}

export const delete_alarm_type = (data) => {
    return axios.request({
        url: 'api/manage/alarmType/delete',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
//提示音
// ip映射
export const add_voice = (data) => 	{
    console.log(data)
    return axios.request({
        url: 'api/manage/warnSound/save',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
//获取映射列表
export const get_voice = (data) => {
    return axios.request({
        url: 'api/manage/warnSound/getAllWarnSound',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
//获取映射列表
export const edit_voice = (data) => {
    return axios.request({
        url: 'api/manage/warnSound/save',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
export const delete_voice = (data) => {
    return axios.request({
        url: 'api/manage/warnSound/delete',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
export const get_voice_level = (data) => {
    return axios.request({
        url: 'api/manage/warnSound/getLevel',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
// 规则-获取攻击结果
export const get_rule_attack_result = (data) => {
    return axios.request({
        url: '../../../static/json/attackResult.json',
        method: 'get',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
// 规则--资产下拉
export const getAssetsSelect = (data) => {
    return axios.request({
        url: '../../../static/json/assetSelect.json',
        method: 'get',
        data: data,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}
// 规则--标签
export const getSubjectLabel = (data) => {
    return axios.request({
        url: '../../../static/json/label.json',
        method: 'get',
        data: data,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}
// 模拟数据
export const releaseRuleForm = (data) => {
    return axios.request({
        url: 'api/manage/cep/sendData',
        method: 'post',
        data: data,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}
// 攻击结果
export const get_attack_results = (data) => {
    return axios.request({
        url: 'api/manage/attackResult/get',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
export const save_attack_results = (data) => {
    return axios.request({
        url: 'api/manage/attackResult/save',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
export const delete_attack_results = (data) => {
    return axios.request({
        url: 'api/manage/attackResult/delete',
        method: 'post',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result)
        return getAjax(result);
    })
}
