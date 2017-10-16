<template>
 <div class='report'>
    <section>
      <div class="history-box">
        <span> 历史单日最高业绩</span>
        <h1>￥{{historyTop | money1}}</h1>
      </div>
    </section>
    <section>
      <div class="performance">
        <img src="../../assets/images/performance-icon.png" >
        <span>当日业绩</span>
        <h1>￥{{todayTop | money1}}</h1>
      </div>
    </section>
 </div>
</template>
<script>
import {mapState} from 'vuex'
import {historyPerformance, todayTotal} from '@/service/home'
export default {
  data () {
    return {
      historyTop: '',
      todayTop: ''
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getHistory()
    this.getToday()
  },
  methods: {
    getHistory () {
      let params = {}
      historyPerformance(JSON.stringify(params)).then((res) => {
        this.historyTop = res.data.data
      })
    },
    getToday () {
      let params = {}
      todayTotal(JSON.stringify(params)).then((res) => {
        this.todayTop = res.data.data
      })
    }
  }
}
</script>
<style scope >
  .history-box h1 {
    line-height:34px;
    font-size: 32px;
    color: #fdcc10;
    padding-left: 55px;
  }
  .history-box span {
    line-height: 52px;
    font-size: 20px;
    color: #bf893f;
    padding-left: 55px;
  }
  .performance {
    width: 496px;
    height: 160px;
    background: rgba(255, 255, 255, 0.7);
    padding: 10px;
    margin: 20px 0;
    position: relative;
  }
  .performance img {
    position: absolute;
    top: 45px;
    left: 30px;
  }
  .performance h1 {
    line-height: 62px;
    font-size: 36px;
    color: #ee7c26 !important;
    padding-left: 55px;
  }
  .performance span {
    line-height: 52px;
    font-size: 20px;
    color: #ee7c26;
    padding-left: 55px;
  }
</style>
