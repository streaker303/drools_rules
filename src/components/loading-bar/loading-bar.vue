<template>
    <transition name="fade">
        <div :class="classes" :style="outerStyles" v-show="show">
            <div :class="innerClasses" :style="styles"></div>
        </div>
    </transition>
</template>
<script>
//    import { oneOf } from '../../utils/assist';

    const prefixCls = 'ivu-loading-bar';

    export default {
        props: {
//            percent: {
//                type: Number,
//                default: 0
//            },
            color: {
                type: String,
                default: 'primary'
            },
            failedColor: {
                type: String,
                default: 'error'
            },
            height: {
                type: Number,
                default: 2
            },
//            status: {
//                type: String,
//                validator (value) {
//                    return oneOf(value, ['success', 'error']);
//                },
//                default: 'success'
//            },
//            show: {
//                type: Boolean,
//                default: false
//            }
        },
        data () {
            return {
                percent: 0,
//                color: 'primary',
//                failedColor: 'error',
//                height: 2,
                status: 'success',
                show: false
            };
        },
        computed: {
            classes () {
                return `${prefixCls}`;
            },
            innerClasses () {
                return [
                    `${prefixCls}-inner`,
                    {
                        [`${prefixCls}-inner-color-primary`]: this.color === 'primary' && this.status === 'success',
                        [`${prefixCls}-inner-failed-color-error`]: this.failedColor === 'error' && this.status === 'error'
                    }
                ];
            },
            outerStyles () {
                return {
                    height: `${this.height}px`
                };
            },
            styles () {
                let style = {
                    width: `${this.percent}%`,
                    height: `${this.height}px`
                };

                if (this.color !== 'primary' && this.status === 'success') {
                    style.backgroundColor = this.color;
                }

                if (this.failedColor !== 'error' && this.status === 'error') {
                    style.backgroundColor = this.failedColor;
                }

                return style;
            }
        }
    };
</script>
<style scoped>
	.ivu-loading-bar {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2000
}

.ivu-loading-bar-inner {
	-webkit-transition: width .2s linear;
	transition: width .2s linear
}

.ivu-loading-bar-inner-color-primary {
	background-color: #2d8cf0
}

.ivu-loading-bar-inner-failed-color-error {
	background-color: #ed3f14
}
</style>