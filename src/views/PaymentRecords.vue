<template>
    <div class="container">
        <!--        vue-cli scroller组件-->
        <scroller class="content" :on-infinite="getMoreList" v-if="paymentList.length">
            <div @click="goOrderDetail(item.orderNo,item.payFeesType)" v-for="(item,index) in paymentList"
                 class="list line" :key="index">
                <div class="type prepay" v-if="Number(item.payFeesType)">预</div>
                <div class="type payment" v-else>缴</div>
                <div>
                    <h3 v-if="Number(item.payFeesType)">预缴订单</h3>
                    <h3 v-else>缴费订单</h3>
                    <p>下单时间：{{item.orderDate}}</p>
                    <p>订单金额：¥{{item.payMoney}}</p>
                </div>
                <p class="pay-state" v-if="item.orderState == 1">支付成功</p>
                <p class="pay-state" v-else-if="item.orderState == 2">已取消</p>
                <p class="pay-state" v-else>待支付</p>
            </div>
        </scroller>
        <div v-else class="no-message">
            <img src="~@/assets/images/noMessage.png">
            <p>暂无缴费记录</p>
        </div>
    </div>
</template>

<script>
  import $ from "jquery";
  import {ipUri} from "../main";

  export default {
    name: "PaymenRecords",
    data() {
      return {
        paymentList: [],  // 缴费列表
        curPage: 0,
        pageNum: 10,
        height: 0,
        winHei: screen.availHeight, //屏幕高度
      }
    },
    created() {
      this.getPropertyAdvanceHistory()
    },
    methods: {
      // 获取缴费列表
      getPropertyAdvanceHistory(done) {
        let data = {
          "curPage": this.curPage,
          "pageNum": this.pageNum,
          "userID": 1   // 微信用户id
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/property/prepayment/getPropertyAdvanceHistory',
          url: `${ipUri["/bpi"]}/property/prepayment/getPropertyAdvanceHistory`,
          contentType: "application/x-www-form-urlencoded",
          data: data,
          success: (res) => {
            if (res.data.length) {
              this.paymentList = this.paymentList.concat(res.data)
              if (done) {
                done()
              }
            } else {
              if (done) {
                done(true)
              }
            }
          }
        })
      },
      goOrderDetail(number, type) {
        this.$router.push({path: '/OrderDetail', query: {'orderId': number, 'type': type}})
      },
      getMoreList(done) {
        this.curPage++
        this.getPropertyAdvanceHistory(done)
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .container {
        .content {
            overflow-y: scroll;
            padding-bottom: 0.1rem;
        }

        .list {
            display: flex;
            font-size: 0.16rem;
            align-items: center;
            background: #ffffff;
            position: relative;
            padding-bottom: 0.12rem;
            box-sizing: border-box;

            div {
                line-height: 0.35rem;
                flex: none;

                h3 {
                    font-size: 0.15rem;
                    font-weight: 400;
                }

            }

            p {
                font-size: 0.12rem;
                color: #808080;
                line-height: 0.17rem;
            }
        }
    }

    .pay-state {
        position: absolute;
        right: 0.1rem;
        top: 0.13rem;
    }

    .type {
        width: 0.35rem;
        height: 0.35rem;
        background: #619AE0;
        border-radius: 0.35rem;
        color: #ffffff;
        text-align: center;
        margin: 0 0.1rem;
    }

    .payment {
        background: #56BC8E;
    }

    .no-message {
        padding-top: 2.2rem;
        text-align: center;
        color: #808080;
        font-size: 0.13rem;

        img {
            width: 0.66rem;

        }
    }
</style>