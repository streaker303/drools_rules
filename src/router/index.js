import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 const VueRouterReplace = Router.prototype.replace;
	Router.prototype.replace = function replace (to) {
	  return VueRouterReplace.call(this, to).catch(err => err)
	}
const errorPage = () =>
	import('@/pages/error.vue');
const home = () =>
	import('@/pages/home.vue');
/*cep 规则相关路由*/
const cep_show = () =>
	import('@/pages/cep_show.vue')
const new_rules_type = () =>
	import('@/pages/new_rules_type.vue')
const resource_list = () =>
    import('@/pages/resource_list.vue')
const simulation = () =>
    import('@/pages/simulation_data.vue')
const alarm_type_config = () =>
    import('@/pages/alarm_type_config.vue')
const voice_set = () =>
    import('@/pages/voice_set.vue')
const attack_results = () =>
    import('@/pages/attack_results.vue')

export default new Router({
	routes: [{
			path: '/',
			redirect: '/home/rule'
		},
		{
			path: '/error',
			name: 'error',
			component: errorPage,
			meta: {
				title: '系统出错了'
			}
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			children: [
                {
                    path: 'cep_show',
                    name: 'cep_show',
                    component: cep_show,
                    meta: {
                        title: '分析规则列表'
                    }
                },
				{
					path: 'rule',
					name: 'new_rules_type',
					component: new_rules_type,
					meta: {
						title: '分析规则管理'
					}
				},
                {
                    path: 'resource_list',
                    name: 'resource_list',
                    component: resource_list,
                    meta: {
                        title: '资源池管理'
                    }
                },
                {
                    path: 'simulation',
                    name: 'simulation',
                    component: simulation,
                    meta: {
                        title: '模拟数据'
                    }
                },
                {
                    path: 'voice_set',
                    name: 'voice_set',
                    component: voice_set,
                    meta: {
                        title: '告警提示音配置'
                    }
                },
                {
                    path: 'attack_results',
                    name: 'attack_results',
                    component: attack_results,
                    meta: {
                        title: '攻击结果'
                    }
                },
                {
                    path: 'alarm_type_config',
                    name: 'alarm_type_config',
                    component: alarm_type_config,
                    meta: {
                        title: '告警类型管理'
                    }
                },

			]
		},
	]
})
