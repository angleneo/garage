<template>
	<div class="management">
		 <div class="contentleft">
          <div class="chart">
              <div class="tablebox" v-if="tablebg" style="padding:0;">
                <img src="../../assets/images/home-bg-tb.png">
              </div>
             <section class="chartbtn">
                <div class="turnover">
                  <button class='btn1' @click='dayport' ref='btn1' :style="{'color':this.cc,'background':this.bg}" >日营业额趋势图</button>
                  <button class='btn2' @click='monthport' ref='btn2' :style="{'color':this.cc2,'background':this.bg2}">月营业额趋势图</button>
                </div>
             </section>
             <section class='chartmain' style="height:380px;width:70%;margin:0 auto;">
                <vcharts v-if='ok1'></vcharts>
                <vcharts2 v-if='ok2'></vcharts2>
             </section>
             <section class='daily'>
                <span class="dailyy"><i style="background:#ffc900;width:10px;height:10px;display:inline-block;"></i>日营业额趋势</span>
                <span class="dailyy" style='margin-left:10px'><i style="background:#f3a340;width:10px;height:10px;display:inline-block;"></i>月营业额趋势</span>
             </section>
             <div class='clearfix'></div>
          </div>
          <div class="lastdetail">
              <section class='detailtop'>
                  <span>最近订单:</span>
                  <a v-goto="'工单管理'">查看全部订单></a>
                  <div class='clearfix'></div>
              </section>
          
              <section class='detailbottom'>  
                      <div class="tablebox" v-if="tablebg" >
                        <img src="../../assets/images/home-bg-orde.png">
                      </div>
                  <ul v-for="(order, item) in orderlists">
                      <li class='detailist'>
                            <div class="detailleft">
                                  <div class='carstatus'>
                                    <strong>{{order.carCode}}</strong>
                                    <span>{{order.status | status}}</span>
                                  </div>
                                  <div class='carmodel'>
                                      <ol>
                                        <li style="margin-left: 19px; text-align: left;  max-width: 380px; text-overflow: ellipsis;  overflow: hidden;  white-space: nowrap;">车型: <span>{{order.carModel}}</span></li>
                                        <li>车主: <span>{{order.userName}}</span></li>
                                        <li>联系方式: <span>{{order.userPhone}}</span></li>
                                      </ol>
                                  </div>
                            </div>
                            <div class="detailright">
                                  <div class='cost'>
                                      工单费用: <span>{{order.totalAmount | money}}</span>元
                                  </div>
                                  <div class='more-color'>
                                    <a v-goto="'工单详情'" data-key="id" :data-value="order.id"> 查看详情>></a>
                                  </div>
                            </div>
                      </li>
                  </ul>
              </section>
          </div>
     </div>
     <div class="contentright">
         <report class='report'></report>
         <customer class='customer'></customer>
     </div>
	</div>
