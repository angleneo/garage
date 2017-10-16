<template>
	<div>
		<section class="searchvendor">
		<form @submit.prevent="validateBeforephone">
			<div class="searchbox" style="position:relative">
				<input type="text" placeholder="请输入供应商名称（必填）" v-model="gysname" v-validate="'required|max:12|min:2'" name="供应商名称">
				<span v-show="errors.has('供应商名称')"  style="color:red; position: absolute; top: 50px; left: 37px;">{{ errors.first('供应商名称') }}</span>
				<Select v-model="model2" size="large" style="width:90px;float:left;margin-top:15px;" v-validate="'required|alpha_num'" name="结算方式">
	        		<Option v-for="item in paywaylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
	   			</Select>
	   			<span v-show="errors.has('结算方式')"  style="color:red;position: absolute; top: 51px; left:32%;">{{ errors.first('结算方式') }}</span>
	   			<button class="search-btn" style="margin-top:15px;margin-left:20px;float:left;">保存并新增</button>
	   			<div class="clearfix"></div>
			</div>
		</form>
		</section>

		<section class="basemessage">
			<span>基本信息:</span>
			<table>
				<tr>
					<td>联系人:<input type="text" placeholder="请填写联系人姓名（选填）" v-model="gyscustomer" ></td>
					<td>联系方式:<input type="text" placeholder="请填写联系方式（选填）" v-model="gysphone" v-validate="'required|numeric|max:11|min:11'" name="联系方式"></td>
					<td><b v-show="errors.has('联系方式')"  style="color:red; font-weight: normal; ">{{ errors.first('联系方式') }}</b></td>
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
import {suppliercreate} from '@/service/supplier'
import {mapState} from 'vuex'
export default {
  components: {
    cityparts
  },
  data () {
    return {
      paywaylist: [
        {
          value: '0',
          label: '现结'
        },
        {
          value: '1',
          label: '月结'
        }
      ],
      value2: '',
      model2: '',
      gysname: '',
      gyscustomer: '',
      gysphone: ''
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
  },
  methods: {
    creategys () {
      let params = {
        name: this.gysname,
        payType: this.model2,
        contactName: this.gyscustomer,
        contactPhone: this.gysphone,
        province: this.$store.state.cityparts[0],
        city: this.$store.state.cityparts[1],
        district: this.$store.state.cityparts[2],
        address: this.$store.state.cityaddress
      }
      suppliercreate(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.success('添加成功!')
          this.$router.push({name: '供应商管理'})
        } else {
          this.$Message.error(res.data.desc)
        }
      })
    },
    validateBeforephone () {
      this.$validator.validateAll({供应商名称: this.gysname, 结算方式: this.model2}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.creategys()
          return
        }
        this.btndis = false
      })
    }
  }
}
</script>
