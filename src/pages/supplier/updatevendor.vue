<template>
  <div>
    <section class="searchvendor">
      <div class="searchbox">
        <input type="text" v-model="details.name" disabled="disabled">
        <Select  size="large" style="width:90px;float:left;margin-top:15px;" disabled="disabled" placeholder="现结">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <button class="search-btn" style="margin-top:15px;margin-left:20px;float:left;" @click="saveaddress">保存修改</button>
        <div class="clearfix"></div>
      </div>
    </section>

    <section class="basemessage">
      <span>基本信息:</span>
      <table>
        <tr>
          <td>联系人:</td>
          <td>{{details.contactName}}</td>
          <td>联系方式:</td>
          <td>{{details.contactPhone}}</td>
        </tr>
      </table>
    </section>

    <section class="addressmessage">
      <span>地址信息:</span>
      <div class="list-vendor">
        <ul>
          <li><i>省份：</i>{{details.province}}</li>
          <li><i>城市：</i>{{details.city}}</li>
          <li><i>地区：</i>{{details.district}}</li>
          <li><i>具体地址：</i><Input v-model="addressmsg" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width:400px" placeholder="请输入详细地址"  v-validate="'required|max:200|min:0'" name="具体地址"></Input>
          <div v-show="errors.has('具体地址')"  style="color:red; margin-left:80px;">{{ errors.first('具体地址') }}</div>
          </li>
        </ul>
      </div>
     <!-- <cityparts></cityparts>-->
    </section>
  </div>
</template>
<style scoped>
  .list-vendor{
    width:100%;
    font-size: 14px;
  }
  .list-vendor li{ width:100%; float:left; line-height: 40px; text-align: left; margin-left:40px;}
  .list-vendor li i{ font-style: normal; width: 80px; text-align: right; display: inline-table;}
  .list-vendor span{ float:left;}
  .basemessage i{ font-style: normal;}
  .clearfix{
    content:'';
    clear:both;
    display:block;
  }
  .searchvendor{
    width:99%;
    height:70px;
    background:white;
    margin-top:20px;
    border-radius:10px;
  }
  .searchbox{
    width:45%;
  }
  .searchbox input{
    margin-top:15px;
    margin-left:30px;
    float:left;
    width:30%;
    min-width:220px;
    height:35px;
    border:1px solid lightgray;
    border-radius:5px;
    text-indent:5px;
    color:#999;
  }
  .basemessage{
    margin:20px 0;
    width:99%;
    height:150px;
    background:white;
    border-radius:10px;
  }
  .basemessage span{
    min-width:150px;
    height:45px;
    line-height:45px;
    display:block;
    text-align:left;
    font-size:18px;
    text-indent:15px;
  }
  .basemessage table{
    margin-left:50px;
  }
  .basemessage table tr td{
    height:75px;
    padding:0 10px;
  }
  .basemessage table tr td input{
    margin-left:10px;
    width:210px;
    height:35px;
    border:1px lightgray solid;
    text-indent:5px;
    color:#999999;
  }
  .addressmessage{
    width:99%;
    height:400px;
    background:white;
    border-radius:10px;
  }
  .addressmessage span{
    min-width:150px;
    height:45px;
    line-height:45px;
    display:block;
    text-align:left;
    font-size:18px;
    text-indent:15px;
  }
  .address{
    width:45%;
  }
</style>
<script>
  import {details, supplierupdate} from '@/service/supplier'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        gysid: '',
        details: '',
        modelstatus: '',
        supplierone: '',
        addressmsg: '',
        cityList: [
          {
            value: 'beijing',
            label: '现结'
          },
          {
            value: 'chongqing',
            label: '月结'
          }
        ]
      }
    },
    computed: {
      ...mapState(['tokenid'])
    },
    mounted () {
      this.getdetails()
    },
    methods: {
      getdetails () {
        this.gysid = this.$route.params.id || this.$route.query.id
        let params = this.gysid
        details(params).then((res) => {
          this.details = res.data.data
          this.addressmsg = res.data.data.address
        })
      },
      saveaddress () {
        this.gysid = this.$route.params.id || this.$route.query.id
        let params = {id: this.gysid, address: this.addressmsg}
        supplierupdate(JSON.stringify(params)).then((res) => {
          if (res.data.result === 0) {
            this.$Message.success('修改成功！')
            this.$router.push({name: '供应商管理'})
          }
        })
      }
    }
  }
</script>
 