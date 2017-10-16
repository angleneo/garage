<template>
  <div class='addparts' >
    <section class="addpjbox">
      <div class="car-title">
        <img src="../../assets/images/02-icon.png" alt=""><h3>添加配件/工项</h3>
      </div>
      <accessories></accessories>
    </section>
      <!-- 添加配件总表 -->
   
  </div>
</template>
<script>
import accessories from '../../components/resuable/accessories'
export default {
  components: {
    accessories
  },
  data () {
    return {
      modal2: false,
      modal_loading: false,
      modal3: false,
      bxtts: [
        {bxtname: '变速箱油', specation: 'ATF-LLL', brand: '百希特', usedcount: '10', existing: '5', price: '12'},
        {bxtname: '变速齿轮', specation: 'ATC-LLL', brand: '百希特', usedcount: '10', existing: '2', price: '5'},
        {bxtname: '霜之哀伤', specation: 'ATF-LLL', brand: '百希特', usedcount: '10', existing: '12', price: '22'}
      ],
      bt: [],

      bxtparts: [],
      addgxs: [
      {parstname: '洗车', specification: '工时', brand: '百希特', partscount: '10', unitprice: '15'},
      {parstname: '内饰清洗', specification: '工时', brand: '百希特', partscount: '10', unitprice: '15'}
      ],
      amount: '10'
    }
  },
  methods: {

  },
  watch: {
    getTablelist () {
      this.bxtparts = this.$store.state.bxtsinfo
    }
  }
}
</script>

