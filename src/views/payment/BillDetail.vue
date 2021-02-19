<template>
    <div class="payment-box">
        <div class="payment-list">
            <h3 class="line">{{billMonth}}</h3>
            <div v-for="(item,index) in billDetail" :key="index">
                <p class="paymen-name">{{item.paidName}}</p>
                <p class="payment-money">￥{{item.paidTotal}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import $ from "jquery";
  import {ipUri} from "../../main";

  export default {
    name: "BillDetail",
    data() {
      return {
        billDetail: null,
        billMonth:""
      }
    },
    created() {
      this.getBillDetail()
      this.billMonth = this.$route.query.billMonth
    },
    methods: {
      getBillDetail() {
        let sType = this.$route.query.active ? 0 : 1;
        let data = {
          roomIds: this.$route.query.roomId,
          userID: this.$route.query.userId,
          month: this.$route.query.billMonth,
          sType   // 0 未缴 1 已缴
        };
        $.ajax({
          type: "POST",
          // url: '/opi/pay/create_order',  //  获取支付签名
          url: `${ipUri["/bpi"]}/getBillDetail.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (result) => {
            this.billDetail = result.data.content[0].billDetails
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";
    .payment-box {
        margin-top: 0.1rem;
        background: #ffffff;
        font-size: 0.16rem;
        h3{
            text-align: center;
            line-height: 0.4rem;
        }
        .payment-list {
            padding: 0.13rem;
            box-sizing: border-box;
            background: #ffffff;
            border-bottom: 0.01rem solid #ECECEC;

            div {
                display: flex;
                justify-content: space-between;
                font-size: 0.13rem;
                line-height: 0.3rem;

                .paymen-name {
                    color: #505050;
                }

                .payment-money {
                    color: #333333;
                }
            }
        }
    }
</style>