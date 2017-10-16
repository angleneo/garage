<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <ul>
        <li class="depot-h1">{{infoname.name}}</li>
        <li>客户经理：{{infoname.contactName}}</li>
        <li><span class="search-btn" @click="savefactoryname">保存修改</span></li>
      </ul>
    </div>

    <div class="usermessage">
      <h5>基本信息：</h5>
      <table class="usertable">
        <tr>
          <td>联系人:</td>
          <td>{{infoname.contactName}}</td>
          <td>联系方式:</td>
          <td>{{infoname.contactPhone}}</td>
        </tr>
        <tr>
          <td>持卡人:</td>
          <td>{{infoname.cardholder}} </td>
          <td>开户行:</td>
          <td>{{infoname.bankName}}</td>
          <td style="text-indent:5px;">银行卡号:</td>
          <td>{{infoname.bankCardNum}}</td>
        </tr>
      </table>
    </div>

    <div class="datail-new">
      <h5>地址信息：</h5>
      <table>
        <tr>
            <td>省份:</td>
            <td>{{infoname.province}}</td>
        </tr>
        <tr>
            <td>城市:</td>
            <td>{{infoname.city}}</td>
        </tr>
        <tr>
            <td>地区:</td>
            <td>{{infoname.district}}</td>
        </tr>
        <tr>
            <td>详细地址:</td>
            <td><Input v-model="infoname.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width:400px" placeholder="请输入详细地址"></Input></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped lang='less'>
  .datail-new td{
    /*text-indent:10px;*/
    width: 50%;
    min-width: 80px;
  }
  .address-li span{
    width: 100px;
    text-align: right;
    display: inline-block;
  }
  .usermessage{
    width:100%;
    height:150px;
    background:white;
    margin-top:15px;
          h5{
            width:100%;
            text-align: left;
            text-indent:20px;
            font-size:16px;
            padding-bottom: 15px;
          }
  }
  .usertable{
    display:block;
    margin-left:35px;
  }
  .usertable td{
    height:50px;
    padding:0 20px;
    font-size:16px;
  }
  .usertable table td:nth-child(even){
    text-align:right;
  }
  .usertable table td:nth-child(odd){
    text-align:left;
  }
  .vehicle-detail {
    text-align: left;
    background: #ffffff;
    line-height: 60px;
    border-radius: 10px;
    padding-left: 40px;
    display: inline-block;
    width: 100%;
  }
  .vehicle-detail li{
    font-size:18px;
    float: left;
    padding-right:20px;
  }
.depot-h1{
  font-size:24px !important;
  font-weight: bold;
  color:#f3a340;
  margin-right:40px;
}
  .address-li{
    width:80%;
    font-size:16px;
    padding-left:30px;
  }
  .address-li li{
    line-height:50px;
  }
  .datail-new table{
    width:30%;
    font-size:16px;
        td{
          height:50px;
        }
        td:first-child{
          text-align:right;
        }
        td:last-child{
          text-align:left;
          padding-left:20px;
        }
  }

</style>
<script>
import {information, garagedite} from '@/service/home'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      valueaddress: '',
      infoname: ''
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getinformation()
  },
  methods: {
    getinformation () {
      let params = {}
      information(params).then((res) => {
        this.infoname = res.data.data
      })
    },
    savefactoryname () {
      let params = {address: this.infoname.address}
      garagedite(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.success('修改成功！')
        } else {
          this.$Message.error('修改信息有误！')
        }
      })
    }
  }
}
</script>
