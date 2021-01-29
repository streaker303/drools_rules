<template>
	<div class="btn_box" @click="searchBtn">
		<button class="btn">
            <p>{{title}}</p>
		</button>
	</div>
</template>

<script>
export default {
  name: 'CancleBtn',
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    searchBtn() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
	.btn {
		padding: 0;
		margin: 0;
		border: none;
		outline: none
	}

	.btn_box {
		cursor: pointer;
		display: inline-block;
	}

	.btn_box+.btn_box {
		margin-left: 10px;
	}

	.btn {
		position: relative;
		width: 80px;
		height: 30px;
		box-sizing: border-box;
		background: url(./images/cancleBg.png) no-repeat 100%;
		color: #fff;
		font-size: 14px;
		font-family: "微软雅黑";
		pointer-events: none;
		/*穿透效果*/
        
        p{
            width: 80px;
            text-align: center;
            line-height: 30px;
            font-size:14px;
            color:#fff;
        }
	}
</style>
