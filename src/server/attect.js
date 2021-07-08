import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import { Message,MessageBox } from 'element-ui';
import {
	setsessionStorage
} from '../assets/js/public_fun.js';
//import Vuex from '../store/index.js'

// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = '';
	axios.defaults.headers.post['Content-Type'] = 'application/json';
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
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
			  setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			} else {
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
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
			  setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			} else {
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}

// 获取列表
export const getDrools = (data) => {
	return axios.request({
		url: '/static/json/ruleList.json',
		method: 'get',
        params: data.queryData,
        data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

// 新建列表
export const buildDrools = (data) => {
	return axios.request({
		url:'api/manage/rule/saveRule',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

// 修改部署状态
export const modify_deployData = (data) => {
	return axios.request({
		url:'api/manage/rule/updateStatus',
		method: 'post',
		data: data,
	}).then(res => {
		console.log(res);
		return getAjax(res);
	})
}

export const modify_deployAllData = (data) => {
    return axios.request({
        url:'api/manage/rule/updateStatus',
        method: 'post',
        data: data,
    }).then(res => {
        console.log(res);
        return getAjax(res);
    })
}

// 删除单条数据
export const delete_singleData = (data) => {
	return axios.request({
		url:'api/manage/rule/deleteRule',
		method: 'post',
		data: data,
	}).then(res => {
		console.log(res);
		return getAjax(res);
	})
}

// reload
export const reloadData = (data) => {
	return axios.request({
		url:'api/manage/rule/reload',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

// 添加资源池
export const addResourcePool= (data) => {
	return axios.request({
		url: 'api/manage/resource/savePool',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
// 修改资源池
export const editResourcePool= (data) => {
	return axios.request({
		url: 'api/manage/resource/updatePool',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
// 添加资源
export const addResource= (data) => {
	return axios.request({
		url: 'api/manage/resource/saveResource',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
// 修改资源
export const editResource= (data) => {
	return axios.request({
		url: 'api/manage/resource/updateResource',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
// 查询资源池
export const selectResourcePool= (data) => {
	return axios.request({
		url: '/static/json/resourcePool.json',
		method: 'get',
		data: data,
	}).then(result => {
		console.log(result);
		return new Promise((resolve, reject) => {
			resolve(result.data);
		})
	})
}
//查询字段
export const get_fields= (data) => {
    return axios.request({
        url: '/static/json/field.json',
        method: 'get',
        data: data,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}
//规则继承
export const get_extendRules= (data) => {
    return axios.request({
        url: '/static/json/extendRule.json',
        method: 'get',
        params: data.queryData,
        data: data.paramsData,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}
// 查询资源
export const selectResource= (data) => {
	return axios.request({
		url: 'api/manage/resource/getResource',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return new Promise((resolve, reject) => {
			resolve(result.data);
		})
	})
}
// 删除资源池
export const deleteResourcePool= (data) => {
	return axios.request({
		url: 'api/manage/resource/deletePool',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
// 删除资源
export const deleteResource= (data) => {
	return axios.request({
		url: 'api/manage/resource/deleteResource',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

// 查询规则详情单条
export const get_one_rule= (data) => {
    return axios.request({
        url: 'api/manage/rule/getRuleById',
        method: 'post',
        data: data,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}

// 查询邮箱/短信人员
export const get_mail_users= (data) => {
    return axios.request({
        url: '/static/json/mail.json',
        method: 'get',
        data: data,
    }).then(result => {
        console.log(result);
        return getAjax(result);
    })
}
