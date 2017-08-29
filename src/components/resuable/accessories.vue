<template>
	<div class="access">
	  <div class='addbtn'>
        <ul >
        <li><button :class='{complete:activebtn}' class="parst" @click="addpj">{{btns[0].name}}</button></li>
        <li><button :class='{complete:activebtn1}' class="parst" @click="addzcj">{{btns[1].name}}</button></li>
        <li><button :class='{complete:activebtn2}' class="parst" @click="addgx">{{btns[2].name}}</button></li>
        <div class='clearfix'></div>
          </ul>
      </div>


    <section class='addtable'>
	<div class="adpj"  v-show="showpj">
     	<div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>

      <div class="statusbtn">
		<button :class="{complete: zcjact}" style="height:40px;width:160px;line-height:40px;" class="parst" @click="addzcjact">常规保养</button>
		<button :class="{complete: zcjno}" style="height:40px;width:160px;line-height:40px;" class="parst" @click="addactno">常规维修</button>
      </div>
       <table>
          <tr>
				<th>配件名称</th>
				<th>规格型号</th>
				<th>品牌</th>
				<th>使用数量</th>
				<th>现存数量</th>
				<th>价格</th>
          </tr>
          <tr>
				<td>变速箱油</td>
				<td>ATF-LLL(1L)</td>
				<td>百希特</td>
				<td>10</td>
				<td><button style="width:30px;height:30px;background:white;border:1px solid lightgray;">-</button> <input type="text" disabled='disabled'  style="background:white;width:100px;height:30px;border:1px solid lightgray;"> <button style="width:30px;height:30px;background:white;border:1px solid lightgray;">+</button></td>
				<td>10元</td>
          </tr>
       </table>
       <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
   </div>

      <!-- 添加自采件 -->
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
            <td><button :class="{complete: zcjact}" style="height:40px;width:160px;line-height:40px;" class="parst" @click="addzcjact">常规保养</button></td>
            <td><button :class="{complete: zcjno}" style="height:40px;width:160px;line-height:40px;" class="parst" @click="addactno">常规维修</button></td>
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

      <!-- 添加工项 -->
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
	</div>
</template>
<script>
export default {
  data () {
    return {
      model1: '',
      value1: '',
      zcjact: true,
      zcjno: false,
      total: '',
      btns: [
        {name: '添加配件'},
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
      btnact: true,
      btnno: false,
      activebtn: false,
      activebtn1: false,
      activebtn2: false,
      showpj: false,
      showzcj: false,
      showgx: false
    }
  },
  methods: {
    closeaddcar () {
      this.addcarmsg = false
      this.showpj = false
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
    addpj () {
      this.activebtn = true
      this.showpj = true
      this.showzcj = false
      this.showgx = false
      this.activebtn1 = false
      this.activebtn2 = false
    },
    addzcj () {
      this.showpj = false
      this.showzcj = true
      this.showgx = false
      this.activebtn1 = true
      this.activebtn2 = false
      this.activebtn = false
    },
    addgx () {
      this.unactivebtn = false
      this.showpj = false
      this.showzcj = false
      this.showgx = true
      this.activebtn1 = false
      this.activebtn2 = true
      this.activebtn = false
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

  .addbtn{
  	width:80%;
  	margin:0 auto;
  	position:relative;
  	  ul>li{
  	  	    float:left;
    		width:33.3%;
    		height:100%;  	  		
    			button{
					    margin-top:10px;
					    width:305px;
					    height:60px;
  	  		   }
  	  }
  }
 .statusbtn{
 	width:40%;
 		button{
			margin:0 10px;
 		}
 }
.addtable{
    width:80%;
    margin:15px auto 0;
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


  .adpj{
    width:100%;
    margin:0 auto;
    padding:20px 0 10px;
    border:1px @cl-ye solid;
  table{
    width:100%;
    margin:10px auto;
    th{
    	background:#fdedb1;
    	height:70px;
    }
  td{
    height:70px;
  }
  }
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
</style>
