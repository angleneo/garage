<template>
	<div>
		<section class="searchvendor">
			<div class="searchbox">
				<input type="text" placeholder="请输入供应商名称">
				<Select v-model="model2" size="large" style="width:90px;float:left;margin-top:15px;">
	        		<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	   			</Select>
	   			<button class="search-btn" style="margin-top:15px;margin-left:20px;float:left;">保存并新增</button>
	   			<div class="clearfix"></div>
			</div>
		</section>
		
		<section class="basemessage">
			<span>基本信息:</span>
			<table>
				<tr>
					<td>联系人:<input type="text" placeholder="请填写联系人姓名"></td>
					<td>联系方式:<input type="text" placeholder="请填写联系方式"></td>
				</tr>
			</table>
		</section>

		<section class="addressmessage">
			<span>地址信息:</span>
			<cityparts></cityparts>
		</section>
	</div>
</template>
<style scoped>
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
import cityparts from '../../components/resuable/cityparts/cityparts.vue'
export default {
  components: {
    cityparts
  },
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
      value2: '',
      model2: '',
      model3: '',
      model4: '',
      model5: ''
    }
  }
}
</script>