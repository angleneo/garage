<template>
  <div class="edit-order" >
       <div class="purchase-table">
         <table cellpadding="0" cellspacing="0" style="width:100%">
           <tr>
             <td>*供应商： <Select v-model="model1" style="width:380px"  placeholder="请选择供应商名称">
               <Option v-for="item in gysList" :value="item.id" :key="item.id">{{ item.name }}</Option>
             </Select>
             </td>
             <td>*结算方式： <Select v-model="model2" style="width:210px"  placeholder="月结">
               <Option v-for="item in paylist" :value="item.statementType" :key="item.statementType">{{item.name}}</Option>
             </Select>
             </td>
             <td>
              <span style="float:left; line-height: 30px;">到货时间：</span>
               <Row>
                   <Col span="12">
                   <DatePicker v-model="datahuo" type="date" :options="options3"  format="yyyy/MM/dd" placeholder="预计到货时间" style="width: 200px" ></DatePicker>
                   </Col>
              </Row>
              </td>
           </tr>
        </table>
    </div>
    <div @click="sendmsg">
          <purchase :msg="msglist"></purchase>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import '../../assets/css/public.less';
  .access{ background:#fff;
    display: block;}
  .purchase-table {
    background:#fff;
    display: block;
    padding: 10px;
  }
  .ivu-select-item {
    padding: 7px 16px 8px;
    font-size: 14px!important;
    width: 100%;
    text-align: center;
  }
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .test-price{
    text-align:right;
    width: 96%;
    display: inline-block;
    font-size:@font18;
    & i{
     font-style: normal;
      }
  }
  .btn-r{
    text-align: center;
    display: inline-block;
    float: right;
    margin-right:60px;
    margin-bottom:20px;
  }
  .ivu-modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.1) !important;
    height: 100%;
    z-index: 1000;
  }
.purchase-table table td{ text-align: left; }
</style>
<script>
import moment from 'moment'
import {supplierlist} from '@/service/supplier'
import purchase from '../../components/resuable/purchase'
export default {
  components: {
    purchase
  },
  data () {
    return {
      ss: '',
      arrivetime: '',
      gysList: [
        {
          id: '',
          name: '北京市'
        }
      ],
      paylist: [
        {
          statementType: '1',
          name: '月结'
        },
        {
          statementType: '0',
          name: '现结'
        }
      ],
      model1: '',
      model2: '1',
      datahuo: moment(String(new Date())).format('YYYY-MM-DD'),
      msglist: '',
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  computed: {
    maintainDay: function () {
      return moment(this.datahuo).format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.getSuppierlist()
  },
  methods: {
    getSuppierlist () {
      let params = {}
      let pagestr = '?pageNum=' + 1 + '&pageSize=' + 10000
      supplierlist(JSON.stringify(params), pagestr).then((res) => {
        this.gysList = res.data.data.list
      })
    },
    sendmsg () {
      this.msglist = {supplierCompanyId: this.model1, payType: this.model2, expectedArrivalTime: this.datahuo}
    }
  }
}
</script>
