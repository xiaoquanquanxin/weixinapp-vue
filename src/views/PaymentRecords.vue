<template>
    <div class="container">
        <div @click="goOrderDetail(type)">
            <div class="type prepay" v-if="type == 'pre'">预</div>
            <div class="type payment" v-else>缴</div>
            <div>
                <h3>预缴订单</h3>
                <p>下单时间：2020-11-12 14:33:27</p>
                <p>订单金额：¥182.90</p>
            </div>
            <p class="pay-state" v-if="state">支付成功</p>
            <p class="pay-state" v-else>已取消</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "PaymenRecords",
    data() {
      return {
        type: 'pre',
        state: true
      }
    },
    created() {

    },
    methods: {
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