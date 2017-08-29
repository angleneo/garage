<template>
 <div class='report'>
    <section>
      <div class="history-box">
        <span> 历史最高业绩</span>
        <h1>￥160,000.00</h1>
      </div>
    </section>
    <section>
      <div class="performance">
        <img src="../../assets/images/performance-icon.png" >
        <span>当日业绩</span>
        <h1>￥10,000.00</h1>
      </div>
    </section>
 </div>
</template>
<style scope >
  .history-box h1 {
    line-height: 62px;
    font-size: 36px;
    color: #fdcc10;
    padding-left: 55px;
  }
  .history-box span {
    line-height: 52px;
    font-size: 20px;
    color: #bf893f;
    padding-left: 55px;
  }
  .performance {
    width: 496px;
    height: 160px;
    background: rgba(255, 255, 255, 0.7);
    padding: 10px;
    margin: 20px 0;
    position: relative;
  }
  .performance img {
    position: absolute;
    top: 45px;
    left: 30px;
  }
  .performance h1 {
    line-height: 62px;
    font-size: 36px;
    color: #fdcc10;
    padding-left: 55px;
  }
  .performance span {
    line-height: 52px;
    font-size: 20px;
    color: #bf893f;
    padding-left: 55px;
  }
</style>
