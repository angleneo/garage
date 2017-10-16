<template>
  <div class="access">
    <div class='addbtn'>
      <ul>
        <li>
          <button :class='{complete:activebtn}' class="parst" @click="addpj" :disable="disa">{{btns[0].name}}</button>
        </li>
        <li>
          <button :class='{complete:activebtn1}' class="parst" @click="addzcj">{{btns[1].name}}</button>
        </li>
        <li>
          <button :class='{complete:activebtn2}' class="parst" @click="addgx">{{btns[2].name}}</button>
        </li>
        <div class='clearfix'></div>
      </ul>
    </div>

    <section class='addtable'>
      <div class="adpj" v-show="showpj">
        <div class="arrow"></div>
        <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <div class="statusbtn">

          <ul>
            <li>
              <Input placeholder="请输入配件名称" size="large" style="width: 210px;" v-model="pjname"></Input>
            </li>
            <li>
            </li>
            <li>
              <button class="search-btn" @click="searchpjlist">点击搜索</button>
            </li>
            <div class="clearfix"></div>
          </ul>
        </div>

        <table cellpadding="0" cellspacing="0">
          <tr>
            <th>配件名称</th>
            <th>规格型号</th>
            <th>品牌</th>
            <th>现存数量</th>
            <th>使用数量</th>
            <th>销售价格</th>
          </tr>
          <tr v-for="(bxt, item) in bxtts" :key="item">
            <td>{{bxt.productName}}</td>
            <td>{{bxt.productModel}}</td>
            <td>{{bxt.productBrandName}}</td>
            <td>{{bxt.productStock}}</td>
            <td>
              <button :disabled="bxt.count<=0" style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="redu(item)">-</button>
              <input type="text" disabled='disabled' v-model="bxt.count" style="background:white;width:100px;height:30px;border:1px solid lightgray;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="addu(item)">+</button>
            </td>
            <td>{{bxt.productSalePrice | money }}
            </td>
          </tr>
        </table>
        <Page :total="currentpage" :page-size="pagen" :current="pagenumber" v-show="pageshow" @on-change="changepage"></Page>
        <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;" @click="addpjlist">确认添加</button>
      </div>

      <!-- 添加配件 -->
      <div class="adself" v-show="showzcj">
        <div class="arrow"></div>
        <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <form @submit.prevent="validateBeforeSubmitsearch">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>* 配件名称：</td>
              <td>
                <Input size="large" placeholder="请输入配件名称" style="width:300px;" v-model="zcj1" v-validate="'required|max:20|min:2'" name="配件名称"></Input>
                <p v-show="errors.has('配件名称')" style="color:red; position:absolute; margin-left:60px">{{ errors.first('配件名称') }}</p>
              </td>
              <td>* 采购数量：</td>
              <td>
                <Input size="large" placeholder="请输入采购数量" style="width:300px; position:relative" v-model="zcj2" v-validate="'required|numeric|max:8|min_value:0|min:1'" name="采购数量"></Input>
                <p v-show="errors.has('采购数量')" style="color:red; position:absolute; margin-left:60px">{{ errors.first('采购数量') }}</p>
              </td>
            </tr>

            <tr>
              <td>* 采购价格：</td>
              <td>
                <Input placeholder="请输入采购价" v-money style="width:300px; position:relative" v-model="zcj3" v-validate="'required|decimal:2|max:12|min:1'" name="采购价格" @on-blur="formatMoney"></Input>
                <p v-show="errors.has('采购价格')" style="color:red; position:absolute; margin-left:60px;">{{ errors.first('采购价格') }}</p>
              </td>
              <td>* 销售价格：</td>
              <td>
                <Input size="large" placeholder="请输入销售价" style="width:300px; position:relative;" v-model="zcj4" v-validate="'required|decimal:2|max:12|min:1'" name="销售价格" @on-blur="formatMoney2"></Input>
                <p v-show="errors.has('销售价格')" style="color:red; position:absolute; margin-left:60px;">{{ errors.first('销售价格') }}</p>
              </td>
            </tr>

            <tr>
              <td>配件品牌：</td>
              <td>
                <Input size="large" placeholder="请输入配件品牌(选填)" style="width:300px;" v-model="zcj5"></Input>
              </td>
              <td>规格型号：</td>
              <td>
                <Input size="large" placeholder="请输入规格型号(选填)" style="width:300px;" v-model="zcj6"></Input>
              </td>
            </tr>
          </table>
          <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;">确认添加</button>
        </form>
      </div>

      <!-- 添加工项 -->
      <div class="aditem" v-show="showgx">
        <div class="arrow"></div>
        <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <form @submit.prevent="validateBeforeSubmitgx">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>* 工项名称：</td>
              <td>
                <Input name="工项名称" size="large" placeholder="请输入工项名称" v-model="gxname" v-validate="'required|max:20|min:2'" style="min-width:600px;width:65%"></Input>
                <p v-show="errors.has('工项名称')" style="color:red; position:absolute; margin-left:123px;">{{ errors.first('工项名称') }}</p>
              </td>
            </tr>
            <tr>
              <td>* 工时费用：</td>
              <td>
                <Input size="large" placeholder="请输入工时费用" v-model="peopelpay" style="min-width:600px;width:65%; position:relative" v-validate="'required|decimal:2'" name="工时费用"></Input>
                <p v-show="errors.has('工时费用')" style="color:red; position:absolute;margin-left:123px;">{{ errors.first('工时费用') }}</p>
              </td>
            </tr>

          </table>
          <button class="complete" style="height:40px;width:300px;line-height:40px;margin:30px auto;">确认添加</button>
        </form>
      </div>
    </section>
    <section class="bxttable">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>分类</th>
          <th>名称</th>
          <th>规格型号</th>
          <th>品牌</th>
          <th>数量</th>
          <th>配件单价/工时单价</th>
          <th>配件合计/工时费用</th>
          <th>操作</th>
        </tr>

        <tr v-for="(bxt, item) in bxtparts" :key="item">
          <td>{{item+1}}</td>
          <td>配件</td>
          <td>{{bxt.productName}}</td>
          <td>{{bxt.productModel}}</td>
          <td>{{bxt.productBrand}}</td>
          <td>
            <button :disabled='bxt.productQuantity<=1' style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reduceone(item)">-</button>
            <input type="text" disabled='disabled' v-model="bxt.productQuantity" style="background:white;width:100px;height:30px;border:1px solid lightgray;">
            <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increase(item)">+</button>
          </td>
          <td>
            <Input name="配件单价" v-model="bxt.productPrice" style="width:100px;height:30px;background:white;" v-validate="'required|decimal:2|max:9|min_value:0'" @on-blur="blurparts(item)" @on-focus="bxtparts.activeItem=item">
            </Input>
            <p v-show="bxtparts.activeItem===item && errors.has('配件单价')" style="color:red; position:absolute;">{{ errors.first('配件单价') }}</p>
          </td>
          <td>{{bxt.totalAmount | money}}元</td>
          <td @click="setProductToDel(item)" style="color:lightgray;cursor:pointer">
            <Icon type="trash-a" size="18"></Icon>删除</td>
        </tr>
        <tr>
          <td style="padding-right:10px;border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px;" colspan="9">配件合计:
            <span>{{pjcount | money}}</span>元</td>
        </tr>

        <tr v-for="(gx, item) in addgxs" :key="item">
          <td>{{item+1}}</td>
          <td>工项</td>
          <td>{{gx.taskName}}</td>
          <td>工时</td>
          <td></td>
          <td>
            <button :disabled="gx.taskNum<=1" style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reducegx(item)">-</button>
            <input type="text" disabled='disabled' v-model="gx.taskNum" style="background:white;width:100px;height:30px;border:1px solid lightgray;">
            <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increasegx(item)">+</button>
          </td>
          <td>
            <Input v-model="gx.taskFee" name="工时单价" v-validate="'required|decimal:1|max:9|min:1'" @on-blur="blurgx(item)" @on-focus="addgxs.activeItem=item" style="width:100px;height:30px;background:white"></Input>
            <p v-show="addgxs.activeItem===item && errors.has('工时单价')" style="color:red; position:absolute;">{{ errors.first('工时单价') }}</p>
          </td>
          <td>{{gx.totalAmount | money}}</td>
          <td @click="setServiceToDel(item)" style="color:lightgray;cursor:pointer">
            <Icon type="trash-a" size="18"></Icon>删除</td>
        </tr>
        <tr>
          <td colspan="9" style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px; padding-right:10px;">工时合计:
            <span>{{taskTotalmoney | money}}</span>元</td>
        </tr>

        <tr>
          <td colspan="9" style="text-align:right;font-size:18px;padding-right:10px;">合计金额:
            <span>{{pjcount + taskTotalmoney | money}}</span>元</td>
        </tr>

        <tr>

          <td colspan="9" style="border-bottom:1px solid lightgray;text-align:right;font-size:18px;color:#f69022;padding-right:10px; background:#fff; width:100%;position: relative;">
            <form @submit.prevent="validateBeforeSubmitdiscount">优惠金额:
              <input v-model="preferential" v-on:blur="blurs()" v-validate="'required|decimal:2|max:9|min_value:0'" name="优惠金额" style="width:65px;border:#f69022 1px solid;border-radius:5px;color:#f69022;font-size:16px;text-indent:5px;margin:0 5px;">元</form>
            <div v-show="errors.has('优惠金额')" style="color:red;z-index:999;">{{ errors.first('优惠金额') }}</div>
          </td>

        </tr>

        <tr>
          <td colspan="9" style="text-align:right;font-size:18px;color:#d02d35;padding-right:10px;">实收金额:
            <span>{{chargeAmount | money}}</span>元</td>
        </tr>
      </table>
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
          <Button type="error" size="large" :loading="modal_loading" @click="del()">删除</Button>
          <Button size="large" @click="modal2 = false">取消</Button>
        </div>
      </Modal>
      <!-- 删除弹出的模态框 -->
      <Modal v-model="modal3" width="400">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>此任务删除后，当前行将被清空</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer" style="width:100%; text-align:center;">
          <Button type="error" size="large" :loading="modal_loading" @click="delgx()">删除</Button>
          <Button size="large" @click="modal3 = false">取消</Button>
        </div>
      </Modal>
    </section>
    <section>
      <div class="filldata">
        <div class="car-title">
          <img src="../../assets/images/03-icon.png" alt="">
          <h3>补充信息</h3>
        </div>

        <table>
          <tr>
            <td>* 进厂时间:</td>
            <td>
              <Row>
                <Col span="12">
                <DatePicker type="date" name="进厂时间" v-model="today" placeholder="选择日期" v-validate="'required'" style="width: 200px" :options="options2"></DatePicker>
                <p v-show="errors.has('进厂时间')" style="color:red; position:absolute;">{{ errors.first('进厂时间') }}</p>
                </Col>
              </Row>
            </td>
            <td>* 进厂里程数:</td>
            <td>
              <Input name="进厂里程数" v-model="mileage" placeholder="请输入进厂里程数" v-validate="'required|numeric|max:9|min:1'" style="width: 150px"></Input>
              <p v-show="errors.has('进厂里程数')" style="color:red; position:absolute;">{{ errors.first('进厂里程数') }}</p>
            </td>
          </tr>
          <tr>
            <td>备注:</td>
            <td colspan='3'>
              <Input v-model="notes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width:100%" placeholder="请输入备注"></Input>
            </td>
          </tr>
        </table>
      </div>
      <!--------------以下完成开单---------------------->
    </section>
    <div class="com-mcen">
      <div class="complete01" :disabled="inProcessing" @click="comlateorder">完成开单</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { acclists, addonepj } from '@/service/access'
