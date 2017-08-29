<template>
  <div class="edit-order">
    <div class="edit-title">
      <ul>
        <li>沪A12345</li>
        <li>车主：徐某某</li>
        <li>手机号：15901666040</li>
        <li>车型：大众-迈腾-1.8L-2010年生产</li>
        <li><span class="search-btn" v-if="showstatus[0]">保存编辑</span></li>

        <li><span class="search-btn" v-if="showstatus[1]">修改配件/工项</span></li>

        <li><span class="search-btn" v-if="showstatus[2]">已完成施工</span></li>

        <li><span class="search-btn" v-if="showstatus[3]">结算</span></li>

      </ul>
    </div>

    <div class='addparts'>
      <div class="date-title" style="width:100%;">
        <ul>
          <li>订单号：dow1234567978</li>
          <li>订单时间：2017.07.02</li>
          <li>订单状态：<span class="color-construction">施工中</span> <span class="color-payment">待支付</span> <span class="color-confirmed">待确认</span></li>
          <div class="clearfix"></div>
        </ul>
      </div>

      <accessories></accessories>

      <section class='addtable'>
        <div class="adself" v-show="showzcj">
          <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
          <table   cellpadding="0" cellspacing="0">
            <tr>
              <td></td>
              <td>
                <Select v-model="model1" style="width:300px;margin:0 10px;" size='large'>
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </td>
              <td></td>
              <td></td>
            </tr>

            <tr>


              <td style="width:100px;display: block;">*选择配件分组:</td>
              <td><button :class="{complete: zcjact}" style="height:40px;width:160px;line-height:40px;" class="parst"  @click="addzcjact">常规保养</button></td>
              <td><button :class="{complete: zcjno}" style="height:40px;width:160px;line-height:40px;" class="parst"  @click="addactno">常规维修</button></td>

            </tr>

            <tr>
              <td>*配件名称:</td>
              <td><Input  size="large" placeholder="请输入配件名称" style="width:300px;"></Input></td>
              <td>*数量:</td>
              <td><Input  size="large" placeholder="请输入采购数量" style="width:300px;"></Input></td>
            </tr>

            <tr>
              <td>*采购价格:</td>
              <td><Input  size="large" placeholder="请输入采购价" style="width:300px;"></Input></td>
              <td>*销售价格:</td>
              <td><Input  size="large" placeholder="请输入销售价" style="width:300px;"></Input></td>
            </tr>

            <tr>
              <td>配件品牌:</td>
              <td><Input  size="large" placeholder="请输入配件品牌(选填)" style="width:300px;"></Input></td>
              <td>规格型号:</td>
              <td><Input  size="large" placeholder="请输入规格型号(选填)" style="width:300px;"></Input></td>
            </tr>
          </table>
          <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;">点击确认</button>
        </div>

        <div class="aditem" v-show="showgx">
          <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
          <table   cellpadding="0" cellspacing="0">
            <tr>
              <td>*工项名称</td>
              <td><Input  size="large" placeholder="请输入工项名称" style="min-width:600px;width:65%"></Input></td>
            </tr>

            <tr>
              <td>*工时费</td>
              <td><Input  size="large" placeholder="请输入工时费" style="min-width:600px;width:65%"></Input></td>
            </tr>

            <tr>
              <td>*工项描述</td>
              <td><Input  size="large" placeholder="请输入工项描述" style="min-width:600px;width:65%"></Input></td>
            </tr>
          </table>
          <button class="complete" style="height:40px;width:300px;line-height:40px;margin:30px auto;">点击确认</button>
        </div>
      </section>
      <!-- 添加配件总表 -->

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

          <tr v-for="(bxt,item) in bxtparts" class="updatebtn">
            <td>{{item+1}}</td>
            <td>配件</td>
            <td>{{bxt.parstname}}</td>
            <td>{{bxt.specification}}</td>
            <td>{{bxt.brand}}</td>
            <td><button @click="reduceone(item)">-</button> <input type="text" disabled='disabled' v-model="bxt.partscount" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button  @click="increase(item)">+</button></td>
            <td><Input v-model="bxt.unitprice"  disabled  style="width:100px;height:30px;background:white"></Input></td>
            <td>{{bxt.unitprice * bxt.partscount}}元</td>
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
            <td style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-indent:75%;font-size:18px;" colspan="9">配件总计:￥<span>0.00</span>元</td>
          </tr>

          <tr v-for="(gx, item) in addgxs" class="updatebtn">
            <td>{{item+1}}</td>
            <td>工项</td>
            <td>{{gx.parstname}}</td>
            <td>工时</td>
            <td>{{gx.brand}}</td>
            <td><button  @click="reducegx(item)">-</button> <input type="text" disabled='disabled' v-model="gx.partscount" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button @click="increasegx(item)">+</button></td>
            <td><Input v-model="gx.unitprice"  disabled  style="width:100px;height:30px;background:white"></Input></td>
            <td>{{gx.partscount * gx.unitprice}}</td>
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
            <td colspan="9" style="border-top:1px solid lightgray;border-bottom:1px solid lightgray;text-indent:75%;font-size:18px;" >工时总计:￥<span>40.00</span>元</td>
          </tr>

          <tr>
            <td colspan="9" style="text-indent:75%;font-size:18px;" >工单总计:￥<span>40.00</span>元</td>
          </tr>

          <tr>
            <td colspan="9" style="border-bottom:1px solid lightgray;text-indent:75%;font-size:18px;color:#f69022;" >优惠金额:￥<input type="text" style="width:60px;border:#f69022 1px solid;border-radius:5px;color:#f69022;font-size:16px;text-indent:5px;">元</td>
          </tr>
          <tr>
            <td colspan="9" style="text-indent:75%;font-size:18px;color:#d02d35;" >实收金额:￥<span>40.00</span>元</td>
          </tr>
        </table>
      </section>
    </div>

    <div class="workup-approach">
      <ul>
        <li>进场里程数:  <Input v-model="value" placeholder="20000" style="width: 150px"></Input></li>
        <li><span class="left-date">进场时间：</span>
          <Row style="float:left;">
            <Col span="12">
            <Date-picker type="date" placeholder="2017-08-38" style="width: 200px"></Date-picker>
            </Col>
          </Row>
        </li>
        <li><span class="remarks-width">备注：</span><Input v-model="value6" type="textarea" :rows="4" placeholder="备注文字写这里，备注文字写这里"  style="width: 400px"></Input></li>
      </ul>
    </div>
    <!--------------以下确认按钮---------------------->
      <div class="com-mcen">
        <div class="complete01" @click="clickConfirm">修改完成并保存</div>
      </div>
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
      value: '',
      value6: '',
      model1: '',
      modal2: false,
      modal_loading: false,
      modal3: false,
      value1: '',
      zcjact: true,
      zcjno: false,
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
      bxtparts: [
        {parstname: '外采-机油', specification: 'TD90231_CL-4_20w-50', brand: '杂牌', partscount: '10', unitprice: '15'},
        {parstname: '外采-机油', specification: 'TD90231_CL-4_20w-50', brand: '杂牌', partscount: '10', unitprice: '10'}
      ],
      addgxs: [
        {parstname: '洗车', specification: '工时', brand: '百希特', partscount: '10', unitprice: '15'},
        {parstname: '内饰清洗', specification: '工时', brand: '百希特', partscount: '10', unitprice: '15'}
      ],
      amount: '10',
      activebtn1: false,
      activebtn2: false,
      showbxt: false,
      showzcj: false,
      showgx: false,
      showstatus: [
        true, false, false, false
      ],
      showupdatebtn: true
    }
  },
  methods: {
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
    // addcount (item) {
    //   // 增加使用数量
    //   this.bxtts[item].existing++
    // },
    // delcount (item) {
    //   // 减少使用数量
    //   this.bxtts[item].existing--
    //   if (this.bxtts[item].existing === 0) {
    //     this.bxtts.splice(item, 1)
    //   }
    // },
    reduceone (item) {
      this.bxtparts[item].partscount--
      if (this.bxtparts[item].partscount === 0) {
        this.bxtparts.splice(item, 1)
      }
    },
    increase (item) {
      this.bxtparts[item].partscount++
    },
    bxtconfirm (item) {
      // 确认添加百希特配件
      console.log(this.bxtts.length)
      console.log(this.bxtts)
      // this.bt = JSON.parse(JSON.stringify(this.bxtts))
      // console.log(this.bt[0])
      // this.bxtparts.push(this.bt)
      // console.log(this.bxtparts)
    },
    reducegx (item) {
      this.addgxs[item].partscount--
      if (this.addgxs[item].partscount === 0) {
        this.addgxs.splice(item, 1)
      }
    },
    increasegx (item) {
      this.addgxs[item].partscount++
    },
    del (item) {
      this.modal_loading = true
      setTimeout(() => {
        this.bxtparts.splice(item, 1)
        this.modal_loading = false
        this.modal2 = false
        this.$Message.success('删除成功')
      }, 1000)
    },
    delgx (item) {
      this.modal_loading = true
      setTimeout(() => {
        this.addgxs.splice(item, 1)
        this.modal_loading = false
        this.modal3 = false
        this.$Message.success('删除成功')
      }, 1000)
    },
    clickConfirm () {
      console.log(1)
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
  .addtable{
    width:80%;
    margin:0 auto;
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
  .adtable{
    width:100%;

  table{
    width:100%;
    margin:20px 0;
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
    width: 100px;
    display: block;
  }
  button{
    width:30px;height:30px;background:white;border:1px solid lightgray;
  }
  }
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
</style>

