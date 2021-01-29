<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	html,
	body,
	#app {
		height: 100%;
		background-color: #010205;
		min-width: 1200px;
		// background-color: #e2e5ee;
		// background-color: #000;
		background-image:url(./assets/img/BG.jpg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 150%;
	}
	.el-main {
		padding: 0!important;
	}
	.el-header {
		padding: 0;
	}
	.header-top {
		background: #fff;
		padding: 15px 0 15px 20px;

		.el-breadcrumb {
			line-height: 24px;
		}
	}

	.fly-table-wrapper {
		background-color: #fff;
		margin: 20px;
		padding: 0 20px;
	}
	.el-step__main{
		overflow: hidden;
	}
	.el-step__description{
		width: 100%;
	}
	.logo{
		color: #fff;
		padding: 0 0 0 15px;
		line-height: 28px;
		img{
			// float: left;
			margin-right: 10px;
			vertical-align: -7px
		}
	}
	.form-inline{
		.el-form-item__content{
			display: inline-block;
		}
		.el-input{
			width: 60%;
		}
	}
	.el-form .form-inline .el-form-item__label{
		width: 60px;
	}
	.el-table .el-tag{
		margin: 3px;
	}
	.el-upload-list{
		width: 40%;
	}
	.el-drawer{
		overflow-y: auto!important;
	}
</style>
