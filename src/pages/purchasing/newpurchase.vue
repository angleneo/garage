<template>
  <div class="edit-order" >
       <div class="purchase-table">
         <table cellpadding="0" cellspacing="0">
           <tr>
             <th colspan="2">*供应商： <Select v-model="model1" style="width:80%">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
             </Select></th>
             <th>*结算方式： <Select v-model="model2" style="width:60%">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
             </Select></th>
             <th>到货时间：<Input v-model="value" placeholder="请选择到货时间(选填)" style="width: 60%; text-indent: 22px;"></Input></th>
           </tr>
           <tr>
             <td>配件分组： <Select v-model="model3" style="width:50%">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
             </Select></td>
             <td>*配件名称： <Input v-model="value" placeholder="请输入配件名称" style="width: 60%"></Input></td>
             <td>配件品牌： <Input v-model="value" placeholder="请输入配件品牌(选填)" style="width: 60%;text-indent: 10px;"></Input></td>
             <td>规格型号： <Input v-model="value" placeholder="请输入规格型号(选填)" style="width: 60%;"></Input></td>
           </tr>
           <tr>

             <td></td>
             <td>*采购数量： <Input v-model="value" placeholder="请输入采购数量" style="width: 60%"></Input></td>
             <td>*采购价格： <Input v-model="value" placeholder="请输入采购价格" style="width: 60%;text-indent:8px;"></Input></td>
             <td>*销售价格：<Input v-model="value" placeholder="请输入销售价格" style="width: 60%"></Input></td>
           </tr>
         </table>
         <div class="btn-r complete01">确认采购</div>
       </div>
    <!------------------------------>
    <!-------------------工项列表---------------->
    <div class="purchase-title" >采购清单：</div>
    <div class="order-box">
      <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <th>序号</th>
            <th>配件名称</th>
            <th>规格型号</th>
            <th>品牌</th>
            <th>配件分组</th>
            <th>采购数量</th>
            <th>已收货数量</th>
            <th>采购单价</th>
            <th>合计</th>
            <th></th>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td style="10%">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td style="10%">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width: 60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>

          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td >
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td>
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td>
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>

          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td>
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>

          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td>
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px;height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>

          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td>
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray;line-height: 30px;float: left;" >-</button>
              <input type="text" disabled='disabled'  style="background:white;width:60px; height:30px;border:1px solid lightgray; float: left; margin-right: -1px;margin-left: -1px;">
              <button style="width:30px;height:30px;background:white;border:1px solid lightgray; float: left; line-height: 30px;" >+</button>
            </td>
            <td><input type="text" class="searchinput"></td>
            <td>366</td>
            <td>36660</td>
            <td><Icon type="trash-a" size="18" ></Icon>删除</td>

          </tr>
          </tbody>
        </table>
      </div>
      <div class="com-mcen">
        <div class="complete01">提交采购</div>
      </div>
      <!----------------分页---------------------->
      <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import '../../assets/css/public.less';
  .btn-r{
    text-align: center;
    display: inline-block;
    float: right;
    margin-right: 20px;
    margin-bottom:20px;
  }
  .purchase-table th{
    text-indent:1.8rem;
    border-bottom:1px solid #f4f4f4;
  }
  .purchase-table td{
    text-indent:1.5rem;
  }
  .purchase-table{
    display: inline-table;
    padding-right: 20px;
    float: right;
    background:#fff;
    width:100%;
    display: inline-block;
  }
  .purchase-table table{
    width: 100%;
    line-height: 65px;
    float: right;
    display: inline-table;

  }
  .com-mcen{
    margin: 100px auto;
    text-align: center;
    width: 300px;
    clear: both;
  }
  .searchinput {
    width: 100px;
    height: 35px;
    border: 1px solid lightgray;
    text-indent: 5px;
    text-align: center;
  }
  .searchinput-red {
    width: 100px;
    height: 35px;
    border: 1px solid red;
    text-indent: 5px;
    text-align: center;
    color:red;
  }
  .edit-order {
    width: 99% !important;
    margin: 0 !important;
    margin-top: 20px !important;
    text-align: left;

  }

  .order-box {
    width:100% !important;
    height: auto !important;
    border-radius: 10px;
    padding-bottom: 20px;
    margin:  0 !important;
    background: #ffffff;
  }
  .order-table {
    display: inline-block;
    margin-top:0px!important;
    width: 100%;
    float: left;
  }
  .order-table table td{
    text-align: left;
    line-height: 60px;
    color: #333;
    padding-left: 0px !important;
    text-indent:20px;
    border-bottom: 1px solid #d1d2d1;
  }
  .purchase-details{
    background:#fff;
    width:100%;
    display: inline-block;
  }
  .purchase-details ul{
    width:75%;
    margin-left:40px;
  }
  .purchase-details li{
    float: left;
    width:40%;
    font-size:16px;
    line-height:50px;
  }
  .color-red{
    color:#ef282a;
    font-size: 20px;
    font-weight: bold;
  }
  .color-orange{
    color:#f3a340;
    font-size: 26px !important;
    font-weight: bold;
  }
  .color-green-on{
    color:#3da577;
    font-size: 20px;
    font-weight: bold;
  }
  .color-red-on{
    color:#ef282a;
    font-size: 20px;
    font-weight: bold;
  }
  .purchase-title{
    background:#fdedb1;
    font-size:20px;
    width:160px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    line-height: 42px;
    margin-bottom: -20px;
    margin-top: 20px;
    display: inline-grid;
  }

  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
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
</style>
<script>
  export default {
    data () {
      return {
        value: '',
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
        model2: '',
        model3: ''
      }
    }
  }
</script>
