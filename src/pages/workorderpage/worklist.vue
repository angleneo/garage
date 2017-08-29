<template>
	<div class="order-box">
		<div class="order-title">
      <ul>
        <li class="search-box"><input type="text" placeholder="请输入工单编号"> <img src="../../assets/images/search-icon.png" alt="" class="img-pa"> </li>
        <li>
          <Select v-model="model1" style="width:160px;margin:0 10px;"size='large' >
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <Select v-model="model1" style="width:160px;margin:0 10px;"size='large' >
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <Row>
            <Col span="12">
            <Date-picker type="date" placeholder="选择日期" style="width:160px"></Date-picker>
            </Col>
          </Row>
        </li>
        <li><span class="search-btn">查找</span></li>
      </ul>
    </div>

    <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <th>工单编号</th>
            <th>车牌号码</th>
            <th>车主姓名</th>
            <th>联系方式</th>
            <th>工单总价</th>
            <th>订单状态</th>
            <th>支付方式</th>
            <th>工单日期</th>
          </tr>
          <tr v-for="(work, item) in worklist">
            <td><a v-goto="'工单编辑'">{{work.worknumber}}</a></td>
            <td>{{work.license}}</td>
            <td>{{work.caruser}}</td>
            <td>{{work.userphone}}</td>
            <td>{{work.count}}</td>
            <td>{{work.workstatus}}</td>
            <td>{{work.onlinepay}}</td>
            <td>{{work.paydate}}</td>
          </tr>

          </tbody>
        </table>
    </div>
    <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
	</div>
</template>
<style scoped>
  .order-box {
    width: 99% !important;
    height: auto !important;
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 20px;
    margin: 20px 0 !important;
  }
</style>
<script>
  export default {
    data () {
      return {
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
        model1: '',
        worklist: [
         {worknumber: 'NPOJMD000820170726535', license: '冀BP555A', caruser: '于先生', userphone: '18712882222', count: '160', workstatus: '待确认', onlinepay: '线上支付', paydate: '2017-07-06'},
         {worknumber: 'NPOJMD000820170726535', license: '冀BP555A', caruser: '于先生', userphone: '18712882222', count: '160', workstatus: '待确认', onlinepay: '线上支付', paydate: '2017-07-06'},
         {worknumber: 'NPOJMD000820170726535', license: '冀BP555A', caruser: '于先生', userphone: '18712882222', count: '160', workstatus: '待确认', onlinepay: '线上支付', paydate: '2017-07-06'},
         {worknumber: 'NPOJMD000820170726535', license: '冀BP555A', caruser: '于先生', userphone: '18712882222', count: '160', workstatus: '待确认', onlinepay: '线上支付', paydate: '2017-07-06'}
        ]
      }
    }
  }
</script>