</template>
<script>
import report from './report'
import customer from './customer'
import vcharts from '../../components/noresuable/vcharts'
import vcharts2 from '../../components/noresuable/vcharts2'
import {mapState} from 'vuex'
import {recentList} from '@/service/home'
export default {
  components: {
    report, vcharts, vcharts2, customer
  },
  data () {
    return {
      ok1: true,
      ok2: false,
      cc: '',
      bg: '',
      cc2: '',
      bg2: '',
      orderlists: [],
      tablebg: ''
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getListorder()
  },
  methods: {
    dayport () {
      this.ok1 = true
      this.ok2 = false
      this.cc = 'white'
      this.bg = '#ffc900'
      this.cc2 = '#ffc900'
      this.bg2 = 'white'
    },
    monthport () {
      this.ok2 = true
      this.ok1 = false
      this.cc2 = 'white'
      this.bg2 = '#ffc900'
      this.cc = '#ffc900'
      this.bg = 'white'
    },
    getListorder (item) {
      let params = {}
      recentList(JSON.stringify(params)).then((res) => {
        this.orderlists = res.data.data
        if (this.orderlists) {
          this.tablebg = false
        } else {
          this.tablebg = true
        }
      })
    }
  }
}
</script>
<style scope lang='less'>
@import '../../assets/css/public.less';
@wid:99%;
@wid2:497px;
@le:left;
@bgwhite:white;
.chart{ width: 100%; position: relative;}
.more-color{
  height: 45px;
  line-height: 75px;
  font-size: 16px;
  width: 100%;
  text-align: right;
 & a{
     color:@color-o;
   }
  & a:hover{
    text-decoration: underline; color:@color-o;
    }
}
.border-btn{
  padding:0 20px;
  background:@bg-yellow;
  color:white;
  font-size:18px;
  border-radius: 5px;
  outline:none;
  border:none;
  cursor:pointer;
}
.clearfix{
  content:'';
  clear:both;
  display:block;
}
.btnac{
    color:@bgwhite;
    background:@bg-yellow;
    border:@bg-yellow 1px solid;
}
.btncl{
    color:@bg-yellow;
    background:@bgwhite;
    border:@bg-yellow 1px solid;
}
.management{
  position:relative;
   .contentleft{
    float:@le;
    width:67.5%;
    height:100%;
    border-radius:10px;
    background:@bgwhite;
          .chartbtn{0
            width:@wid;
            height:50px;
                  .turnover{
                     min-width:310px;
                     height:41px;
                     margin-left:75px;
                     margin-top:10px;
                          .btn1{
                             width:150px;
                             height:40px;
                             border-radius:20px 0 0 20px;
                             color:@bgwhite;
                             background:@bg-yellow;
                             border:@bg-yellow 1px solid;
                             outline:none;
                             cursor:pointer;
                             float:@le;
                             font-size: 16px;
                          }
                          .btn2{
                             margin-left:8px;
                             width:150px;
                             height:40px;
                             border-radius:0 20px 20px 0;
                             color:@bg-yellow;
                             background:@bgwhite;
                             border:@bg-yellow 1px solid;
                             outline:none;
                             cursor:pointer;
                             float:@le;
                             font-size: 16px;
                          }
                       }
          }
          .chartmain{
            width:@wid;
            height:425px;
          }
          .daily{
            width:@wid;
            height:50px;
            .dailyy{
               width:100px;
               height:50px;
               line-height:50px;
               display:inline-block;
               float:@le;
               margin-left:75px;
               font-size:14px;
            }
          }
      .lastdetail{
          .detailtop{
            width:@wid + 1;
            height:70px;
            line-height:70px;
            background:@bg-yellow;
            color:@bgwhite;
                span{
                  float:left;
                  margin-left:25px;
                  font-size:24px;
                  color:#343940;
                }
                a{
                  color:@bgwhite;
                  font-size:18px;
                  float:right;
                  margin-right:30px;
                  text-decoration: underline;
                }
          }
          .detailbottom{
            position: relative;
            width:@wid + 1;
            min-height: 440px;
              .detailist{
                 width:@wid;
                 height:120px;
                 display:block;
                 padding-top: 14px;
                 border-bottom:1px solid lightgray;
                      .detailleft{
                          width:70%;
                          height:119px;
                          float:@le;
                              .carstatus{
                                  width:245px;
                                  height:30px;
                                  line-height:30px;
                                  margin-top:10px;
                                   strong{
                                      width:110px;
                                      height:30px;
                                      display: inline-block;
                                      line-height:30px;
                                      font-size:18px;
                                      color:#343940;
                                      font-family:"Noto Sans CJK SC", "Source Han Sans CN";
                                      text-align:left;
                                   }
                                   span{
                                      display:inline-block;
                                      width:95px;
                                      height:30px;
                                      line-height:30px;
                                      border:1px solid @bg-yellow;
                                      font-size:16px;
                                      border-radius:10px;
                                   }
                              }
                              .carmodel{
                                  width:725px;
                                  height:65px;
                                  line-height:65px;
                                   ol li{
                                      float:@le;
                                      font-size:16px;
                                      color:#999999;
                                      margin:0 10px;
                                   }
                              }
                      }
                      .detailright{
                          width:auto;
                          height:119px;
                          float:right;
                          text-align: right;
                              .cost{
                                 width:100%;
                                 height:45px;
                                 line-height:45px;
                                 font-size:18px;
                                    span{
                                      font-size:24px;
                                    }
                              }
                              /* a{
                                       display: block;
                                       width:120px;
                                       height:30px;
                                       line-height:30px;
                                       background:#f3a340;
                                       border-radius:5px;
                                       color:white;
                                       margin:20px auto;
                                    }*/
                      }
              }
          }
      }
  }
  .contentright{
    float:right;
    width:31%;/*
    margin-left:10px;*/
      .report{
        min-width:80%;
        width:98%;
        height:342px;
      }
      .customer{
        width:100%;
        margin-top:25px;
      }
  }

}

</style>
