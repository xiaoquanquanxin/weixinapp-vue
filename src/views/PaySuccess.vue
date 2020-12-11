<template>
    <div>
        <div class="pay">
            <img src="~@/assets/images/paysuccess.png" alt="">
            <p>订单支付成功</p>
        </div>
        <div class="payment-box">
            <div class="payment-list">
                <div>
                    <p class="paymen-name">订单号码</p>
                    <p class="payment-money">2312412531234</p>
                </div>
                <div>
                    <p class="paymen-name">下单时间</p>
                    <p class="payment-money">2020-09-09 18:00</p>
                </div>
                <div>
                    <p class="paymen-name">支付方式</p>
                    <p class="payment-money">在线支付</p>
                </div>
            </div>
        </div>
        <div class="goIndex">
            <router-link to="/">返回首页</router-link>
        </div>
        <div class="goOrderDetail" @click="goOrderDetail">
            <router-link to="/OrderDetail">查看订单</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: "PaySuccess",
    data() {
      return {
        type: ""
      }
    },
    created() {
      console.log(this.$route.query)
      this.type = this.$route.query.type
    },
    methods: {
      goOrderDetail() {
        this.$router.push({path: '/OrderDetail', query: {'type': this.type}})
      }
    }
  }
</script>

<style scoped lang="less">
    .pay {
        width: 100%;
        height: 1.27rem;
        background: #FFFFFF;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        img {
            width: 0.45rem;
            height: 0.45rem;
        }

        p {
            font-size: 0.18rem;
            color: #000000;
            line-height: 0.25rem;
            font-weight: 400;
            margin-top: 0.11rem;
        }
    }

    .payment-box {
        margin-top: 0.1rem;
        background: #ffffff;

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

    .goIndex {
        width: 2.4rem;
        height: 0.44rem;
        line-height: 0.44rem;
        background: #04639D;
        border-radius: 0.04rem;
        margin: 0 auto;
        margin-top: 0.36rem;
        font-size: 0.15rem;
        text-align: center;

        a {
            display: block;
            width: 100%;
            height: 100%;
            color: #ffffff;
        }
    }

    .goOrderDetail {
        width: 2.4rem;
        height: 0.44rem;
        line-height: 0.44rem;
        border-radius: 0.04rem;
        border: 0.01rem solid #04639D;
        margin: 0 auto;
        margin-top: 0.2rem;
        text-align: center;
        font-size: 0.15rem;

        a {
            display: block;
            width: 100%;
            height: 100%;
            color: #04639D;
        }
    }
</style>