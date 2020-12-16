<template>
    <div class="container">
        <div @click="goOrderDetail(type)" v-for="(item,index) in paymentList" :key="index">
            <div class="type prepay" v-if="item.payFeesType">预</div>
            <div class="type payment" v-else>缴</div>
            <div>
                <h3 v-if="item.payFeesType">预缴订单</h3>
                <h3 v-else>缴费订单</h3>
                <p>下单时间：{{item.orderDate}}</p>
                <p>订单金额：¥{{item.payMoney}}</p>
            </div>
            <p class="pay-state" v-if="item.orderState == 1">支付成功</p>
            <p class="pay-state" v-else-if="item.orderState == 2">已取消</p>
            <p class="pay-state" v-else>待支付</p>
        </div>
    </div>
</template>

<script>
  import $ from "jquery";

  export default {
    name: "PaymenRecords",
    data() {
      return {
        paymentList: [],  // 缴费列表
      }
    },
    created() {
      this.getPropertyAdvanceHistory()
    },
    methods: {
      getPropertyAdvanceHistory() {
        let data = {
          "curPage": "0",
          "pageNum": "10"
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: '/bpi/property/prepayment/getPropertyAdvanceHistory',
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            console.log(res)
            this.paymentList = res.data;
          }
        })
      },
      goOrderDetail(type) {
        this.$router.push({path: '/OrderDetail', query: {'type': type}})
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .container {
        > div {
            display: flex;
            font-size: 0.16rem;
            align-items: center;
            background: #ffffff;
            border-bottom: 0.01rem solid #ECECEC;
            position: relative;
            padding-bottom: 0.12rem;
            box-sizing: border-box;

            div {
                line-height: 0.35rem;
                flex: none;

                h3 {
                    font-size: 0.15rem;
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
</style>