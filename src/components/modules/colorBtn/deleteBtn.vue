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
    name: 'deleteBtn',
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
    height:30px;
    line-height: 30px;
    opacity:0.9;
    
    background-image: url(./images/deleteBg.png);
    background-repeat: no-repeat;
    background-position: right 0;
    background-size:100% 30px;
}
.btn_box:hover {
    opacity: 1;
}
.btn_inner_box{
    cursor:pointer;
    height:30px;
    
    i{
        font-size:14px;
        color:#fff;
        transition: all .3s;
    }
    span{
        margin:0 10px 0 0;
        font-size:14px;
        color:#fff;
        transition: all .3s;
    }
}

</style>
