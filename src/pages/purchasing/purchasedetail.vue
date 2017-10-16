<template>
  <div class="edit-order" >
    <div class="purchase-details">
      <ul>
        <li class="color-orange">订单号:{{purchasid}}</li>
        <li><span class="color-green-on">● 采购状态：{{cgdxq.status | purchastatus}}</span></li>
        <li><span>供应商：</span>{{cgdxq.supplierName}}</li>
        <li><span>结算方式：</span>{{cgdxq.payType | statementType}}</li>
        <li><span>单据时间：</span>{{cgdxq.creatTime}}</li>
        <li><span>收货时间：</span>{{cgdxq.arrivalTime}}</li>
        <li><span>合计采购数量：</span><span class="color-red">{{cgdxq.totalCount}}</span></li>
        <li><span>实际收货数量：</span><span class="color-red">{{cgdxq.actotalCount}}</span></li>
      </ul>
    </div>
    <!------------------------------>
    <!-------------------工项列表---------------->
      <div class="table-header">采购清单: 总计:<span style="color:red;">{{moneycount | money}}</span>元</div>
    <div class="order-box">
      <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <th>序号</th>
            <th>配件名称</th>
            <th>规格型号</th>
            <th>品牌</th>
            <th>采购数量</th>
            <th>已收货数量</th>
            <th>采购单价</th>
            <th>合计</th>
          </tr>
          <tr v-for="(pj, item) in cgdlists" :key="item">
            <td>{{item+1}}</td>
            <td>{{pj.name}}</td>
            <td>{{pj.model}}</td>
            <td>{{pj.brand}}</td>
            <td>{{pj.quantity}}</td>
            <td>
            <form @submit.prevent="validateBeforeshouhuo">
              <input type="text" 
                class="searchinput" 
                v-model="pj.quantityReceived" 
                :disabled="dis" 
                v-validate="'required|numeric|max:9|min_value:0'"  
                name="已收货数量" 
                @focus="cgdlists.activeItem=item"
                @blur="blursh(item)">
              <span v-show="cgdlists.activeItem===item && errors.has('已收货数量')" 
              style="color:red;z-index:999;">{{ errors.first('已收货数量') }}</span>
            </form>
            </td>           
            <td>{{pj.price | money}}</td>
            <td>{{pj.quantityReceived * pj.price | money}}</td>
          </tr>
           <tr >
              <td style="padding-right:10px;border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px;color:red;" colspan="9" >总计:<span>{{moneycount | money}}</span>元</td>
           </tr>
          </tbody>
        </table>
      </div>
      <div class="com-mcen">
        <div class="complete01" @click="receipt" v-show="showbtn">确认收货</div>
      </div>
    </div>
  </div>
</template>
<script>
import {purchasedetail, receivepurch} from '@/service/purchas'
export default {
  data () {
    return {
      purchasid: '111',
      cgdlists: [],
      cgdxq: '',
      cgarr: [],
      dis: false,
      showbtn: false
    }
  },
  computed: {
    moneycount () {
      let sum = 0
      for (let i = 0; i < this.cgdlists.length; i++) {
        sum += this.cgdlists[i].quantityReceived * this.cgdlists[i].price
      }
      return sum
    }
  },
  mounted () {
    this.getPurchdetail()
  },
  methods: {
    getPurchdetail () {
      this.purchasid = this.$route.params.id || this.$route.query.id
      let params = this.purchasid
      purchasedetail(params).then((res) => {
        if (res.data.result === 0) {
          this.cgdxq = res.data.data.purchaseVO
          this.cgdlists = res.data.data.purchaseLineList
          for (let i = 0; i < this.cgdlists.length; i++) {
            this.pjcount = this.pjcount + this.cgdlists[i].totalAmount
          }
          if (this.cgdxq.status === 6) {
            this.dis = true
            this.showbtn = false
          } else if (this.cgdxq.status === 5) {
            this.dis = false
            this.showbtn = true
          }
        }
      })
    },
    blursh (item) {
      this.$validator.reset()
      if (this.cgdlists[item].quantityReceived > this.cgdlists[item].quantity) {
        this.$Message.warning('已收货数量不可大于采购数量!')
        this.cgdlists[item].quantityReceived = ''
      } else {
      }
    },
    receipt (item) {
      this.purchasid = this.$route.params.id || this.$route.query.id
      this.cgarr = []
      for (let i = 0; i < this.cgdlists.length; i++) {
        let params1 = {id: this.cgdlists[i].id, quantityReceived: this.cgdlists[i].quantityReceived}
        this.cgarr.push(params1)
      }
      let params = {purchaseLineList: this.cgarr, purchaseVO: {id: this.purchasid}}
      receivepurch(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.success('收货成功！')
          this.getPurchdetail()
        }
      })
    },
    validateBeforeshouhuo () {
      this.$validator.validateAll({已收货数量: this.pj.quantityReceived}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.blur()
          return
        }
        this.$message.warning('请添加正确的工项价格！')
      })
    }
  }
}
</script>
<style scoped>
  .com-mcen{
    margin: 100px auto;
    text-align: center;
    width: 300px;
    clear: both;
  }
  .searchinput {
    width: 100px;
    height: 35px;
    border: 1px solid lightgray;
    text-indent: 5px;
    text-align: center;
  }
  .searchinput-red {
    width: 100px;
    height: 35px;
    border: 1px solid red;
    text-indent: 5px;
    text-align: center;
    color:red;
  }
  .edit-order {
    width: 99% !important;
    margin: 0 !important;
    margin-top: 20px !important;
    text-align: left;

  }
  .table-header{
    width:15%;
    height:40px;
    line-height:40px;
    font-size:18px;
    border-radius:20px 20px 0 0;
    background:#fdedb1;
    text-align: right;
    padding-right: 30px;
    margin-top: 20px;
  }
  .order-box {
    width:100% !important;
    height: auto !important;
    border-radius: 10px;
    padding-bottom: 20px;
    margin:0px 0 !important;
    background: #ffffff;
  }
  .order-table {
    display: inline-block;
    margin-top:0px!important;
    width: 100%;
    float: left;
  }
  .purchase-details{
    background:#fff;
    width:100%;
    display: inline-block;
    -webkit-border-radius:10px;
    -moz-border-radius:10px;
    border-radius:10px;
  }
  .purchase-details ul{
    width:75%;
    margin-left:40px;
  }
  .purchase-details li{
    float: left;
    width:40%;
    font-size:16px;
    line-height:50px;
  }
  .color-red{
    color:#ef282a;
    font-size: 20px;
    font-weight: bold;
  }
  .color-orange{
    color:#f3a340;
    font-size: 26px !important;
    font-weight: bold;
  }
  .color-green-on{
    color:#3da577;
    font-size: 20px;
    font-weight: bold;
  }
  .color-red-on{
    color:#ef282a;
    font-size: 20px;
    font-weight: bold;
  }
  .purchase-title{
    background:#fdedb1;
    font-size:20px;
    width:160px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    line-height: 42px;
    margin-bottom: -20px;
    margin-top: 20px;
  }

  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
  }

</style>
