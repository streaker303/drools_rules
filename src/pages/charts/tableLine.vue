<template>
    <div ref="myEcharts" class="echarts"></div>
</template>

<script>
export default {
    name: 'tableLine',
    props: ['dataX', 'dataY'],
    data() {
        return {
        
        }
    },
    mounted() {
        var fontColor = '#30eee9';
        // var xdata = []; //x轴
        // var dataArr = [];
        // var dataName = [];
        // console.log('this.chartData',this.chartData)
        //
        // this.chartData.date.forEach(item=>{
        //     xdata.push(item);
        // })
        // this.chartData.data.forEach(item=>{
        //     dataArr.push(item);
        //     dataName.push(item.name);
        // })
        let option = {
    
            /*legend: {
                bottom: 10,
                left: 'center',
                data: ['香料香精']
            },*/
            tooltip: {
                show: false,
                /*trigger: 'item',
                position: 'left'*/
                /*axisPointer: {
                    type: 'cross'
                }*/
            },
    
            xAxis: [{
                /*gridIndex: 0,
                show: true,*/
                type: 'category',
                boundaryGap: false,
                data: this.dataX,
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
            },
    
            ],
            yAxis: [{
                gridIndex: 0,
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitNumber: 1,
                name: '',
               /* nameLocation: 'center',
                nameRotate: 360*/
        
            },
            ],
            grid: [
                {
                    bottom: '8%',
                    left: '2%',
                    height: '80%'
                }
            ],
            series: [{
                type: 'line',
                data: this.dataY,
                smooth: true,
                symbol: 'none',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: '#00fffc'
                    }, {
                        offset: 0,
                        color: 'rgba(0,255,252,0)'
                    }]),
                },
                itemStyle: {
                    normal: {
                        color: '#00ffe4',
                        lineStyle: {
                            color: '#00ffe4',
                            width: 1
                        },
                    }
                },
            }
            ]
        };
        
        var myChart = echarts.init(this.$refs.myEcharts);
        myChart.setOption(option);
    }
}
</script>

<style scoped lang="scss">
.echarts {
    width: 100%;
    height: 100%;
}
</style>
