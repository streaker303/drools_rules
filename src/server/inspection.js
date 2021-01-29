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

//规则组接口
export const get_rule_tree = (data) => {
	return axios.request({
		url: 'http://localhost:8093/static/json/ruleTree.json',
		method: 'get',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

export const add_rule_group = (data) => {
	return axios.request({
		url: 'api/manage/rule/saveRuleType',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const delete_rule_group = (data) => {
	return axios.request({
	    url: 'api/manage/rule/deleteRuleType',
        method: 'post',
		data: data
	}).then(result => {
		console.log('result',result)
		return getAjax(result);
	});
}






