<template>
	<div class="navMenu">

		<template v-for="navMenu in navMenus">
			<!-- 最后一级菜单 -->
			<el-menu-item class="last" v-if="!navMenu.menus" :key="navMenu.modular" :data="navMenu" :index="navMenu.url">
				<!-- navMenu.url===null ? navMenu.modular : navMenu.url -->
				<i :class="navMenu.iconName"></i>
				<span slot="title">{{navMenu.resourceName}}</span>
			</el-menu-item>

			<!-- 此菜单下还有子菜单 -->
			<el-submenu v-if="navMenu.menus" :key="navMenu.modular" :data="navMenu" :index="navMenu.modular">
				<template slot="title">
					<i :class="navMenu.iconName"></i>
					<span> {{navMenu.resourceName}}</span>
				</template>
				<!-- 递归 -->
				<NavMenu :navMenus="navMenu.menus"></NavMenu>
			</el-submenu>
		</template>

	</div>
</template>

<script>
	export default {
		name: 'NavMenu',
		props: ['navMenus'],
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style>
</style>
