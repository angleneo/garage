<template>
	<div class='billing'>
		<section class='enterphone' :class="{billingborder:act}"  @click="onfucos1">
			<enter-phone></enter-phone>
		</section>
		<section class='addparts' :class="{billingborder:act2}"  @click="onfucos2">
			<add-parts></add-parts>
		</section>
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
      today: '',
      mileage: '',
      notes: '',
      act: true,
      act2: false,
      act3: false
    }
  },
  mounted () {
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
   /* min-height:1080px;*/
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
    margin-bottom:0px;
  }
  .filldata{
    width:100%;
    margin:0px  auto;
    background:white;
    display: inline-block;
    padding-bottom:@mb;
      table{
            td{
              padding:5px 10px;
            }
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
