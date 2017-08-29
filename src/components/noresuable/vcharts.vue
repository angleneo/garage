<template>
	<div style="min-width:550px;height:375px;margin:0 auto;">
		<div id="myChart" :style="{minWidth: '550px', height: '375px',margin:'0 auto'}"></div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      text: '汽车'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#fdcc10'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            data: ['7/20', '7/21', '7/22', '7/23', '7/24', '7/25', '7/26'],
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
            name: '日营业额',
            type: 'bar',
            barWidth: '60%',
            data: [20, 32, 40, 54, 32, 380, 150]
          }
        ]
      })
    }
  }
}
</script> 