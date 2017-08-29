<template>
	<div class='billing'>
		<section class='enterphone' :class="{billingborder:act}"  @click="onfucos1">
			<enter-phone></enter-phone>
		</section>
		<section class='addparts' :class="{billingborder:act2}"  @click="onfucos2">
			<add-parts></add-parts>
		</section>
    <section :class="{billingborder:act3}" @click="onfucos3">
       <div class="filldata">
         <div class="car-title">
           <img src="../../assets/images/03-icon.png" alt=""><h3>填写数据</h3>
         </div>
         <ul>
           <li>进场时间：</li>
           <li>
             <Row>
                 <Col span="12">
                 <Date-picker  type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
                 </Col>
           </Row>
           </li>
           <li>进场里程数： <Input v-model="mileage" v-validate="'required|numeric'" name="name" placeholder="请输入进场里程数" style="width: 300px"></Input><span v-show="errors.has('name')" style="color:red">{{ errors.first('name') }}</span></li>
           <li>备注: <Input v-model="notes" placeholder="请输入备注" style="width: 300px"></Input></li>
         </ul>
         <div class="clearfix"></div>
       </div>
      <!--------------以下完成开单---------------------->
    </section>

      <div class="com-mcen">
        <div class="complete01">完成开单</div>
      </div>
	</div>
</template>
<script>
import enterPhone from './enterPhone'
import addParts from './addParts'
export default {
  components: {
    enterPhone, addParts
  },
  data () {
    return {
      mileage: '',
      notes: '',
      act: true,
      act2: false,
      act3: false
    }
  },
  methods: {
    onfucos1 () {
      this.act = true
      this.act2 = false
      this.act3 = false
    },
    onfucos2 () {
      this.act = false
      this.act2 = true
      this.act3 = false
    },
    onfucos3 () {
      this.act = false
      this.act2 = false
      this.act3 = true
    }
  }
}
</script>
<style scoped lang='less'>
  @import '../../assets/css/public.less';
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover{
    border-color: #ffc900;
  }
  .billingborder{
  border-radius:@border;
  border-color:@bg-yellow;
  border:@border-line;
  -webkit-box-shadow: 1px 2px 10px #fdd43a;
  -moz-box-shadow:1px 2px 10px #fdd43a;
  box-shadow: 1px 2px 16px #fdd43a;
}
  .clearfix{
    content:'';
    clear:both;
    display:block;
  }
  .billing{
  	width:99%;
   /* padding:0 10px;*/
    margin:20px 0 !important;
    min-height:1080px;
    background:#f9f8f3;
  }
  .enterphone{
  	width:100%;
    margin:10px auto;/*
    padding:10px 0;*/
  }
  .addparts{
  	width:100%;
    /*margin:10px auto;
    padding:10px 0;*/

    margin-bottom:10px;
  }
  .filldata{
    width:100%;
    margin:0px  auto;
    background:white;
    display: inline-block;
    padding-bottom:@mb;
    & li{
        float: left;
        margin:0 @mb;
        height:50px;
        line-height: 50px;
      }
  }
  .com-mcen{
    display: block;
    padding:10px 0;
    margin:10px auto 140px;
    background:#f9f8f3;
  }
  .complete01{
    margin:10px auto;
  }

</style>
