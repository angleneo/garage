<template>
  <div class='addparts' >
    <section class="addpjbox">
      <div class="car-title">
        <img src="../../assets/images/02-icon.png" alt=""><h3>添加配件</h3>
      </div>
      <accessories></accessories>
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

        <tr v-for="(bxt,item) in bxtparts">
          <td>{{item+1}}</td>
          <td>配件</td>
          <td>{{bxt.parstname}}</td>
          <td>{{bxt.specification}}</td>
          <td>{{bxt.brand}}</td>
          <td><button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reduceone(item)">-</button> <input type="text" disabled='disabled' v-model="bxt.partscount" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increase(item)">+</button></td>
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

        <tr v-for="(gx, item) in addgxs">
          <td>{{item+1}}</td>
          <td>工项</td>
          <td>{{gx.parstname}}</td>
          <td>工时</td>
          <td>{{gx.brand}}</td>
          <td><button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="reducegx(item)">-</button> <input type="text" disabled='disabled' v-model="gx.partscount" style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button style="width:30px;height:30px;background:white;border:1px solid lightgray;" @click="increasegx(item)">+</button></td>
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
</template>
<script>
import accessories from '../../components/resuable/accessories'
export default {
  components: {
    accessories
  },
  data () {
    return {
      modal2: false,
      modal_loading: false,
      modal3: false,
      bxtts: [
        {bxtname: '变速箱油', specation: 'ATF-LLL', brand: '百希特', usedcount: '10', existing: '5', price: '12'},
        {bxtname: '变速齿轮', specation: 'ATC-LLL', brand: '百希特', usedcount: '10', existing: '2', price: '5'},
        {bxtname: '霜之哀伤', specation: 'ATF-LLL', brand: '百希特', usedcount: '10', existing: '12', price: '22'}
      ],
      bt: [],

      bxtparts: [
      {parstname: '外采-机油', specification: 'TD90231_CL-4_20w-50', brand: '杂牌', partscount: '10', unitprice: '15'},
      {parstname: '外采-机油', specification: 'TD90231_CL-4_20w-50', brand: '杂牌', partscount: '10', unitprice: '10'}
      ],
      addgxs: [
      {parstname: '洗车', specification: '工时', brand: '百希特', partscount: '10', unitprice: '15'},
      {parstname: '内饰清洗', specification: '工时', brand: '百希特', partscount: '10', unitprice: '15'}
      ],
      amount: '10'
    }
  },
  methods: {
    // addcount (item) {
    //     // 增加使用数量
    //   this.bxtts[item].existing++
    // },
    // delcount (item) {
    //     // 减少使用数量
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
    // bxtconfirm (item) {
    //     // 确认添加百希特配件
    //   console.log(this.bxtts.length)
    //   console.log(this.bxtts[item].bxtname)
    //   // this.bt = JSON.parse(JSON.stringify(this.bxtts))
    //   // console.log(this.bt[0])
    //   // this.bxtparts.push(this.bt)
    //   // console.log(this.bxtparts)
    // },
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
