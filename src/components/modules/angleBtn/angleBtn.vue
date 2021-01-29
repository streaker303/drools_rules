<template>
  <div class="btn_box" @click="searchBtn">
    <div class="ub ub-ac btn_inner_box">
        <i v-if="icon!=''"  :class="icon"></i>
        <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AngleBtn',
  props: {
    title: {
      type: String,
      default: ''
    },
     icon: {
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
    searchBtn(){
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
.ub {
  display: -webkit-box!important;
  display: -moz-box!important;
  display: -ms-flexbox!important;
  display: -o-box!important;
  display: box!important;
  position: relative;
}
.ub-ac {
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -o-box-align: center;
  box-align: center;
}
.btn_box{
    min-width:50px;
    width:auto;
    display: inline-block;
    padding-left: 8px;
    height:34px;
    background-image: url(./images/Operation_left.png);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size:9px 34px;
}
.btn_inner_box{
  cursor:pointer;
  height:34px;
  background-image: url(./images/Operation_right.png);
  background-repeat: no-repeat;
  background-position: right 0;
  background-size:auto 34px;

  i{
    font-size:14px;
    color:#86adca;
    transition: all .3s;
  }
  span{
    margin:0 10px 0 0;
    font-size:14px;
    color:#86adca;
    transition: all .3s;
  }
}
.btn_inner_box:hover{
  i{
    color:#38caf3;
  }
  span{
    color:#38caf3;
  }
}
</style>
