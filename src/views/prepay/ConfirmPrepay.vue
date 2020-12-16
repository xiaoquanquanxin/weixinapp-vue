<template>
    <div class="container">
        <div class="room world">房间：实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="payment-list">
            <div>
                <p class="paymen-name">{{feeName}}</p>
                <p class="payment-money">￥{{perUnit}}</p>
            </div>
        </div>
        <div class="footer" @click="goPay">微信支付</div>
    </div>
</template>

<script>
  export default {
    name: "ConfirmPrepay",
    data(){
      return{
        feeName:"",
        perUnit:""
      }
    },
    created() {
      this.feeName = this.$route.query.feeName
      this.perUnit = this.$route.query.perUnit
    },
    methods: {
      goPay() {
        this.$router.push({path: '/PaySuccess', query: {'type': 'pre'}})
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .room {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: left;
        padding: 0 0.11rem;
        box-sizing: border-box;
        background-color: #ffffff;
        font-size: 0.14rem;
        color: #000000;
        flex: none;
    }

    .payment-list {
        padding: 0.11rem;
        box-sizing: border-box;
        background: #ffffff;
        border-bottom: 0.01rem solid #ECECEC;
        margin-top: 0.11rem;

        h3 {
            font-size: 0.14rem;
        }

        div {
            display: flex;
            justify-content: space-between;
            font-size: 0.14rem;
            line-height: 0.3rem;

            .paymen-name {
                color: #505050;
            }

            .payment-money {
                color: #DF4949;
            }
        }
    }

    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0.1rem;
        margin: auto;
        height: 0.44rem;
        background: #04639D;
        border-radius: 0.04rem;
        text-align: center;
        line-height: 0.44rem;
        color: #ffffff;
        font-size: 0.15rem;
        width: 92%;
    }
</style>