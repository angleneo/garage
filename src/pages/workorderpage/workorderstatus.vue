<template>
    <div class="edit-order">
      <div class="edit-title">
        <ul>
          <li>{{orderone.carCode}}</li>
          <li>车主：{{orderone.userName}}</li>
          <li>手机号：{{orderone.userPhone}}</li>
          <li>车型：{{orderone.carModel}}</li>
          <li><span class="search-btn"  @click="updateorder" v-show="btnshow[0]" v-goto="'工单编辑'" data-key="id" :data-value="orderone.id">修改配件/工项</span>
          <li><span class="search-btn" @click="modal3 = true" v-show="btnshow[1]" >客户已付款</span>
              <Modal v-model="modal3" @on-ok="ok" title="收款确认" width='450'>
                  <h2 style="text-align:center;">客户已付款<span style="color:red;margin:0 5px">{{orderone.totalAmount}}</span>元，是否确认？</h2>      
              </Modal> 
          </li>
          <li><span class="search-btn"  @click="modal2 = true" v-show="btnshow[2]">已完成施工</span>
              <Modal v-model="modal2" width='450' @on-ok="okorder" style="text-align:center;">
                  <table style="margin:10px auto;" class="comlatemodelbox">
                      <tr>
                        <td>下次进厂时间:</td>
                        <td>
                          <Row>
                              <Col span="12">
                                  <DatePicker name="进厂时间" type="date" v-model="nexttime" placeholder="请输入下次进厂时间" style="width: 200px" :options="options2"></DatePicker>
                              </Col>
                            </Row>
                        </td>
                      </tr>
                      <tr>
                        <td>下次进厂里程数:</td>
                        <td><Input name="进厂里程数" size="large" v-model="nextroad" placeholder="请输入下次进厂里程数" style="width:200px;"></Input></td>
                      </tr>
                      <tr>
                        <td>接待:</td>
                        <td><Input  size="large" v-model="recep" placeholder="请输入接待人员姓名" style="width:200px;"></Input></td>
                      </tr>
                      <tr>  
                        <td>技师:</td>
                        <td><Input  size="large" v-model="oper" placeholder="请输入服务技师姓名" style="width:200px;"></Input></td>
                      </tr>
                  </table>
              </Modal>      
          </li>
          <li><span class="search-btn" v-show="btnshow[3]" @click="MyPreview">打印工单</span><span style="color:blue;font-size:16px;margin:0 0 0 20px;" v-show="btnshow[3]">打印工单请</span><a v-show="btnshow[3]" href="http://imagets1.cds.bakheet.cn/Lodop/CLodop_Setup_for_Win32NT.exe" style="color:blue;font-size:16px;margin:0 20px 0 0;text-decoration:underline;">下载插件</a></li>
        </ul>
      </div>

      <div class='addparts'>
        <div class="date-title" style="width:100%;">
          <ul>
            <li>订单号：{{orderone.id}}</li>
            <li>订单时间：{{orderone.createTime}}</li>
            <li>订单状态：<span :class="{'fa-clock-o': orderone.status === 0, 'color-payment': orderone.status === 1, 'color-payment': orderone.status === 2, 'color-construction': orderone.status === 3, 'fa-check-circle-o': orderone.status === 4}">{{orderone.status | status}}</span></li>
            <div class="clearfix"></div>
          </ul>
        </div>
        <!-- 添加配件总表 -->

        <section class="bxttable">
          <table   cellpadding="0" cellspacing="0" id="tt">
            <tr>
              <th>序号</th>
              <th>分类</th>
              <th>名称</th>
              <th>规格型号</th>
              <th>品牌</th>
              <th>数量</th>
              <th>配件单价/工时单价</th>
              <th>配件合计/工时费</th>
            </tr>

            <tr v-for="(bxt,item) in bxtparts" :key="item" class="updatebtn">
              <td>{{item+1}}</td>
              <td>配件</td>
              <td>{{bxt.productName}}</td>
              <td>{{bxt.productModel}}</td>
              <td>{{bxt.productBrand}}</td>
              <td>{{bxt.productQuantity}}</td>
              <td><Input v-model="bxt.productPrice"  disabled  style="width:100px;height:30px;background:white"></Input></td>
              <td>{{bxt.totalAmount}}元</td>
            </tr>
            <tr id='productTotal'>
              <td style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;padding-right:10px;font-size:18px;" colspan="9">配件总计:￥<span>{{orderone.productAmount}}</span>元</td>
            </tr>

            <tr v-for="(gx, item) in addgxs" :key="item" class="updatebtn">
              <td>{{item+1}}</td>
              <td>工项</td>
              <td>{{gx.taskName}}</td>
              <td></td>
              <td></td>
              <td>{{gx.taskNum}}</td>
              <td><Input v-model="gx.taskFee"  disabled  style="width:100px;height:30px;background:white"></Input></td>
              <td>{{gx.totalAmount}}</td>
            </tr>
            <tr id='taskTotal'>
              <td colspan="9" style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-align:right;padding-right:10px;font-size:18px;" >工时总计:<span>{{orderone.taskAmount}}</span>元</td>
            </tr>

            <tr id='totalCount'>
              <td colspan="9" style="text-align:right;padding-right:10px;font-size:18px;" >合计金额:<span>{{orderone.productAmount + orderone.taskAmount}}</span>元</td>
            </tr>

            <tr id='discount'>
              <td colspan="9" style="border-bottom:1px solid lightgray;text-align:right;padding-right:10px;font-size:18px;color:#f69022;" >优惠金额: <span>{{orderone.garageDiscountAmount}}</span>元</td>
            </tr>
            <tr id='totalAmount'>
              <td colspan="9" style="text-align:right;padding-right:10px;font-size:18px;color:#d02d35;" >实收金额:<span>{{orderone.totalAmount}}</span>元</td>
            </tr>
          </table>
        </section>
      </div>

      <div class="workup-approach">
        <table>
          <tr>
            <td><span class="remarks-width">进场时间：</span>{{orderone.createTime}}</td>
            <td><span class="remarks-width">进场里程数：</span>{{orderone.maintainMileage}}</td>
          </tr>
          <tr>
            <td colspan="2"> <span class="remarks-width" style=" vertical-align: top;">备注：</span>
              <textarea style="width:490px; height:200px; display: inline-block; border:none; overflow-y:hidden; resize:none;outline:none; line-height:22px; color：#ccc; ">{{orderone.suggestion}}</textarea>
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import $ from 'jquery'
  import accessories from '../../components/resuable/accessories'
  import {workdetailmsg, updatepayed, updateFinish} from '@/service/workorder'
  import {initCLodop, getLodop} from '../../common/LodopFuncs'
  import {getSessionStorage, setSessionStorage} from '../../utils/mUtils'
  export default {
    components: {
      accessories
    },
    computed: {
      maintainDay: function () {
        if (this.orderone === '' || this.orderone.maintainTime === '') {
          return ''
        }
        return moment(this.orderone.maintainTime).format('YYYY-MM-DD')
      }
    },
    data () {
      return {
        options2: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        model1: '',
        modal2: false,
        modal3: false,
        value1: '',
        zcjact: true,
        zcjno: false,
        orderone: '',
        btnshow: [false, false, false, false],
        oper: '',
        recep: '',
        nextroad: '',
        nexttime: moment(String(new Date())).format('YYYY-MM-DD'),
        btns: [
          {name: '添加百希特配件'},
          {name: '添加自采件'},
          {name: '添加工项'}
        ],
        bxtts: [
          {bxtname: '变速箱油', specation: 'ATF-LLL', brand: '百希特', usedcount: '10', existing: '5', price: '12'},
          {bxtname: '变速齿轮', specation: 'ATC-LLL', brand: '百希特', usedcount: '10', existing: '2', price: '5'},
          {bxtname: '霜之哀伤', specation: 'ATF-LLL', brand: '百希特', usedcount: '10', existing: '12', price: '22'}
        ],
        bt: [],
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        bxtparts: [],
        addgxs: [],
        amount: '10',
        activebtn1: false,
        activebtn2: false,
        showbxt: false,
        showzcj: false,
        showgx: false,
        showstatus: [
          true, false, false, false
        ],
        showupdatebtn: true,
        workid: '',
        delItem: -1
      }
    },
    mounted () {
      var LODOP
      new Promise(function () {
        initCLodop()
      }).then(function () {
        LODOP = getLodop()
      })
      this.getWorkorderstatus()
    },
    computed: {
      maintainDay: function () {
        return moment(this.nexttime).format('YYYY-MM-DD')
      }
    },
    methods: {
      getWorkorderstatus () {
        this.workid = this.$route.params.id || this.$route.query.id
        this.workid = this.workid ? this.workid : getSessionStorage('order_id_detail_page')
        setSessionStorage('order_id_detail_page', this.workid)
        let params = this.workid
        workdetailmsg(params).then((res) => {
          this.orderone = res.data.data
          if (res.data.data.status === 0) {
            this.btnshow = [false, false, false, false]
          } else if (res.data.data.status === 1) {
            this.btnshow = [true, true, false, false]
          } else if (res.data.data.status === 2) {
            this.btnshow = [false, true, false, false]
          } else if (res.data.data.status === 3) {
            this.btnshow = [false, false, true, false]
          } else if (res.data.data.status === 4) {
            this.btnshow = [false, false, false, true]
          }
          this.bxtparts = res.data.data.serviceProductList
          this.addgxs = res.data.data.serviceTaskList
        })
      },
      closeaddcar () {
        this.addcarmsg = false
        this.showbxt = false
        this.showzcj = false
        this.showgx = false
      },
      addzcjact () {
        this.zcjact = true
        this.zcjno = false
      },
      addactno () {
        this.zcjno = true
        this.zcjact = false
      },
      addbxt () {
        this.activebtn = true
        this.showbxt = true
        this.showzcj = false
        this.showgx = false
        this.activebtn1 = false
        this.activebtn2 = false
      },
      addzcj () {
        this.showbxt = false
        this.showzcj = true
        this.showgx = false
        this.activebtn1 = true
        this.activebtn2 = false
        this.activebtn = false
      },
      addgx () {
        this.unactivebtn = false
        this.showbxt = false
        this.showzcj = false
        this.showgx = true
        this.activebtn1 = false
        this.activebtn2 = true
        this.activebtn = false
      },
      bxtconfirm (item) {
        console.log(this.bxtts.length)
        console.log(this.bxtts)
      },
      clickConfirm () {
        console.log(1)
      },
      updateorder () {
        this.$store.commit('submissionbtn')
      },
      ok () {
        this.workid = this.$route.params.id || this.$route.query.id
        let params = this.workid
        updatepayed(params).then((res) => {
          if (res.data.result === 0) {
            this.$Message.info('收款成功!')
            this.getWorkorderstatus()
          }
        })
      },
      okorder () {
        this.workid = this.$route.params.id || this.$route.query.id
        let vid = this.workid
        let params = {receptionist: this.recep, operator: this.oper, nextMileage: this.nextroad, nextUpkeepTime: this.nexttime}
        updateFinish(vid, JSON.stringify(params)).then((res) => {
          if (res.data.result === 0) {
            this.$Message.info('订单完成!')
            this.getWorkorderstatus()
          }
        })
    },
    MyPreview () {
      this.AddTitle()
      LODOP.PREVIEW()
    },
    AddTitle () {
      LODOP.PRINT_INIT("结算单");
      LODOP.ADD_PRINT_TEXT(26, 2, 797, 30, "结算单");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 24);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(70, 3, 797, 27, "店家名称：" + this.orderone.companyName);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.ADD_PRINT_TEXT(4, 557, 189, 20, "单据日期：" + this.orderone.createTime);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(70, 30, 339, 20, "单号：" + this.orderone.id);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(70, 597, 149, 27, "服务电话：");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_LINE(88, 30, 89, 732, 0, 1);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      var inFactoryMileage = 0;
      LODOP.ADD_PRINT_TEXT(122, 589, 150, 20, "进场里程：" + this.orderone.maintainMileage);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(122, 49, 139, 20, "车牌号码：" + this.orderone.carCode);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(122, 311, 139, 20, "客户名称：" + this.orderone.userName);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(150, 49, 299, 20, "车辆车型：" + this.orderone.carModel);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(104, 30, 139, 20, "车辆信息：");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(230, 30, 139, 20, "工单信息：");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      var table = "<style> table,td,th {border: 1px solid black;border-style: solid;border-collapse: collapse;font-size: 12px;text-align: center}</style>\n<table border=\"1\" style=\"width:100%\">\n<tr>\n  <td>序号</td>\n  <td>分类</td>\n  <td>名称</td>\n  <td>品牌</td>\n   <td>数量</td>\n  <td>配件单价/工时单价</td>\n  <td>配件合计/工时费</td>\n</tr>\n";
      for (var i=0;i<this.bxtparts.length;i++){
        if (this.bxtparts[i].productBrand == undefined) {
          this.bxtparts[i].productBrand = '-'
        }
        
        table += "<tr><td>" + (i+1) + "</td><td>配件</td><td>" + this.bxtparts[i].productName + "</td><td>" + this.bxtparts[i].productBrand + "</td>" +
      "<td>" + this.bxtparts[i].productQuantity + "</td><td>" + this.bxtparts[i].productPrice + "</td><td>" + this.bxtparts[i].totalAmount + "元</td></tr>"
      }
      for (var j=0;j<this.addgxs.length;j++){
          table += "<tr><td>" + (j+1) + "</td><td>工项</td><td>" + this.addgxs[j].taskName + "</td><td>" + '' + "</td>" +
         "<td>" + this.addgxs[j].taskNum + "</td><td>" + this.addgxs[j].taskFee + "</td><td>" + this.addgxs[j].totalAmount + "元</td></tr>";
      }
      table += "</table>";
      var he = 40 * 340;
      if(he>360){
        he=360;
      }
      LODOP.ADD_PRINT_TABLE(280, 41, 690, he, table);
      var lpage=200;
      LODOP.ADD_PRINT_TABLE(280, 41, 690, he, table);
      LODOP.ADD_PRINT_HTM(500 + he, 610, 200 + he, 15,"<font style='font-size:12px' format='ChineseNum'><span tdata='pageNO'>当前是第##页</span>/<span tdata='pageCount'>共##页</span></font>");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_LINE(522 + he, 50, 523 + he, 737, 0, 1);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_LINE(268, 30, 269, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(500 + he, 70, 500 + he, 20, "费用详情：");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(540 + he, 69, 199 + he, 20, "配件合计：" + this.orderone.productAmount + "元");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(540 + he, 344, 199 + he, 20, "工时合计："+ this.orderone.taskAmount + "元");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(540 + he, 613, 199 + he, 20, "工单合计："  + (this.orderone.productAmount + this.orderone.taskAmount) + "元");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(566 + he, 613, 199 + he, 20, "优惠金额：" + this.orderone.garageDiscountAmount + "元");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_LINE(590 + he, 30, 591 + he, 737, 0, 1);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.ADD_PRINT_TEXT(600 + he, 600, 199 + he, 30, "实收金额："  + this.orderone.totalAmount + "元");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_LINE(985,30,985,737,4,1);
      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
    }
  }
}

