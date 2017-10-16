<template>
	<div class="access">
	  <div class='addbtn'>
        <ul >
        <li><button :class='{complete:activebtn}' class="parst" @click="addpj" :disable="disa">{{btns[0].name}}</button></li>
        <li><button :class='{complete:activebtn1}' class="parst" @click="addzcj">{{btns[1].name}}</button></li>
        <li><button :class='{complete:activebtn2}' class="parst" @click="addgx">{{btns[2].name}}</button></li>
        <div class='clearfix'></div>
          </ul>
      </div>


    <section class='addtable'>
	<div class="adpj"  v-show="showpj">
     	<div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>

      <div class="statusbtn">
      <ul>
        <li> <Input  placeholder="请输入配件名称" style="width: 210px;" v-model="pjname"></Input></li>
        <li>
        </li>
        <li><button class="search-btn" @click="searchpjlist">点击搜索</button></li>
        <div class="clearfix"></div>
      </ul>
      </div>

       <table>
          <tr>
				<th>配件名称</th>
				<th>规格型号</th>
				<th>品牌</th>
				<th>现存数量</th>
				<th>使用数量</th>
				<th>价格</th>
          </tr>
          <tr v-for="(bxt, item) in bxtts">
				<td>{{bxt.productName}}</td>
				<td>{{bxt.productCode}}</td>
				<td>{{bxt.productBrandName}}</td>
				<td>{{bxt.productStock}}</td>
				<td><button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="redu(item)">-</button> <input type="text" disabled='disabled' v-model="bxt.count" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="addu(item)">+</button></td>
				<td>{{bxt.productSalePrice}}</td>
          </tr>
       </table>
        <Page :total="currentpage" v-show="pageshow" @on-change="changepage"></Page>
       <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;" @click="addpjlist">点击确认</button>
   </div>

      <!-- 添加配件 -->
      <div class="adself" v-show="showzcj">
      <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <table   cellpadding="0" cellspacing="0">
          </tr>
          <tr>
            <td>*配件名称:</td>
            <td><Input  size="large" placeholder="请输入配件名称" style="width:300px;" v-model="zcj1"></Input></td>
            <td>*数量:</td>
            <td><Input  size="large" placeholder="请输入采购数量" style="width:300px;" v-model="zcj2"></Input></td>
          </tr>

          <tr>
            <td>*采购价格:</td>
            <td><Input  size="large" placeholder="请输入采购价" style="width:300px;" v-model="zcj3"></Input></td>
            <td>*销售价格:</td>
            <td><Input  size="large" placeholder="请输入销售价" style="width:300px;" v-model="zcj4"></Input></td>
          </tr>

          <tr>
            <td>配件品牌:</td>
            <td><Input  size="large" placeholder="请输入配件品牌(选填)" style="width:300px;" v-model="zcj5"></Input></td>
            <td>规格型号:</td>
            <td><Input  size="large" placeholder="请输入规格型号(选填)" style="width:300px;" v-model="zcj6"></Input></td>
          </tr>
        </table>
        <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;" @click="addpartslist">点击确认</button>
      </div>

      <!-- 添加工项 -->
      <div class="aditem" v-show="showgx">
      <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <table   cellpadding="0" cellspacing="0">
          <tr>
            <td>*工项名称</td>
            <td><Input  size="large" placeholder="请输入工项名称" v-model="gxname" style="min-width:600px;width:65%"></Input></td>
          </tr>

          <tr>
            <td>*工时费</td>
            <td><Input  size="large" placeholder="请输入工时费" v-model="peopelpay" style="min-width:600px;width:65%"></Input></td>
          </tr>

        </table>
          <button class="complete" style="height:40px;width:300px;line-height:40px;margin:30px auto;" @click="searchgx">点击确认</button>
      </div>
     </section>
      <section class="bxttable">
      <table   cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>分类</th>
          <th>名称</th>
          <th>规格型号</th>
          <th>品牌</th>
          <th>数量</th>
          <th>配件单价/工时单价</th>
          <th>配件合计/工时费</th>
          <th>操作</th>
        </tr>

        <tr v-for="(bxt, item) in bxtparts">
          <td>{{item+1}}</td>
          <td>配件</td>
          <td>{{bxt.productName}}</td>
          <td>{{bxt.specification}}</td>
          <td>{{bxt.brand}}</td>
          <td><button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reduceone(item)">-</button> <input type="text" disabled='disabled' v-model="bxt.productQuantity" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increase(item)">+</button></td>
          <td><Input v-model="bxt.productPrice" @on-blur="blurparts()" style="width:100px;height:30px;background:white"></Input></td>
          <td>{{bxt.totalAmount}}元</td>
          <td @click="modal2 = true" style="color:lightgray;cursor:pointer"><Icon type="trash-a" size="18" ></Icon>删除
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
                  <div slot="footer">
                      <Button type="error" size="large" long :loading="modal_loading" @click="del(item)" >删除</Button>
                  </div>
              </Modal>
          </td>
        </tr>
        <tr >
          <td style="padding-right:10px;border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px;" colspan="9" >配件总计:<span>{{pjcount}}</span>元</td>
        </tr>

        <tr v-for="(gx, item) in addgxs">
          <td>{{item+1}}</td>
          <td>工项</td>
          <td>{{gx.taskName}}</td>
          <td>工时</td>
          <td>{{gx.brand}}</td>
          <td><button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reducegx(item)">-</button> <input type="text" disabled='disabled' v-model="gx.taskNum" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increasegx(item)">+</button></td>
          <td><Input v-model="gx.taskFee" @on-blur="blurgx()" style="width:100px;height:30px;background:white"></Input></td>
          <td>{{gx.totalAmount}}</td>
          <td @click="modal3 = true" style="color:lightgray;cursor:pointer"><Icon type="trash-a" size="18" ></Icon>删除
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
                  <div slot="footer">
                      <Button type="error" size="large" long :loading="modal_loading" @click="delgx(item)" >删除</Button>
                  </div>
              </Modal>
          </td>
        </tr>
        <tr>
          <td colspan="9" style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px; padding-right:10px;" >工时总计:<span>{{taskTotalmoney}}</span>元</td>
        </tr>

        <tr>
                 <td colspan="9" style="text-align:right;font-size:18px;padding-right:10px;" >工单总计:<span>{{pjcount + taskTotalmoney}}</span>元</td>
        </tr>

        <tr>
         <td colspan="9" style="border-bottom:1px solid lightgray;text-align:right;font-size:18px;color:#f69022;padding-right:10px;" >优惠金额:<input type="text" v-model="preferential" v-on:blur="blurs()" style="width:65px;border:#f69022 1px solid;border-radius:5px;color:#f69022;font-size:16px;text-indent:5px;margin:0 5px;">元</td>
        </tr>
        <tr>
           <td colspan="9" style="text-align:right;font-size:18px;color:#d02d35;padding-right:10px;" >实收金额:<span>{{totalmoney}}</span>元</td>
        </tr>
      </table>
    </section>
    <section>
       <div class="filldata">
         <div class="car-title">
           <img src="../../assets/images/03-icon.png" alt=""><h3>填写数据</h3>
         </div>
         <table>
            <tr>
              <td>进厂时间:</td>
              <td>
                   <Row>
                    <Col span="12">
                    <DatePicker type="date" :value="today"  placeholder="选择日期" style="width: 200px"></DatePicker>
                    </Col>
                  </Row>
              </td>
              <td>进场里程数:</td>
              <td><Input v-model="mileage" placeholder="20000" style="width: 150px"></Input></td>
            </tr>
            <tr>
              <td>备注:</td>
              <td colspan='3'><Input v-model="notes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width:100%" placeholder="请输入备注"></Input></td>
            </tr>
         </table>
       </div>
      <!--------------以下完成开单---------------------->
    </section>
      <div class="com-mcen">
      {{message.id}}
        <div class="complete01" @click="comlateorder">保存工单信息</div>
      </div>
	</div>
