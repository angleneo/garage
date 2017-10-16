<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <ul>
        <li> <span class="search-box"><input type="text" placeholder="请输入配件名称" v-model="accname"></span></li>
        <li> <span class="search-btn" @click="searchpj">查找</span></li>
        <li> <span class="search-btn" @click="showadd">添加配件</span></li>
        <li><span class="search-btn" @click="changestatus">{{btnmsg}}</span></li>
      </ul>
    </div>
    <div  class="clearfix"></div>
    <!---------------以上搜索---------------------->
    <div class="adself" v-show="showaddpj">
      <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <form @submit.prevent="validateBeforeSubmitgx">
        <table   cellpadding="0" cellspacing="0">
          <tr>
            <td>* 配件名称：</td>
            <td>
              <Input  size="large" placeholder="请输入配件名称" style="width:300px;" v-model="zcj1"  v-validate="'required|max:20|min:2'"  name="配件名称"></Input>
              <p v-show="errors.has('配件名称')" style="color:red; position:absolute; margin-left:60px">{{ errors.first('配件名称') }}</p>
            </td>
            <td>* 数量：</td>
            <td><Input  size="large" placeholder="请输入采购数量" style="width:300px; position:relative" v-model="zcj2" v-validate="'required|numeric|max:12|min_value:0|min:1'" name="采购数量"></Input>
            <p v-show="errors.has('采购数量')" style="color:red; position:absolute; margin-left:60px">{{ errors.first('采购数量') }}</p>
            </td>
          </tr>

          <tr>
            <td>* 采购价格：</td>
            <td><Input  placeholder="请输入采购价" v-money style="width:300px; position:relative" v-model="zcj3" v-validate="'required|decimal:2|max:12|min:1'" name="采购价格" @on-blur="formatMoney"></Input>
            <p v-show="errors.has('采购价格')" style="color:red; position:absolute; margin-left:60px;" >{{ errors.first('采购价格') }}</p>
            </td>
            <td>* 销售价格：</td>
            <td><Input  size="large" placeholder="请输入销售价" style="width:300px; position:relative;" v-model="zcj4" v-validate="'required|decimal:2|max:12|min:1'"  name="销售价格"@on-blur="formatMoney2"></Input>
            <p v-show="errors.has('销售价格')" style="color:red; position:absolute; margin-left:60px;">{{ errors.first('销售价格') }}</p>
            </td>
          </tr>

          <tr>
            <td>配件品牌：</td>
            <td><Input  size="large" placeholder="请输入配件品牌(选填)" style="width:300px;" v-model="zcj5"></Input></td>
            <td>规格型号：</td>
            <td><Input  size="large" placeholder="请输入规格型号(选填)" style="width:300px;" v-model="zcj6"></Input></td>
          </tr>
        </table>
        <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;">点击确认</button>
        </form>
      </table>
    </div>
    <!-------------------工项列表---------------->
    <div class="order-box" style=" margin: -10px auto !important; padding-top:20px;">
    <div class="order-table">
      <table  cellpadding="0" cellspacing="0">
        <div class="tablebox" v-if="tablebg">
          <img src="../../assets/images/accessory-bg-icon.png">
        </div>
        <div class="tablebox" v-if="tablebg2">
           <span >当前无搜索结果</span>
        </div>
        <tbody>
        <tr>
          <th>序号</th>
          <th>配件名称</th>
          <th>配件品牌</th>
          <th>规格型号</th>
          <th>库存数量</th>
          <th>成本价格</th>
          <th>销售价格</th>
        </tr>
        <tr v-for="(car, item) in itemlists" :key="item">
          <td>{{(item+1) + (page-1) * pgSize}}</td>
          <td>{{car.productName}}</td>
          <td>{{car.productBrandName}}</td>
          <td>{{car.productCode}}</td>
          <td>
            <input type="text" 
              v-model="car.productStock" 
              :disabled="disabled" 
              class="searchinput" 
              v-validate="'required|numeric|max:8'"
              @blur="errors.clear()"
              @focus="itemlists.activeItem=item"
              name="库存数量">
            <span v-show="itemlists.activeItem===item && errors.has('库存数量')"
              style="color:red; position:absolute; margin-left:5px;font-size:12px;">{{ errors.first('库存数量') }}</span>
          </td>
          <td>
            <input type="text" 
              v-model="car.productSupplyPrice" 
              :disabled="disabled" class="searchinput" 
              v-validate="'required|decimal:2|max:8|min_value:0'"  
              @blur="errors.clear()"
              @focus="itemlists.activeItem=item"
              name="成本价格">
            <span v-show="itemlists.activeItem===item && errors.has('成本价格')" 
              style="color:red; position:absolute; margin-left:5px;font-size:12px;">{{ errors.first('成本价格') }}</span>
          </td>
          <td>
            <input type="text" 
              v-model="car.productSalePrice" 
              :disabled="disabled" 
              class="searchinput" 
              v-validate="'required|decimal:2|min_value:0'" 
              @blur="errors.clear()"
              @focus="itemlists.activeItem=item" 
              name="销售价格">
              <span v-show="itemlists.activeItem===item && errors.has('销售价格')" 
                style="color:red; position:absolute; margin-left:5px;font-size:12px;">{{ errors.first('销售价格') }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!----------------分页---------------------->
    <div class="padge-box-right"><Page :current="page" :total="pgAcount"  @on-change="change" show-elevator></Page></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/css/public.less';
  .adself{
    width:80%;
    margin:0 auto;
    padding:20px 0 10px;
    background:white;
    border:1px #fdedb1 solid;
    position:relative;
  table{
    width:80%;
    margin:10px auto;
  td{
    height:70px;
  }
  td:first-child{
    text-align:right;
  }
  td:nth-child(3){
    text-align:right;
  }
  }
  }
  .ivu-select-large .ivu-select-item {
    padding: 7px 16px 8px;
    font-size: 14px!important;
    width: 100%;
    text-align: center;
  }
  .vehicle-detail {
    text-align: left;
    background: #ffffff;
    line-height: 60px;
    border-radius: 10px;
    padding-left:40px;
    display: inline-block;
    width: 100%;
  }
  .vehicle-detail li{
    padding:0 10px;
    float: left;
  }
  .padge-box-right {
    width: 100%;
    text-align: right;
    display: inline-block;
    padding-right: 3%;
  }
  .order-box {
    padding:2% 0;
    width: 100% !important;
    height: auto !important;
    background: #ffffff;
    border-radius: 10px;/*
    padding-bottom: 20px;*/
    margin: 20px 0 !important;
  }
  .order-table{
    display: inline-block;
    margin-top: 0px;
    width: 100%;
    float: left;
    background:#fff;
    padding-bottom: 20px;
  }
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
  }
  .searchinput{
    width:100px;
    height:35px;
    line-height: 35px;
    border:1px solid lightgray;
    text-indent:5px;
    text-align: center;
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
<script>
import {acclists, accUpdateList, addonepj} from '@/service/access'
export default {
  data () {
    return {
      tablebg2: false,
      showaddpj: false,
      value: '',
      accname: '',
      btnmsg: '点击修改',
      itemupdatelist: [],
      itemlists: [],
      model1: '',
      disabled: true,
      pgAcount: 10,
      pgSize: 10,
      pgNum: 1,
      pjname: '',
      pjcount: '',
      cgprice: '',
      saleprice: '',
      cgbrand: '',
      cgcode: '',
      page: 1,
      tablebg: true,
      zcj1: '',
      zcj2: 0,
      zcj3: 0,
      zcj4: 0,
      zcj5: '',
      zcj6: '',
      list2: []
    }
  },
  mounted () {
    this.getAccessList()
  },
  methods: {
    formatMoney () {
      if (!this.zcj3) this.zcj3 = '0.00'
      else this.zcj3 = parseFloat(this.zcj3).toFixed(2)
    },
    formatMoney2 () {
      if (!this.zcj4) this.zcj4 = '0.00'
      else this.zcj4 = parseFloat(this.zcj4).toFixed(2)
    },
    showadd () {
      this.showaddpj = true
    },
    closeaddcar () {
      this.showaddpj = false
    },
    getAccessList (page = 1) {
      let pagestr = '?pageNum=' + page
      let params = {productName: this.accname}
      acclists(JSON.stringify(params), pagestr).then((res) => {
        this.itemlists = res.data.data.page
        this.pgAcount = res.data.data.totalCount
        if (this.itemlists[0]) {
          this.tablebg = false
        } else {
          this.tablebg = true
        }
      })
    },
    searchpj () {
      this.page = 1
      let pagestr = '?pageNum=' + this.page
      let params = {productName: this.accname}
      acclists(JSON.stringify(params), pagestr).then((res) => {
        this.itemlists = res.data.data.page
        this.pgAcount = res.data.data.totalCount
        if (this.itemlists[0]) {
          this.tablebg2 = false
        } else {
          this.tablebg2 = true
        }
      })
    },
    savepj () {
      let params = {brand: this.zcj5, model: this.zcj6, name: this.zcj1, quantity: this.zcj2, salePrice: this.zcj4, supplyPrice: this.zcj3}
      addonepj(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.success('添加成功！')
          this.showaddpj = false
          this.zcj5 = ''
          this.zcj1 = ''
          this.zcj2 = 0
          this.zcj3 = 0
          this.zcj4 = 0
          this.zcj6 = ''
          this.getAccessList()
        }
      })
    },
    change (page) {
      let pagestr = '?pageNum=' + page
      this.page = page
      let params = {productName: this.accname}
      acclists(JSON.stringify(params), pagestr).then((res) => {
        this.itemlists = res.data.data.page
        this.pgAcount = res.data.data.totalCount
      })
    },
    changestatus (item) {
      if (this.btnmsg === '点击修改') {
        this.btnmsg = '保存修改'
        this.disabled = false
      } else {
        this.btnmsg = '点击修改'
        this.disabled = true
        this.list2 = []
        for (let i = 0; i < this.itemlists.length; i++) {
          let param1 = {id: this.itemlists[i].productId, quantity: this.itemlists[i].productStock, salePrice: this.itemlists[i].productSalePrice, supplyPrice: this.itemlists[i].productSupplyPrice}
          this.list2.push(param1)
        }
        let params = this.list2
        accUpdateList(JSON.stringify(params)).then((res) => {
          this.getAccessList(this.page)
          this.itemupdatelist = []
        })
      }
    },
    validateBeforeSubmitgx () {
      this.$validator.validateAll({配件名称: this.zcj1, 采购数量: this.zcj2, 采购价格: this.zcj3, 销售价格: this.zcj4}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.savepj()
          return
        }
        this.$Message.error('请添加正确的配件信息!')
      })
    }
  }
}
</script>
