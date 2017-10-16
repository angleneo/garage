<template>
  <div class="edit-order">
    <div class="vehicle-detail">
      <h3>{{carinfo.code}}</h3>
      <span class="search-btn" @click="savecarinfo">保存修改</span>
    </div>
    <!------------用户车牌------------------>
    <div class="datail-new">
      <h5>基本信息：</h5>
      <div class="datail-li">
        <table  cellpadding="0" cellspacing="0">
          <tr>
            <td><span>车主姓名：</span>{{carinfo.name}}</td>
            <td><span>联系方式：</span>{{carinfo.phone}}</td>
            <td><span>VIN码：</span>{{carinfo.vincode}}</td>
          </tr>
          <tr>
            <td><span>品牌：</span>{{carinfo.brandName}}</td>
            <td><span>车系：</span>{{carinfo.lineName}}</td>
            <td><span>排量：</span>{{carinfo.displacement}}</td>
            <td><span>生产年份：</span>{{carinfo.productionYear}}年生产</td>
          </tr>
        </table>
      </div>
    </div>
    <!-------------以上基本信息-------------------->
    <div class="datail-new">
      <h5>维修信息：</h5>
      <div class="datail-li">
        <form @submit.prevent="validateBeforeNextroad">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td><span>最后进厂里程数：</span>{{carinfo.mileage}}公里</td>
            <td> <span>下次进厂里程数：</span>
            <Input v-model="carinfo.nextmileage" placeholder="保养公里数" style="width: 200px"  v-validate="'required|numeric|max:9|min:0|min_value:0'"  name="进厂里程数"></Input>
            <span v-show="errors.has('进厂里程数')" style="color:red; position:absolute; margin-left:10px;    width: 200px;">{{ errors.first('进厂里程数') }}</span>
            </td>
          </tr>
          <tr>
            <td><span>最后到店时间：</span>{{latestMaintaintime}}</td>
            <td><span style="float: left;line-height: 59px; ">下次进厂时间：</span>
                <Row>
                <Col span="12">
                <Date-picker type="date" v-model="nextMaintaindate" placeholder="选择日期" style="width: 200px" :options="options6"></Date-picker>
                </Col>
              </Row>
            </td>
          </tr>
        </table>
        </form>
      </div>
    </div>
    <!--------------以上维修信息-------------------------->
    <div class="datail-table">
      <h5>车辆维修/保养记录：</h5>
      <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <th>工单日期</th>
            <th>工单编号</th>
            <th>工单总计</th>
            <th>优惠金额</th>
            <th>实收金额</th>
            <th>支付方式</th>
          </tr>
          <tr v-for="(work, item) in worklist" :key="item">
            <td >{{work.createTime}}</td>
            <td @click="showoneorder(item)"><a @click="model2 = true">{{work.id}}</a>
                <Modal v-model="model2" width="1200">
                    <table class="modeltable"  style="text-align:center;">
                        <tr>
                            <th>序号</th>
                            <th>名称</th>
                            <th>数量</th>
                            <th>配件单价/工时单价</th>
                            <th>配件合计/工时费</th>
                        </tr>

                      <tr v-for="(pj, item) in pjlist" :key="item">
                        <td>{{item+1}}</td>
                        <td>{{pj.productName}}</td>
                        <td>{{pj.productQuantity}}</td>
                        <td>{{pj.productPrice | money}}元</td>
                        <td>{{pj.totalAmount | money}}元</td>
                      </tr>
                      <tr >
                        <td style="padding-right:10px;border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px;" colspan="9" >配件总计:<span>{{orderlists.productAmount | money}}</span>元</td>
                      </tr>

                      <tr v-for="(gx, item) in gxlist" :key="item">
                        <td>{{item+1}}</td>
                        <td>{{gx.taskName}}</td>
                        <td>{{gx.taskNum}}</td>
                        <td>{{gx.taskFee | money}}元</td>
                        <td>{{gx.totalAmount | money}}元</td>
                      </tr>
                      <tr>
                        <td colspan="9" style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;font-size:18px; padding-right:10px;" >工时总计:<span>{{orderlists.taskAmount | money}}</span>元</td>
                      </tr>

                      <tr>
                        <td colspan="9" style="text-align:right;font-size:18px;padding-right:10px;" >工单总计:<span>{{orderlists.productAmount + orderlists.taskAmount | money}}</span>元</td>
                      </tr>

                      <tr>
                       <td colspan="9" style="border-bottom:1px solid lightgray;text-align:right;font-size:18px;color:#f69022;padding-right:10px;" >优惠金额: <span>{{orderlists.garageDiscountAmount}}</span>元</td>
                      </tr>
                      <tr>
                         <td colspan="9" style="text-align:right;font-size:18px;color:#d02d35;padding-right:10px;" >实收金额:<span>{{orderlists.totalAmount | money}}</span>元</td>
                      </tr>
                    </table>
                    <div class="notes">
                        <table>
                            <tr>
                              <td style="text-align:right">进场里程数:</td>
                              <td style="text-align:left;text-indent:10px;">{{orderlists.maintainMileage}}</td>
                              <td style="text-align:right">进场时间:</td>
                              <td style="text-align:left;text-indent:10px;">{{orderlists.createTime}}</td>
                            </tr>
                            <tr>
                              <td style="text-align:right">备注:</td>
                              <td style="text-align:left;text-indent:10px;">{{orderlists.suggestion}}</td>
                            </tr>
                        </table>
                    </div>
                </Modal>
            </td>
            <td>{{work.totalAmount + work.garageDiscountAmount | money}}</td>
            <td>{{work.garageDiscountAmount | money}}</td>
            <td>{{work.totalAmount | money}}</td>
            <td>{{work.payWay | paystatus}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="padge-box-right"><Page :total="pageAmount" @on-change="change" show-elevator></Page></div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import {cardetail, carupdate} from '@/service/carmanage'
import {orderlists, workdetailmsg} from '@/service/workorder'
import {getSessionStorage, setSessionStorage} from '../../utils/mUtils'
export default {
  data () {
    return {
      options6: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      value: '',
      model1: '',
      model2: false,
      modal_loading: false,
      modelbox: false,
      pageAmount: 10,
      carinfo: '',
      carid: '',
      worklist: [],
      orderlists: '',
      pjlist: [],
      gxlist: [],
      nextroad: 100,
      nextMaintaindate: moment(String(new Date())).format('YYYY-MM-DD')
    }
  },
  computed: {
    maintainDay: function () {
      return moment(this.nextMaintaindate).format('YYYY-MM-DD')
    },
    latestMaintaintime: function () {
      if (this.carinfo.maintaintime) {
        return moment(this.carinfo.maintaintime).format('YYYY-MM-DD')
      }
    }
  },
  mounted () {
    this.getOnecardetail()
    this.getOnecarrecords()
  },
  methods: {
    getOnecardetail () {
      this.carid = this.$route.params.id || this.$route.query.id
      this.carid = this.carid ? this.carid : getSessionStorage('car_id_detail_page')
      setSessionStorage('car_id_detail_page', this.carid)
      let params = this.carid
      cardetail(params).then((res) => {
        this.carinfo = res.data.data
        this.nextMaintaindate = res.data.data.nextMaintainDate
        this.pageAmount = res.data.data.totalCount
      })
    },
    getOnecarrecords () {
      this.carid = this.$route.params.id || this.$route.query.id
      this.carid = this.carid ? this.carid : getSessionStorage('car_id_detail_page')
      setSessionStorage('car_id_detail_page', this.carid)
      let params = {carId: this.carid, status: 4}
      let pagestr = '?pageNum=' + 1 + '&pageSize=' + 5
      orderlists(JSON.stringify(params), pagestr).then((res) => {
        console.log(res.data.data.page)
        this.worklist = res.data.data.page
        this.pageAmount = res.data.data.totalCount
      })
    },
    savecarinfo () {
      this.carid = this.$route.params.id || this.$route.query.id
      let params = {id: this.carid, nextMileage: this.carinfo.nextmileage, nextMaintainDate: this.maintainDay}
      carupdate(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.success('保存车辆信息成功！')
          this.$router.push({name: '车辆管理'})
        }
      })
    },
    showoneorder (item) {
      let params = this.worklist[item].id
      workdetailmsg(params).then((res) => {
        console.log(res.data.data)
        this.orderlists = res.data.data
        this.pjlist = res.data.data.serviceProductList
        this.gxlist = res.data.data.serviceTaskList
      })
    },
    change (page) {
      this.carid = this.$route.params.id || this.$route.query.id
      let params = {carid: this.carid}
      let pagestr = '?pageNum=' + page + '&pageSize=' + 5
      orderlists(JSON.stringify(params), pagestr).then((res) => {
        this.worklist = res.data.data.page
        this.pageAmount = res.data.data.totalCount
      })
    },
    validateBeforeNextroad () {
      this.$validator.validateAll({进厂里程数: this.carinfo.nextmileage}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.savecarinfo()
          return
        }
        this.$Message.warning('请添加正确的进厂里程数')
      })
    }
  }
}
</script>
<style scoped lang='less'>
  .datail-li span{ width: 130px; text-align: right; display: inline-table;}
  .datail-table h5{
    font-size: 16px;
    padding-bottom: 15px;
    padding: 10px 20px;
  }
  .modeltable{
    width:100%;
    margin-top:15px;
      th{
        background:#fdedb1;
        height:65px;
      }
      td{
        height:65px;
      }
  }
.notes{
  width:100%;
  border-top:1px solid lightgray;
    table{
      width:30%;
        td{
          height:60px;
        }
    }
}
</style>