</template>
<script>
import {acclists, addonepj} from '@/service/access'
import {updateacc, calOrder, createorder} from '@/service/workorder'
export default {
  props: ['message'],
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
      zcjact: true,
      zcjno: false,
      pageshow: false,
      currentpage: 10,
      pgacount: '',
      btns: [
        {name: '库存已有配件'},
        {name: '临时采购配件'},
        {name: '工项'}
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
      zcj2: '',
      zcj3: '',
      zcj4: '',
      zcj5: '',
      zcj6: '',
      pjid: '',
      lists2: [],
      notes: '',
      mileage: '',
      today: ''
    }
  },
  computed: {
  },
  mounted () {
    this.getToday()
  },
  methods: {
    searchpjlist () {
      let params = {productName: this.pjname}
      let pagestr = '?pageNum=' + 1 + '&pageSize=' + 5
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
      let params = {productName: this.pjname}
      let pagestr = '?pageNum=' + page + '&pageSize=' + 5
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
    addpjlist (item) {
      for (let i = 0; i < this.bxtts.length; i++) {
        if (this.bxtts[i].count > 0) {
          let params1 = {productId: this.bxtts[i].productId, productName: this.bxtts[i].productName, productBrand: this.bxtts[i].brand, productNumber: this.bxtts[i].productCode, productPrice: this.bxtts[i].productSalePrice, productQuantity: this.bxtts[i].count}
          this.bt.push(params1)
          let params = {ownServiceProductList: this.bt}
          updateacc(JSON.stringify(params)).then((res) => {
            this.bxtparts = []
            this.bxtparts = res.data.data.ownServiceProductList
            this.addgxs = res.data.data.serviceTaskList
            this.pjcount = res.data.data.productTotal
            this.taskTotalmoney = res.data.data.taskTotal
            this.totalmoney = res.data.data.total
            this.preferential = res.data.data.garageDiscount
            this.bt = []
            this.showpj = false
          })
        }
      }
    },
    addpartslist () {
      let params = {name: this.zcj1, code: this.zcj6, supplyPrice: this.zcj3, salePrice: this.zcj4, productBrandName: this.zcj5}
      addonepj(JSON.stringify(params)).then((res) => {
        this.pjid = res.data.data
        let params = {ownServiceProductList: [{productId: this.pjid, productName: this.zcj1, productBrand: this.zcj5, productPrice: this.zcj4, productQuantity: this.zcj2}]}
        updateacc(JSON.stringify(params)).then((res) => {
          this.bxtparts = []
          this.bxtparts = res.data.data.ownServiceProductList
          this.addgxs = res.data.data.serviceTaskList
          this.pjcount = res.data.data.productTotal
          this.taskTotalmoney = res.data.data.taskTotal
          this.totalmoney = res.data.data.total
          this.preferential = res.data.data.garageDiscount
          this.bt = []
          this.showpj = false
          this.showzcj = false
        })
      })
    },
    searchgx () {
      let params = {serviceTaskList: [{taskName: this.gxname, taskFee: this.peopelpay, taskNum: 1}]}
      updateacc(JSON.stringify(params)).then((res) => {
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
      this.showgx = false
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
      } else {
        this.disa = false
      }
    },
    addzcj () {
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
    blurparts () {
      for (let i = 0; i < this.bxtparts.length; i++) {
        let params1 = {productId: this.bxtparts[i].productId, productName: this.bxtparts[i].productName, productBrand: this.bxtparts[i].brand, productNumber: this.bxtparts[i].productCode, productPrice: this.bxtparts[i].productPrice, productQuantity: this.bxtparts[i].productQuantity}
        this.lists2.push(params1)
        let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
        calOrder(JSON.stringify(params)).then((res) => {
          this.bxtparts = []
          this.list2 = []
          this.bxtparts = res.data.data.ownServiceProductList
          this.addgxs = res.data.data.serviceTaskList
          this.pjcount = res.data.data.productTotal
          this.taskTotalmoney = res.data.data.taskTotal
          this.totalmoney = res.data.data.total
        })
      }
    },
    blurgx () {
      for (let i = 0; i < this.addgxs.length; i++) {
        let params = {serviceTaskList: [{taskName: this.addgxs[i].taskName, taskFee: this.addgxs[i].taskFee, taskNum: this.addgxs[i].taskNum}], garageDiscountAmount: this.preferential}
        calOrder(JSON.stringify(params)).then((res) => {
          this.bxtparts = []
          this.list2 = []
          this.bxtparts = res.data.data.ownServiceProductList
          this.addgxs = res.data.data.serviceTaskList
          this.pjcount = res.data.data.productTotal
          this.taskTotalmoney = res.data.data.taskTotal
          this.totalmoney = res.data.data.total
        })
      }
    },
    blurs () {
      for (let i = 0; i < this.bxtparts.length; i++) {
        let params1 = {productId: this.bxtparts[i].productId, productName: this.bxtparts[i].productName, productBrand: this.bxtparts[i].brand, productNumber: this.bxtparts[i].productCode, productPrice: this.bxtparts[i].productPrice, productQuantity: this.bxtparts[i].productQuantity}
        this.lists2.push(params1)
        let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
        calOrder(JSON.stringify(params)).then((res) => {
          this.bxtparts = []
          this.list2 = []
          this.bxtparts = res.data.data.ownServiceProductList
          this.addgxs = res.data.data.serviceTaskList
          this.pjcount = res.data.data.productTotal
          this.taskTotalmoney = res.data.data.taskTotal
          this.totalmoney = res.data.data.total
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
      let params1 = {productId: this.bxtparts[item].productId, productName: this.bxtparts[item].productName, productBrand: this.bxtparts[item].brand, productNumber: this.bxtparts[item].productCode, productPrice: this.bxtparts[item].productPrice, productQuantity: this.bxtparts[item].productQuantity}
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.list2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
      })
    },
    increase (item) {
      this.bxtparts[item].productQuantity++
      let params1 = {productId: this.bxtparts[item].productId, productName: this.bxtparts[item].productName, productBrand: this.bxtparts[item].brand, productNumber: this.bxtparts[item].productCode, productPrice: this.bxtparts[item].productPrice, productQuantity: this.bxtparts[item].productQuantity}
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.list2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
      })
    },
    reducegx (item) {
      this.addgxs[item].taskNum--
      let params = {serviceTaskList: [{taskName: this.addgxs[item].taskName, taskFee: this.addgxs[item].taskFee, taskNum: this.addgxs[item].taskNum}], garageDiscountAmount: this.preferential}
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.list2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
      })
    },
    increasegx (item) {
      this.addgxs[item].taskNum++
      let params = {serviceTaskList: [{taskName: this.addgxs[item].taskName, taskFee: this.addgxs[item].taskFee, taskNum: this.addgxs[item].taskNum}], garageDiscountAmount: this.preferential}
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.list2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
      })
    },
    del (item) {
      this.modal_loading = true
      let params1 = {productId: this.bxtparts[item].productId, productName: this.bxtparts[item].productName, productBrand: this.bxtparts[item].brand, productNumber: this.bxtparts[item].productCode, productPrice: this.bxtparts[item].productPrice, productQuantity: 0}
      this.lists2.push(params1)
      let params = {ownServiceProductList: this.lists2, garageDiscountAmount: this.preferential}
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.list2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
      })
      setTimeout(() => {
        this.bxtparts.splice(item, 1)
        this.modal_loading = false
        this.modal2 = false
        this.$Message.success('删除成功')
      }, 1000)
    },
    delgx (item) {
      this.modal_loading = true
      let params = {serviceTaskList: [{taskName: this.addgxs[item].taskName, taskFee: this.addgxs[item].taskFee, taskNum: this.addgxs[item].taskNum}], garageDiscountAmount: this.preferential}
      calOrder(JSON.stringify(params)).then((res) => {
        this.bxtparts = []
        this.list2 = []
        this.bxtparts = res.data.data.ownServiceProductList
        this.addgxs = res.data.data.serviceTaskList
        this.pjcount = res.data.data.productTotal
        this.taskTotalmoney = res.data.data.taskTotal
        this.totalmoney = res.data.data.total
      })
      setTimeout(() => {
        this.addgxs.splice(item, 1)
        this.modal_loading = false
        this.modal3 = false
        this.$Message.error('删除成功')
      }, 1000)
    },
    getToday () {
      // 得到今天日期
      let date = new Date()
      this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    comlateorder () {
      this.$store.commit('clearsubmission')
      console.log(this.$store.state.carinfo)
      console.log(this.bxtts)
      let params = {suggestion: this.notes, ownServiceProductList: this.bxtparts, carId: this.$store.state.carinfo.id, userId: this.$store.state.carinfo.userId, maintainMileage: this.mileage, garageDiscountAmount: this.preferential}
      createorder(JSON.stringify(params)).then((res) => {
        console.log(res.data)
        if (res.data.result === 0) {
          this.$Message.success('开单成功!')
          this.$router.push({name: '工单管理'})
        } else {
          alert(res.data.result)
        }
      })
    }
  }
}
</script>
<style scoped lang='less'>
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
.statusbtn{
  width:100%;
  height:40px;
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
    		width:33.3%;
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
  .addtable:after{
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
  }


  .adpj{
    width:100%;
    margin:0 auto;
    padding:20px 0 10px;
    border:1px @cl-ye solid;
  table{
    width:100%;
    margin:10px auto;
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
