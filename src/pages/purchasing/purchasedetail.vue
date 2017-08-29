<template>
  <div class="edit-order" >
    <div class="purchase-details">
      <ul>
        <li class="color-orange">订单号:NPOJMD000820170726535</li>
        <li><span class="color-green-on">● 采购状态：已完成</span> <span class="color-red-on">● 采购状态：未完成</span></li>
        <li><span>供应商：</span>百希特汽车服务中心0008-唐山大兵</li>
        <li><span>结算方式：</span>月结</li>
        <li><span>单据时间：</span>2017-07-20  15：08:41</li>
        <li><span>收货时间：</span>2017-07-20  15：08:41</li>
        <li><span>合计采购数量：</span><span class="color-red">100</span></li>
        <li><span>实际收货数量：</span><span class="color-red">100</span></li>
      </ul>
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
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput-red"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>
          <tr>
            <td>1</td>
            <td> 离合器两件套</td>
            <td>TD959_CI-4_20W-50(18L)</td>
            <td>百希特</td>
            <td>百希特润滑油</td>
            <td><input type="text" class="searchinput"></td>
            <td>0</td>
            <td>366</td>
            <td>36660</td>
          </tr>

          </tbody>
        </table>
      </div>
      <div class="com-mcen">
        <div class="complete01">确认收货</div>
      </div>
      <!----------------分页---------------------->
      <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
    </div>
  </div>
</template>
<style scoped>
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
    margin: 20px 0 !important;
    background: #ffffff;
  }
  .order-table {
    display: inline-block;
    margin-top:0px!important;
    width: 100%;
    float: left;
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
  }

  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
  }

</style>
