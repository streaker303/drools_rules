<template>
    <div class="btn_box" @click="searchBtn">
        <div class="btn_inner_box">
            <p>{{title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBtn',
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
    width:80px;
    display: inline-block;
    height:30px;
    line-height: 30px;

    background-image: url(./images/searchBg.png);
    background-repeat: no-repeat;
    background-position: right 0;
    background-size:100% 30px;
}
.btn_inner_box{
    cursor:pointer;
    height:30px;
    
    p{
        width: 80px;
        text-align: center;
        line-height: 30px;
        font-size:14px;
        color:#fff;
    }
}
</style>
