<template>
  <div class="access">
    <div class='addbtn'>
        <ul >
        <li><button :class='{complete:activebtn}' class="parst" @click="addpj" :disable="disa">{{btns[0].name}}</button></li>
        <li><button :class='{complete:activebtn1}' class="parst" @click="addzcj">{{btns[1].name}}</button></li>
        <div class='clearfix'></div>
          </ul>
      </div>
    <section class='addtable'>

  <div class="adpj"  v-show="showpj">
    <div class="arrow"></div>
      <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>

      <div class="statusbtn">
      <ul>
        <li> <Input  placeholder="请输入配件名称" style="width: 210px;" v-model="pjname"  size="large"></Input></li>
        <li>
        </li>
        <li><button class="search-btn" @click="searchpjlist">点击搜索</button></li>
        <div class="clearfix"></div>
      </ul>
      </div>

       <table cellspacing="0" cellpadding="0">
          <tr>
            <th>配件名称</th>
            <th>规格型号</th>
            <th>品牌</th>
            <th>现存数量</th>
            <th>采购数量</th>
            <th>价格</th>
          </tr>
          <tr v-for="(bxt, item) in bxtts" :key="item">
            <td>{{bxt.productName}}</td>
            <td>{{bxt.productModel}}</td>
            <td>{{bxt.productBrandName}}</td>
            <td>{{bxt.productStock}}</td>
            <td>
              <button :disabled="bxt.count<=0" style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="redu(item)">-</button>
              <input type="text" disabled='disabled' v-model="bxt.count" style="background:white;width:100px;height:30px;border:1px solid lightgray;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="addu(item)">+</button></td>
            <td>{{bxt.productSupplyPrice}}</td>
          </tr>
       </table>
        <Page :total="currentpage" v-show="pageshow" :page-size="pagen" :current="pagenumber" @on-change="changepage"></Page>
       <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;" @click="addpjlist">确认添加</button>
   </div>

      <!-- 添加配件 -->
      <div class="adself" v-show="showzcj">
        <div class="arrow"></div>
      <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <form @submit.prevent="validateBeforeSubmitsearch">
        <table   cellpadding="0" cellspacing="0">
          <tr>
            <td>* 配件名称：</td>
            <td>
              <Input name="配件名称" size="large" placeholder="请输入配件名称" style="width:300px;" v-model="zcj1"  v-validate="'required|max:20|min:1'"></Input>
              <p v-show="errors.has('配件名称')" style="color:red; position:absolute; margin-left:60px">{{ errors.first('配件名称') }}</p>
            </td>
            <td>* 采购数量：</td>
            <td><Input  size="large" placeholder="请输入采购数量" style="width:300px; position:relative" v-model="zcj2" v-validate="'required|numeric|max:8|min:1'" name="采购数量"></Input>
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
        <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;" >确认添加</button>
        </form>
      </div>


     </section>
      <section class="bxttable">
      <div class="table-header">采购清单: 总计:<span style="color:red;">{{pjcount}}</span>元</div>
      <form @submit.prevent="validateBeforeSubmitpj">
      <table   cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>分类</th>
          <th>名称</th>
          <th>规格型号</th>
          <th>品牌</th>
          <th>数量</th>
          <th>配件单价</th>
          <th>配件合计</th>
          <th>操作</th>
        </tr>

        <tr v-for="(bxt, item) in bxtparts" :key="item">
          <td>{{item+1}}</td>
          <td>配件</td>
          <td>{{bxt.productName}}</td>
          <td>{{bxt.productModel}}</td>
          <td>{{bxt.productBrand}}</td>
          <td>
            <button :disabled="bxt.productQuantity<=1" style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reduceone(item)">-</button>
            <input type="text" disabled='disabled' v-model="bxt.productQuantity" style="background:white;width:100px;height:30px;border:1px solid lightgray;">
            <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increase(item)">+</button></td>
          <td>
            <Input v-model="bxt.productPrice" 
              @on-blur="blurparts(item)"
              @on-focus="bxtparts.activeItem=item"
              style="width:100px;height:30px;background:white" 
              v-validate="'required|decimal:2|max:9|min_value:0'" name="单价"></Input>
            <p v-show="bxtparts.activeItem===item && errors.has('单价')" style="color:red; position:absolute; margin-left:30px;">{{ errors.first('单价') }}</p>
          </td>
          </td>
          <td>{{bxt.totalAmount}}元</td>
          <td @click="setToDel(item)" style="color:lightgray;cursor:pointer"><Icon type="trash-a" size="18" ></Icon>删除
          </td>
        </tr>
        <tr >
          <td style="padding-right:10px;border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px;color:red;" colspan="9" >总计:<span>{{pjcount}}</span>元</td>
        </tr>
      </table>
    </form>
      <!-- 删除弹出的模态框 -->
      <Modal v-model="modal2" width="400">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>将删除配件</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer" style="width:100%; text-align:center;">
                <Button type="error" size="large" :loading="modal_loading" @click="del()" >删除</Button>
                <Button size="large" @click="modal2 = false" >取消</Button>
            </div>
        </Modal>
    </section>
      <div class="com-mcen">
        <div class="complete01" @click="comlateorder">提交采购单</div>
      </div>
  </div>
