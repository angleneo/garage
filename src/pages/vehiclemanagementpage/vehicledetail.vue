<template>
  <div class="edit-order">
    <div class="vehicle-detail">
      <h3>鄂A134562</h3>
      <span class="search-btn">保存修改</span>
    </div>
    <!------------用户车牌------------------>
    <div class="datail-new">
      <h5>基本信息：</h5>
      <div class="datail-li">
        <table>
          <tr>
            <td>车主姓名：张扬</td>
            <td>联系方式：15656565656</td>
            <td>VIN码：1234 5678 9542 1212 1</td>
            <td></td>
          </tr>
          <tr>
            <td>品牌：Jeep</td>
            <td>车系：Wrangler [牧马人]</td>
            <td>排量：3.0</td>
            <td>生产年份：2016年生产</td>
          </tr>
        </table>
      </div>
    </div>
    <!-------------以上基本信息-------------------->
    <div class="datail-new">
      <h5>维修信息：</h5>
      <div class="datail-li">
        <table>
          <tr>
            <td>最新历程：10000 公里</td>
            <td> 下次保养里程：<Input v-model="value" placeholder="请输入..." style="width: 200px"></Input></td>
          </tr>
          <tr>
            <td>最后到店时间：17年07月20日</td>
            <td><span style="float: left;line-height: 59px;">预计保养时间：</span>
                <Row>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
                </Col>
              </Row>
            </td>
          </tr>
        </table>
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
          <tr v-for="(work, item) in worklist">
            <td>{{work.worknumber}}</td>
            <td><a v-goto="'workupdate'">{{work.license}}</a></td>
            <td>{{work.caruser}}</td>
            <td>{{work.userphone}}</td>
            <td>{{work.count}}</td>
            <td>{{work.workstatus}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value: '',
        model1: '',
        worklist: [
          {worknumber: '2017-06-20', license: 'OJMD000820170706002', caruser: '106', userphone: '20', count: '160', workstatus: '线上支付'},
          {worknumber: '2017-06-20', license: 'OJMD000820170706002', caruser: '106', userphone: '20', count: '160', workstatus: '线上支付'},
          {worknumber: '2017-06-20', license: 'OJMD000820170706002', caruser: '106', userphone: '20', count: '160', workstatus: '线下支付'},
          {worknumber: '2017-06-20', license: 'OJMD000820170706002', caruser: '106', userphone: '20', count: '160', workstatus: '线上支付'}
        ]
      }
    }
  }
</script>
<style>
  .datail-table h5{
    font-size: 16px;
    padding-bottom: 15px;
    padding: 10px 20px;
  }
</style>
