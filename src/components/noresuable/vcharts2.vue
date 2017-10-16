<template>
	<div style="min-width:550px;height:375px;margin:0 auto;">
		<div id="myChart" :style="{minWidth: '550px', height: '375px',margin:'0 auto'}"></div>
	</div>
</template>
<script>
import {todMonthTotal} from '@/service/home'
export default {
  data () {
    return {
      text: '汽车',
      xaxis: [],
      seri: []
    }
  },
  mounted () {
    this.getmonthmoney()
  },
  methods: {
    getmonthmoney () {
      let params = {}
      todMonthTotal(JSON.stringify(params)).then((res) => {
        this.xaxis = res.data.data.xTags
        this.seri = res.data.data.amounts
        const drawLinemonth = () => {
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          myChart.setOption({
            color: ['#f3a340'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: this.xaxis,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '月营业额(元)',
                type: 'bar',
                barWidth: '60%',
                data: this.seri
              }
            ]
          })
        }
        drawLinemonth()
      })
    }
  }
}
</script> 