import { updateacc, calOrder, createorder } from '@/service/workorder'
import { supplierlist } from '@/service/supplier'
export default {
  props: ['message'],
  data () {
    return {
      options2: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      modal2: false,
      modal_loading: false,
      modal3: false,
      model1: '',
      value1: '',
      pjname: '',
      gxname: '',
      peopelpay: 0,
      disa: false,
      zcjact: true,
      zcjno: false,
      pageshow: false,
      currentpage: 10,
      pgacount: '',
      btns: [
        { name: '库存已有配件' },
        { name: '临时采购配件' },
        { name: '工项' }
      ],
      bxtts: [],
      bt: [],
      addgxs: [],
      bxtparts: [],
      btnact: true,
      btnno: false,
      activebtn: false,
      activebtn1: false,
      activebtn2: false,
      showpj: false,
      showzcj: false,
      showgx: false,
      pjcount: '',
      totalmoney: '',
      taskTotalmoney: '',
      productmoney: '',
      preferential: '',
      zcj1: '',
      zcj2: 0,
      zcj3: 0,
      zcj4: 0,
      zcj5: '',
      zcj6: '',
      pjid: '',
      pagen: 5,
      pagenumber: 1,
      lists2: [],
      notes: '',
      mileage: '',
      today: moment(String(new Date())).format('YYYY-MM-DD'),
      delItem: -1,
      inProcessing: false
    }
  },
  computed: {
    maintainDay: function () {
      return moment(this.today).format('YYYY-MM-DD')
    },
    chargeAmount: function () {
      return this.totalmoney > 0 ? this.totalmoney : 0
    }
  },
  mounted () {
    this.getSuppierlist()
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
    getSuppierlist () {
      let params = {}
      let pagestr = '?pageNum=' + 1
      supplierlist(JSON.stringify(params), pagestr).then((res) => {
        this.gysList = res.data.data.list
      })
    },
    getCachedOrder () {
      if (this.$store.state.carinfo && this.$store.state.carinfo.id) {
        this.$store.state.carinfo.id = ''
      }
      calOrder('{}').then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
        this.delItem = -1
      })
    },
    searchpjlist () {
      this.pagenumber = 1
      let params = { productName: this.pjname }
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
    changepage (page) {
      this.pagenumber = page
      let params = { productName: this.pjname }
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
      for (let i = 0; i < this.bxtts.length; i++) {
        if (this.bxtts[i].count > 0) {
          let params = {
            productId: this.bxtts[i].productId,
            productName: this.bxtts[i].productName,
            productBrand: this.bxtts[i].productBrand,
            productPrice: this.bxtts[i].productSalePrice,
            productQuantity: this.bxtts[i].count,
            productModel: this.bxtts[i].productModel
          }
          this.bt.push(params)
        }
      }
      let params = { ownServiceProductList: this.bt }
      updateacc(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
        this.bt = []
        this.showpj = false
        this.tablebg = false
        this.pagenumber = 1
      })
    },
    redu (item) {
      this.bxtts[item].count--
    },
    addu (item) {
      this.bxtts[item].count++
    },
    addpartslist () {
      if (this.zcj1 === '' && this.zcj2 === '') {
        this.$Message.error('临采件必填信息不允许为空')
      } else {
        let params = { name: this.zcj1, quantity: this.zcj2, supplyPrice: this.zcj3, salePrice: this.zcj4, brand: this.zcj5, model: this.zcj6 }
        addonepj(JSON.stringify(params)).then((res) => {
          this.pjid = res.data.data
          let params = {
            ownServiceProductList: [{
              productId: this.pjid,
              productName: this.zcj1,
              productQuantity: this.zcj2,
              productPrice: this.zcj4,
              productModel: this.zcj6,
              productBrand: this.zcj5
            }]
          }
          updateacc(JSON.stringify(params)).then((res) => {
            console.log(JSON.stringify(res))
            if (!res || !res.data) {
              return
            }

            if (res.data.result !== 0) {
              this.$Message.error(res.data.desc)
              return
            }

            this.bxtparts = []
            this.bxtparts = res.data.data.ownServiceProductList
            this.addgxs = res.data.data.serviceTaskList
            this.pjcount = res.data.data.productAmount
            this.taskTotalmoney = res.data.data.taskAmount
            this.totalmoney = res.data.data.totalAmount
            this.preferential = res.data.data.garageDiscountAmount
            this.showpj = false
            this.showzcj = false
            this.tablebg = false
            this.zcj1 = ''
            this.zcj2 = 0
            this.zcj3 = 0
            this.zcj4 = 0
            this.zcj5 = ''
            this.zcj6 = ''
            this.bt = []
          })
        })
      }
    },
    searchgx () {
      this.$validator.reset()
      if (this.gxname === '' && this.peopelpay === '') {
        this.$Message.warning('工项名称和工时费用不允许为空！')
      } else {
        if (this.peopelpay < 0) {
          this.$Message.warning('工时费不允许为负！')
          this.peopelpay = ''
        } else {
          let params = { serviceTaskList: [{ taskName: this.gxname, taskFee: this.peopelpay, taskNum: 1 }] }
          updateacc(JSON.stringify(params)).then((res) => {
            this.bxtparts = []
            this.bxtparts = res.data.data.ownServiceProductList
            this.addgxs = res.data.data.serviceTaskList
            this.pjcount = res.data.data.productAmount
            this.taskTotalmoney = res.data.data.taskAmount
            this.totalmoney = res.data.data.totalAmount
            this.preferential = res.data.data.garageDiscountAmount
            this.showgx = false
            this.gxname = ''
            this.peopelpay = 0
          })
        }
      }
    },
    closeaddcar () {
      this.addcarmsg = false
      this.showpj = false
      this.showzcj = false
      this.showgx = false
      this.pagenumber = 1
    },
    addpj () {
      if (this.$store.state.carsact === 100) {
        this.disa = true
        this.activebtn = true
        this.showpj = true
        this.showzcj = false
        this.showgx = false
        this.activebtn1 = false
        this.activebtn2 = false
        this.searchpjlist()
      } else {
        this.disa = false
      }
    },
    addzcj () {
      this.$validator.reset()
      if (this.$store.state.carsact === 100) {
        this.disa = true
        this.showpj = false
        this.showzcj = true
        this.showgx = false
        this.activebtn1 = true
        this.activebtn2 = false
        this.activebtn = false
      } else {
        this.disa = false
      }
    },
    addgx () {
      this.$validator.reset()
      if (this.$store.state.carsact === 100) {
        this.disa = true
        this.unactivebtn = false
        this.showpj = false
        this.showzcj = false
        this.showgx = true
        this.activebtn1 = false
        this.activebtn2 = true
        this.activebtn = false
      } else {
        this.disa = false
      }
    },
    blurparts (item) {
      if (this.bxtparts[item].productPrice < 0) {
        this.$Message.warning('单价不可为负！')
        this.bxtparts[item].productPrice = 0
      }
      let params1 = {
        productId: this.bxtparts[item].productId,
        productName: this.bxtparts[item].productName,
        productBrand: this.bxtparts[item].brand,
        productNumber: this.bxtparts[item].productCode,
        productPrice: this.bxtparts[item].productPrice,
        productQuantity: this.bxtparts[item].productQuantity
      }
      this.lists2.push(params1)
      let params = { ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential }
      calOrder(JSON.stringify(params)).then((res) => {
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
        this.preferential = res.data.data.garageDiscountAmount
      })
    },
    blurgx (item) {
      this.$validator.reset()
      if (this.addgxs[item].taskFee < 0) {
        this.$Message.warning('工项单价不可为负！')
        this.addgxs[item].taskFee = 0
      }
      let params = {
        serviceTaskList: [
          {
            taskName: this.addgxs[item].taskName,
            taskFee: this.addgxs[item].taskFee,
            taskNum: this.addgxs[item].taskNum
          }
        ],
        garageDiscountAmount: this.preferential
      }
      calOrder(JSON.stringify(params)).then((res) => {
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
        this.preferential = res.data.data.garageDiscountAmount
      })
    },
    blurs () {
      if (this.preferential > (this.taskTotalmoney + this.pjcount)) {
        this.$Message.warning('优惠金额不能大于合计金额！')
      }
      if (this.preferential < 0) {
        this.$Message.warning('优惠金额不得为负！')
        this.preferential = 0
      }
      let params = { ownServiceProductList: null, garageDiscountAmount: this.preferential }
      calOrder(JSON.stringify(params)).then((res) => {
        if (res && res.data && res.data.result === 0) {
          this.bxtparts = []
          this.lists2 = []
          this.bxtparts = res.data.data.ownServiceProductList
          this.addgxs = res.data.data.serviceTaskList
          this.pjcount = res.data.data.productAmount
          this.taskTotalmoney = res.data.data.taskAmount
          this.totalmoney = res.data.data.totalAmount
          this.preferential = res.data.data.garageDiscountAmount
        }
      })
    },
    reduceone (item) {
      this.bxtparts[item].productQuantity--
      let params1 = { productId: this.bxtparts[item].productId, productName: this.bxtparts[item].productName, productBrand: this.bxtparts[item].brand, productNumber: this.bxtparts[item].productCode, productPrice: this.bxtparts[item].productPrice, productQuantity: this.bxtparts[item].productQuantity }
      this.lists2.push(params1)
      let params = { ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential }
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
      })
    },
    increase (item) {
      this.bxtparts[item].productQuantity++
      let params1 = { productId: this.bxtparts[item].productId, productName: this.bxtparts[item].productName, productBrand: this.bxtparts[item].brand, productNumber: this.bxtparts[item].productCode, productPrice: this.bxtparts[item].productPrice, productQuantity: this.bxtparts[item].productQuantity }
      this.lists2.push(params1)
      let params = { ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential }
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
      })
    },
    reducegx (item) {
      this.addgxs[item].taskNum--
      let params = { serviceTaskList: [{ taskName: this.addgxs[item].taskName, taskFee: this.addgxs[item].taskFee, taskNum: this.addgxs[item].taskNum }], garageDiscountAmount: this.preferential }
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
      })
    },
    increasegx (item) {
      this.addgxs[item].taskNum++
      let params = { serviceTaskList: [{ taskName: this.addgxs[item].taskName, taskFee: this.addgxs[item].taskFee, taskNum: this.addgxs[item].taskNum }], garageDiscountAmount: this.preferential }
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
      })
    },
    setProductToDel (index) {
      this.modal2 = true
      this.delItem = index
    },
    del () {
      this.modal_loading = true
      let item = this.delItem
      let params1 = {
        productId: this.bxtparts[item].productId,
        productName: this.bxtparts[item].productName,
        productBrand: this.bxtparts[item].brand,
        productNumber: this.bxtparts[item].productCode,
        productPrice: this.bxtparts[item].productPrice,
        productQuantity: 0
      }
      this.lists2.push(params1)
      let params = {
        id: this.id,
        ownServiceProductList: this.lists2,
        garageDiscountAmount: this.preferential
      }
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
        this.delItem = -1
      })
      setTimeout(() => {
        this.modal_loading = false
        this.modal2 = false
        this.$Message.success('删除成功')
      }, 1000)
    },
    setServiceToDel (index) {
      this.modal3 = true
      this.delItem = index
    },
    delgx () {
      this.modal_loading = true
      let item = this.delItem
      let params = {
        serviceTaskList: [
          {
            taskName: this.addgxs[item].taskName,
            taskFee: this.addgxs[item].taskFee,
            taskNum: 0
          }
        ],
        garageDiscountAmount: this.preferential
      }
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.lists2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productAmount
        this.taskTotalmoney = res.data.data.taskAmount
        this.totalmoney = res.data.data.totalAmount
        this.preferential = res.data.data.garageDiscountAmount
        this.delItem = -1
      })
      setTimeout(() => {
        this.modal_loading = false
        this.modal3 = false
        this.$Message.success('删除成功')
      }, 1000)
    },
    comlateorder () {
      if (this.inProcessing) {
        return
      }

      if (!this.today) {
        this.$Message.info('进厂时间不能为空！')
        return
      }

      if (!this.mileage) {
        this.$Message.warning('进厂公里数不能为空！')
        return
      }

      if (!this.$store.state.carinfo.id) {
        this.$Message.warning('请选择车辆')
        return
      }
      this.$store.commit('clearsubmission')
      let params = {
        suggestion: this.notes,
        ownServiceProductList: this.bxtparts,
        carId: this.$store.state.carinfo.id,
        userId: this.$store.state.carinfo.userId,
        maintainMileage: this.mileage,
        maintainTime: this.maintainDay,
        garageDiscountAmount: this.preferential
      }

      this.inProcessing = true
      console.log('inProcessing: ' + this.inProcessing)
      createorder(JSON.stringify(params)).then((res) => {
        console.log(res.data)
        this.inProcessing = false
        if (res.data.result === 0) {
          this.$Message.info('开单成功')
          this.$router.push({ name: '工单管理' })
        } else {
          this.$Message.error(res.data.desc)
        }
      })
    },
    validateBeforeSubmitsearch () {
      this.$validator.validateAll({ 配件名称: this.zcj1, 采购数量: this.zcj2, 采购价格: this.zcj3, 销售价格: this.zcj4 }).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.addpartslist()
          return
        }
        this.$Message.warning('请添加正确的配件信息!')
      })
    },
    validateBeforeSubmitgx () {
      this.$validator.validateAll({ 工项名称: this.gxname, 工时费用: this.peopelpay }).then((result) => {
        if (result) {
          this.searchgx()
          return
        }
        this.$Message.warning('请添加正确的工项名称及价格')
      })
    },
    validateBeforeSubmitdiscount () {
      this.$validator.validateAll({ 优惠金额: this.preferential }).then((result) => {
        if (result) {
          // eslint-disable-next-line
          return
        }
        this.$Message.warning('请添加正确的优惠金额!')
      })
    }
  }
}
</script>
<style scoped lang='less'>
@import '../../assets/css/public.less';
@cl-ye: #fdedb1;
h3 {
  display: inline-block;
  font-size: 18px;
}