</template>
<script>
import {acclists, addonepj} from '@/service/access'
import {addpurchase, addcgd, purchaseUpdate} from '@/service/purchas'
export default {
  props: ['msg'],
  data () {
    return {
      modal2: false,
      modal_loading: false,
      modal3: false,
      model1: '',
      value1: '',
      pjname: '',
      gxname: '',
      peopelpay: '',
      disa: false,
      pageshow: false,
      currentpage: 10,
      pgacount: '',
      btns: [
        {name: '库存已有配件'},
        {name: '新增采购配件'},
        {name: '工项'}
      ],
      bxtts: [],
      bt: [],
      bxtparts: [],
      btnact: true,
      btnno: false,
      activebtn: false,
      activebtn1: false,
      showpj: false,
      showzcj: false,
      showgx: false,
      pjcount: 0,
      totalmoney: '',
      zcj1: '',
      zcj2: 0,
      zcj3: 0,
      zcj4: 0,
      zcj5: '',
      zcj6: '',
      pjid: '',
      lists2: [],
      fatherlist: '',
      delItem: -1,
      pagen: 5,
      pagenumber: 1
    }
  },
  computed: {
  },
  mounted () {
    this.getCachedOrder()
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
    searchpjlist () {
      this.pagenumber = 1
      let params = {productName: this.pjname}
      let pagestr = '?pageNum=' + this.pagenumber + '&pageSize=' + this.pagen
      acclists(JSON.stringify(params), pagestr).then((res) => {
        this.bxtts = res.data.data.page
        this.currentpage = res.data.data.totalCount
        if (this.currentpage > 5) {
          this.pageshow = true
        } else {
          this.pageshow = false
        }
      })
    },
    getCachedOrder () {
      addcgd('{}').then((res) => {
        this.bxtparts = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.bt = []
        this.showpj = false
      })
    },
    changepage (page) {
      this.pagenumber = page
      let params = {productName: this.pjname}
      let pagestr = '?pageNum=' + this.pagenumber + '&pageSize=' + this.pagen
      acclists(JSON.stringify(params), pagestr).then((res) => {
        this.bxtts = res.data.data.page
        this.currentpage = res.data.data.totalCount
        if (this.currentpage > 5) {
          this.pageshow = true
        } else {
          this.pageshow = false
        }
      })
    },
    addpjlist () {
      this.$validator.reset()
      for (let i = 0; i < this.bxtts.length; i++) {
        if (this.bxtts[i].count > 0) {
          let params = {
            productId: this.bxtts[i].productId,
            productName: this.bxtts[i].productName,
            productBrand: this.bxtts[i].productBrand,
            productPrice: this.bxtts[i].productSupplyPrice,
            productQuantity: this.bxtts[i].count,
            productModel: this.bxtts[i].productModel
          }
          this.bt.push(params)
        }
      }
      let params = {ownServiceProductList: this.bt}
      addcgd(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.bt = []
        this.showpj = false
      })
    },
    addpartslist () {
      this.$validator.reset()
      if (this.zcj1 === '' && this.zcj2 === '') {
        this.$Message.warning('不允许为空!')
      } else {
        let params = {name: this.zcj1, quantity: 0, supplyPrice: this.zcj3, salePrice: this.zcj4, brand: this.zcj5, model: this.zcj6}
        addonepj(JSON.stringify(params)).then((res) => {
          this.pjid = res.data.data
          let params = {
            ownServiceProductList: [{
              productId: this.pjid,
              productName: this.zcj1,
              productQuantity: this.zcj2,
              productPrice: this.zcj3,
              productModel: this.zcj6,
              productBrand: this.zcj5
            }]
          }
          addcgd(JSON.stringify(params)).then((res) => {
            this.bxtparts = []
            this.bxtparts = res.data.data.ownServiceProductList
            this.addgxs = res.data.data.serviceTaskList
            this.pjcount = res.data.data.productAmount
            this.taskTotalmoney = res.data.data.taskAmount
            this.totalmoney = res.data.data.totalAmount
            this.showpj = false
            this.showzcj = false
            this.zcj1 = ''
            this.zcj2 = 0
            this.zcj3 = ''
            this.zcj4 = ''
            this.zcj5 = ''
            this.zcj6 = ''
            this.bt = []
          })
        })
      }
    },
    searchgx () {
      let params = {serviceTaskList: [{taskName: this.gxname, taskFee: this.peopelpay, taskNum: 1}]}
      addcgd(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
        this.preferential = res.data.data.garageDiscount
        this.gxname = ''
        this.taskFee = ''
        this.showgx = false
      })
    },
    closeaddcar () {
      this.addcarmsg = false
      this.showpj = false
      this.showzcj = false
    },
    addpj () {
      this.$validator.reset()
      this.disa = true
      this.activebtn = true
      this.showpj = true
      this.showzcj = false
      this.showgx = false
      this.activebtn1 = false
      this.searchpjlist()
    },
    addzcj () {
      this.$validator.reset()
      this.disa = true
      this.showpj = false
      this.showzcj = true
      this.showgx = false
      this.activebtn1 = true
      this.activebtn = false
    },
    blurparts (index) {
      let i = index
      if (this.bxtparts[i].productPrice < 0) {
        this.$Message.error('单价不可为负！')
        this.bxtparts[i].productPrice = 0
      }
      let params1 = {
        productId: this.bxtparts[i].productId,
        productName: this.bxtparts[i].productName,
        productBrand: this.bxtparts[i].brand,
        productNumber: this.bxtparts[i].productCode,
        productPrice: this.bxtparts[i].productPrice,
        productQuantity: this.bxtparts[i].productQuantity
      }
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      purchaseUpdate(JSON.stringify(params)).then((res) => {
        if (!res || !res.data || res.data.result !== 0) {
          return
        }
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
      })
    },
    blurs () {
      for (let i = 0; i < this.bxtparts.length; i++) {
        let params1 = {
          productId: this.bxtparts[i].productId,
          productName: this.bxtparts[i].productName,
          productBrand: this.bxtparts[i].brand,
          productNumber: this.bxtparts[i].productCode,
          productPrice: this.bxtparts[i].productPrice,
          productQuantity: this.bxtparts[i].productQuantity
        }
        this.lists2.push(params1)
        let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
        purchaseUpdate(JSON.stringify(params)).then((res) => {
          this.bxtparts = []
          this.lists2 = []
          this.bxtparts = res.data.data.ownServiceProductList
          this.addgxs = res.data.data.serviceTaskList
          this.pjcount = res.data.data.productAmount
          this.taskTotalmoney = res.data.data.taskAmount
          this.totalmoney = res.data.data.totalAmount
        })
      }
    },
    redu (item) {
      this.bxtts[item].count--
    },
    addu (item) {
      this.bxtts[item].count++
    },
    reduceone (item) {
      this.bxtparts[item].productQuantity--
      let params1 = {
        productId: this.bxtparts[item].productId,
        productName: this.bxtparts[item].productName,
        productBrand: this.bxtparts[item].brand,
        productNumber: this.bxtparts[item].productCode,
        productPrice: this.bxtparts[item].productPrice,
        productQuantity: this.bxtparts[item].productQuantity
      }
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      purchaseUpdate(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
      })
    },
    increase (item) {
      this.bxtparts[item].productQuantity++
      let params1 = {
        productId: this.bxtparts[item].productId,
        productName: this.bxtparts[item].productName,
        productBrand: this.bxtparts[item].brand,
        productNumber: this.bxtparts[item].productCode,
        productPrice: this.bxtparts[item].productPrice,
        productQuantity: this.bxtparts[item].productQuantity
      }
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      purchaseUpdate(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
      })
    },
    setToDel (index) {
      this.modal2 = true
      this.delItem = index
    },
    del () {
      let item = this.delItem
      this.modal_loading = true
      let params1 = {
        productId: this.bxtparts[item].productId,
        productName: this.bxtparts[item].productName,
        productBrand: this.bxtparts[item].brand,
        productNumber: this.bxtparts[item].productCode,
        productPrice: this.bxtparts[item].productPrice,
        productQuantity: 0
      }
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      purchaseUpdate(JSON.stringify(params)).then((res) => {
        this.delItem = -1
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
      })
      setTimeout(() => {
        this.modal_loading = false
        this.modal2 = false
        this.$Message.success('删除成功')
      }, 1000)
    },
    comlateorder (msg) {
      this.lists2 = []
      for (let i = 0; i < this.bxtparts.length; i++) {
        let params1 = {
          productCode: this.bxtparts[i].productId,
          productName: this.bxtparts[i].productName,
          quantity: this.bxtparts[i].productQuantity,
          productPrice: this.bxtparts[i].productPrice
        }
        this.lists2.push(params1)
      }
      if (this.bxtparts[0]) {
        let params = {
          purchaseLineList: this.lists2,
          purchaseVO: {
            supplierCompanyId: this.msg.supplierCompanyId,
            payType: this.msg.payType,
            expectedArrivalTime: this.msg.expectedArrivalTime
          }
        }
        setTimeout(addpurchase(JSON.stringify(params)).then((res) => {
          if (res.data.result === 0) {
            this.$Message.success('添加采购单成功！')
            this.lists2 = []
            this.$router.push({name: '采购管理'})
          } else {
            this.$Message.error(res.data.desc)
          }
        }), 1500)
      } else {
        this.$Message.error('采购单列表为空！')
      }
    },
    validateBeforeSubmitsearch () {
      this.$validator.validateAll({配件名称: this.zcj1, 采购数量: this.zcj2, 采购价格: this.zcj3, 销售价格: this.zcj4}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.addpartslist()
          return
        }
        this.$Message.error('请添加正确的配件信息!')
      })
    },
    validateBeforeSubmitpj (item) {
      this.$validator.validateAll({单价: this.bxtparts[item].productPrice}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.comlateorder()
          return
        }
        this.$Message.error('请添加正确的配件信息!')
      })
    }
  }
}
</script>
<style scoped lang='less'>
  @import '../../assets/css/public.less';
  @cl-ye:#fdedb1;
  h3{display:inline-block;font-size:18px;}
  .arrow {
    position: absolute;
    top: -7px;
    left:48%;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #fff;
    border-left: 0;
    border-top: 1px solid #fdedb1;
    border-right: 1px solid #fdedb1;
    border-bottom: 0;
    transform: rotate(-45deg);
  }
  .close{
    cursor: pointer;
  }
  .clearfix{
    clear:both;
    content:'';
    display:block;
  }
  .table-header{
    width:15%;
    height:40px;
    line-height:40px;
    font-size:18px;
    border-radius:20px 20px 0 0;
    background:#fdedb1;
  }
  .complete{
    color:white;
    background:#f3a340;
    line-height: @title-h;
  .border-radius;
    background:@color-o;
    outline: none;
    cursor:pointer;
    border:none;
    font-size:18px;
  }
  .parst{
    line-height: @title-h;
    border:@border-line01;
  .border-radius;
    outline: none;
    cursor:pointer;
    font-size:18px;
    background:#fff;
  }