</script>
<style scoped lang='less'>
  @import '../../assets/css/public.less';
  @cl-ye:#fdedb1;
  h3{display:inline-block;font-size:18px;}
 textarea.ivu-input {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
    font-size: 14px;
    height: 201px;
    min-height: 200px;
}
 .ivu-input {
    display: inline-block;
    overflow-y: hidden;
    outline: none;
    resize: none;
    width: 63%;
    height: 52px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #fff;
    border-radius: 4px;
    color: #495060;
    background-color: #fff !important;
    background-image: none;
    /* position: relative; */
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
    .date-title{
      text-align: left;
      padding:@mb;
  & li{
      float: left;
      padding-left:@mb + 40;
      font-size:@font18 + 2;
      line-height: 60px;
    }
  .color-construction{color:#8379d2;}
   .color-confirmed{ color:#49a6b7;}
  .color-payment{ color:#f19118;}
  }
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
  .addheader{
    font-family:"Noto Sans CJK SC", "Source Han Sans CN";
    width:100%;
    height:85px;
    position:relative;
  .addbtn{
    width:90%;
    height:50px;
    margin:0 auto;
  ul>li{
    float:left;
    width:50%;
    height:100%;
  button{
    margin-top:10px;
    width:305px;
    height:60px;
  }
  }
  }
  .addheader-tip{
    position:absolute;
    font-size:18px;
    height:20px;
    line-height:20px;
    top:0;
    left:0;
  img{
    vertical-align: middle;
    margin-right:10px;
  }
  }
  }
  .updatebtn button{
    width:30px;height:30px;background:white;border:1px solid lightgray;
  }
  .addsearch{
    width:100%;
    margin:0 auto;
    padding:20px 0 10px;
    border:1px @cl-ye solid;
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
  .remarks-width{
    width:95px;
    text-align: right;
    display: inline-block;
  }
  .workup-approach table{
    line-height: 52px;
    font-size: 14px;
  }

  .comlatemodelbox td{
    height:50px;
    font-size:16px;
  }
   .comlatemodelbox td:first-child{
    text-align:right;
    padding-right:20px;
   }
   .comlatemodelbox td input{
    text-indent:10px;
    margin-left:10px;
   }
</style>


