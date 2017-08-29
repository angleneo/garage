<template>
  <div class="edit-order" >
    <div class="order-title">
      <ul>
        <li > <Select v-model="model1" style="width:460px;margin:0 10px;"size='large' >
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select></li>
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
        <li><span class="search-btn">查找</span></li>
        <li><span class="search-btn" v-goto="'新建采购单'">新建采购单</span></li>
      </ul>
    </div>
    <!------------------------------>
    <!-------------------工项列表---------------->
    <div class="order-box">
      <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <th>采购单号</th>
            <th>供应商名称</th>
            <th>采购金额合计</th>
            <th>采购单状态</th>
            <th>收获状态</th>
          </tr>
          <tr>
            <td>
              <div><a v-goto="'采购单详情'">NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>未收货</td>
          </tr>
          <tr>
            <td>
              <div><a >NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>部分收货</td>
          </tr>
          <tr>
            <td>
              <div><a >NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>全部收货</td>
          </tr>
          <tr>
            <td>
              <div><a >NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>未收货</td>
          </tr>
          <tr>
            <td>
              <div><a >NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>未收货</td>
          </tr>
          <tr>
            <td>
              <div><a >NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>未收货</td>
          </tr>
          <tr>
            <td>
              <div><a >NPOJMD000820170726535</a></div>
              <div>单据时间：2017-07-20  15:08:41</div>
              <div> 未收货</div>
            </td>
            <td>百希特汽车服务中心0008-唐山大兵</td>
            <td>￥200,000,000,0</td>
            <td>月结</td>
            <td>未收货</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!----------------分页---------------------->
      <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
    </div>
  </div>
</template>
<style scoped>
  .order-table table th {
    background: #fdedb1;
    text-align: center;
    line-height: 60px;
    color: #333;
    width: 20%;
    text-indent: 2.5rem;
  }
  .order-table td{
    width:20%; text-align: center;}
  .order-table div{ line-height:32px;}
  .edit-order {
    width: 99% !important;
    margin: 0 !important;
    margin-top: 20px !important;
    text-align: left;

  }
  .order-title{
    padding:10px ;
    text-align:left;
    line-height:40px;
    padding-left:40px;
    display: grid;
    background:#fff;
    border-radius:10px;
  }
  .order-title ul li{
    float: left;
    padding:0 10px;
    line-height: 36px;
  }
  .search-box {
    width: 300px;
    border-radius:5 px;
    border: @border-line01;
    height: 36px;
    line-height: 36px;
    position: relative;
    display: inline-block;
    padding-left: 10px;
    margin-right: 10px;
  }

  .search-box input{
    border:none;
    height:31px;
    width:240px;
    color:@color-gary;
    border-radius:@mb - 5;
  }
  .search-box img{
    position:absolute;
    right:10px;
    top:5px;
    z-index:999;
  }
  .order-box {
    width:100% !important;
    height: auto !important;
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 20px;
    margin: 20px 0 !important;
  }
  .order-table {
    display: inline-block;
    margin-top:0px!important;
    width: 100%;
    float: left;
  }
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
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
        model1: ''
      }
    }
  }
</script>
