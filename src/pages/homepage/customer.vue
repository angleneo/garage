<template>
	<div class="customer-box">
    <div class="title-customer">客户满意度 <div class="triangle-top"></div> </div>

    <div class="c-list">
      <div class="tablebox" v-if="tablebg">
            <img src="../../assets/images/home-bg-customer.png">
      </div>
      <ul v-for="(cus, item) in customer" >
        <li v-if="item < 3">
          <div><h3>{{cus.serviceCarCode}}</h3><span> <Rate disabled v-model="cus.rank"></Rate></span></div>
          <div class="color-font">车型：{{cus.serviceCarModel}}{{cus.createTime}}</div>
          <div>工单时间：{{cus.serviceMantainTime}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {evaluation} from '@/service/home'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      tablebg: true,
      customer: []
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getcustomer()
  },
  methods: {
    getcustomer () {
      let params = {}
      evaluation(JSON.stringify(params)).then((res) => {
        this.customer = res.data.data.page
        if (this.customer[0]) {
          this.tablebg = false
        } else {
          this.tablebg = true
        }
      })
    }
  }
}
</script>
<style>
  .management .contentright .customer {
    width:98%;
    margin-top: 25px;
    position: relative;
  }
  
  .order-table table {
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
    margin-bottom: 20px;
    position: relative;
  }
  .tablebox{
    position:absolute;
    top:60px;
    left:0;
    width:100%;
    z-index:100;
    background:white;
  }
  .bxttable table {
    position:relative;
  }
</style>