.arrow {
  position: absolute;
  top: -7px;
  left: 48%;
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

.ivu-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, .1) !important;
  height: 100%;
  z-index: 1000;
}

.close {
  cursor: pointer;
}

.clearfix {
  clear: both;
  content: '';
  display: block;
}

.complete {
  color: white;
  background: #f3a340;
  line-height: @title-h;
  .border-radius;
  background: @color-o;
  outline: none;
  cursor: pointer;
  border: none;
  font-size: 18px;
}

.parst {
  line-height: @title-h;
  border: @border-line01;
  .border-radius;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  background: #fff;
}

.access {
  background: white;
}

.car-title {
  width: 100%;
  background: white;
}

.statusbtn {
  width: 100%;
  height: 40px;
  padding-left: 20px;
}

.statusbtn ul li {
  float: left;
  padding-right: 20px;
  line-height: 40px;
}

.addbtn {
  width: 80%;
  margin: 0 auto;
  background: white;
  position: relative;
  ul>li {
    float: left;
    width: 33.3%;
    height: 100%;
    button {
      margin-top: 10px;
      width: 305px;
      height: 60px;
    }
  }
}

.addtable {
  width: 80%;
  margin: 15px auto 0;
  background: white;
  position: relative;
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

.adpj {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0 10px;
  border: 1px @cl-ye solid;
  font-size: 16px;
  table {
    width: 100%;
    margin: 10px auto;
    th {
      background: #fdedb1;
      height: 70px;
    }
    td {
      height: 70px;
    }
  }
}

.adself {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0 10px;
  border: 1px @cl-ye solid;
  table {
    width: 80%;
    margin: 10px auto;
    font-size: 16px;
    td {
      height: 70px;
    }
    td:first-child {
      text-align: right;
    }
    td:nth-child(3) {
      text-align: right;
    }
  }
}

.aditem {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0 10px;
  border: 1px @cl-ye solid;
  table {
    width: 80%;
    margin: 10px auto;
    font-size: 16px;
    td {
      height: 70px;
    }
    td:first-child {
      width: 20%;
    }
  }
}

@import '../../assets/css/public.less';
@cl-ye: #fdedb1;
h3 {
  display: inline-block;
  font-size: 18px;
}

.close {
  cursor: pointer;
}

.clearfix {
  clear: both;
  content: '';
  display: block;
}

.complete {
  color: white;
  background: #f3a340;
  line-height: @title-h;
  .border-radius;
  background: @color-o;
  outline: none;
  cursor: pointer;
  border: none;
  font-size: 18px;
}

.parst {
  line-height: @title-h;
  border: @border-line01;
  .border-radius;
  outline: none;
  cursor: pointer;
  font-size: 18px;
}

.addparts {
  width: 100%;
  background: white;
  border-radius: 10px;
}

.bxttable {
  width: 100%;
  margin-top: 10px;
  table {
    width: 100%;
    font-size: 16px;
    tr:first-child {
      background: @cl-ye;
    }
    th {
      background: @cl-ye;
    }
    tr {
      height: 60px;

      background: white;
    }
    tr:hover {
      background: #fdfae9;
    }
    tr:first-child {
      background: @cl-ye;
    }
  }
}

.filldata {
  width: 100%;
  margin: 20px auto;
  background: white;
  display: inline-block;
  padding-bottom: @mb;
  table {
    td {
      padding: 5px 10px;
    }
  }
}

.com-mcen {
  width: 100%;
  display: block;
  padding: 10px 0;
  margin: 0px auto 0px !important;
  background: white;
}

.complete01 {
  margin: 10px auto;
}

.tablebox {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  z-index: 100;
  background: white;
}

.bxttable table {
  position: relative;
}
</style>
