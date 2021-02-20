<template>
    <div class="payment-box">
        <div class="payment-list">
            <h3 class="line">{{billMonth}}</h3>
            <div class="line">
                <div v-for="(item,index) in billDetail" :key="index">
                    <p class="paymen-name">{{item.paidName}}</p>
                    <p class="payment-money">￥{{item.paidTotal}}</p>
                </div>
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
        console.log(sType)
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
        margin-bottom: 0.27rem;
        font-size: 0.16rem;
        padding: 0.2rem 0.15rem;
        height: 100%;
        box-sizing: border-box;
        h3{
            text-align: center;
            line-height: 0.4rem;

        }
        .payment-list {
            padding: 0.1rem;
            height: 100%;
            box-sizing: border-box;
            background: #ffffff;

            >div>div {
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