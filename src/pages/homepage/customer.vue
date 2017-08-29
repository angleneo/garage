<template>
	<div class="customer-box">
    <div class="title-customer">客户满意度 <div class="triangle-top"></div> </div>

    <div class="c-list">
         <ul>
           <li><h3>沪A12345</h3><span> <template><Rate disabled v-model="valueDisabled"></Rate></template></span></li>
           <li class="color-font">车型：大众-迈腾-1.8L-2010年生产</li>
           <li>工单时间：2017/07/20</li>
         </ul>
        <ul>
           <li><h3>沪A12345</h3>   <span> <template><Rate disabled v-model="valueDisabled"></Rate></template></span></li>
           <li class="color-font">车型：大众-迈腾-1.8L-2010年生产</li>
           <li>工单时间：2017/07/20</li>
         </ul>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        valueDisabled: 2
      }
    }
  }
</script>