.statusbtn{
  width:100%;
  padding-left:20px;
}
.statusbtn ul li{
  float:left;
  padding-right:20px;
  line-height: 40px;
}
  .addbtn{
    width:80%;
    margin:0 auto;
    position:relative;
      ul>li{
            float:left;
        width:48%;
        height:100%;
          button{
              margin-top:10px;
              width:305px;
              height:60px;
             }
      }
  }
.addtable{
    width:80%;
    margin:15px auto 0;
    background:white;
    position:relative;
  }
/*  .addtable:after{
    position: absolute;
    content: "";
    top  :-8px;
    left :50%;
    overflow:hidden;
    width :16px;
    height:16px;
    background:#fff;
    border-left:1px solid #fdedb1 ;
    border-top :1px solid #fdedb1 ;
    -webkit-transform :rotate(45deg);
    -moz-transform    :rotate(45deg);
    -o-transform      :rotate(45deg);
    transform         :rotate(45deg);
  }*/


  .adpj{
    width:100%;
    margin:0 auto;
    padding:20px 0 10px;
    border:1px @cl-ye solid;
  table{
    width:100%;
    margin:10px auto;
    font-size:16px;
    th{
      background:#fdedb1;
      height:70px;
    }
  td{
    height:70px;
  }
  }
  }

  .adself{
    width:100%;
    margin:0 auto;
    padding:20px 0 10px;
    border:1px @cl-ye solid;
  table{
    width:80%;
    margin:10px auto;
    font-size:16px;
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
  .aditem{
    width:100%;
    margin:0 auto;
    padding:20px 0 10px;
    border:1px @cl-ye solid;
  table{
    width:80%;
    margin:10px auto;
    font-size:16px;
  td{
    height:70px;
  }
  td:first-child{
    width:20%;
  }
  }
  }
  @import '../../assets/css/public.less';
  @cl-ye:#fdedb1;
  h3{display:inline-block;font-size:18px;}
  .close{
    cursor: pointer;
  }
  .clearfix{
    clear:both;
    content:'';
    display:block;
  }
  .complete{
    color:white;
    background:#f3a340;
    line-height: @title-h;
  .border-radius;
    background:@color-o;
    outline: none;
    cursor:pointer;
    border:none;
    font-size:18px;
  }
  .parst{
    line-height: @title-h;
    border:@border-line01;
  .border-radius;
    outline: none;
    cursor:pointer;
    font-size:18px;
  }
  .addparts{
    width:100%;
    background:white;
    border-radius:10px;
  }

  .bxttable{
    width:100%;
    margin-top:10px;
  table{
    width:100%;
    font-size:16px;
  tr:first-child{
    background:@cl-ye;
  }
  th{
    background:@cl-ye;
  }
  tr{
    height:60px;

    background:white;
  }
  tr:hover{
    background:#fdfae9;
  }
  tr:first-child{
    background:@cl-ye;
  }

  }
  }
    .filldata{
    width:100%;
    margin:20px  auto;
    background:white;
    display: inline-block;
    padding-bottom:@mb;
      table{
            td{
              padding:5px 10px;
            }
      }
  }
  .com-mcen{
    display: block;
    padding:10px 0;
    margin:10px auto 140px;
    background:#f9f8f3;
  }
  .complete01{
    margin:10px auto;
  }

</style>
