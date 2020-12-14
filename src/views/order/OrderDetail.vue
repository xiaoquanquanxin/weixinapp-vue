<template>
    <div class="container">
        <div class="content">
            <div class="banner" v-if="payType == 1">
                <div>
                    <p class="type">待支付</p>
                    <p class="name">05-08 11:09</p>
                </div>
                <div class="spaceTime">{{minutes}}分{{seconds}}秒后订单自动关闭</div>
            </div>
            <div class="banner" v-if="payType == 2">
                <div>
                    <p class="type">支付成功</p>
                    <p class="name">05-08 11:09</p>
                </div>
                <div class="spaceTime">感谢您使用在线缴费！</div>
            </div>
            <div class="banner" v-if="payType == 3">
                <div>
                    <p class="type">已取消</p>
                    <p class="name">05-08 11:09</p>
                </div>
                <div class="spaceTime" v-if="isType == 1">付款超时，订单已关闭！</div>
                <div class="spaceTime" v-if="isType == 2">取消成功，订单已关闭！</div>

            </div>
            <div class="orderList">
                <div class="payment">
                    <p class="room world">房间: 实地·遵义蔷薇国际-D3地块(7、8地块及03地块及03地块及03地</p>
                    <!--                    预缴订单-->
                    <div class="prepay" v-if="type == 'pre'">
                        <p class="paymen-name">住宅物业管理费</p>
                        <p class="payMoney">实付：<span>¥535.00</span></p>
                    </div>
                    <!--                    订单-->
                    <div v-else>
                        <div class="payment-box" v-for="item in 3" :key="item">
                            <div class="payment-list">
                                <h3>[2019]</h3>
                                <div>
                                    <p class="paymen-name">住宅物业管理费</p>
                                    <p class="payment-money">￥130.60</p>
                                </div>
                                <div>
                                    <p class="paymen-name">水费（住宅）</p>
                                    <p class="payment-money">￥65.60</p>
                                </div>
                                <div>
                                    <p class="paymen-name">车位管理费（20#201）</p>
                                    <p class="payment-money">￥130.60</p>
                                </div>
                            </div>
                        </div>
                        <p class="payMoney">实付：<span>¥535.00</span></p>
                    </div>


                </div>
                <div class="payment">
                    <div class="room">订单信息</div>
                    <div class="payment-box">
                        <div class="payment-list pay-message">
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
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="cancel" @click="cancelOrder">取消订单</div>
            <div class="gopay">去支付</div>
        </div>
        <!--        confirm 组件-->
        <Confrim ref="myConfirm" @userBehavior="userBehaviorFun"></Confrim>
    </div>
</template>

<script>
  import Confrim from "../../components/confrim";

  export default {
    name: "OrderDetail",
    components: {
      Confrim
    },
    data() {
      return {
        minutes: 15,
        seconds: 0,
        maxtime: 15 * 60 - 1,
        timer: null,
        isType:"1", // 是否为超时取消
        payType:"2", // 支付状态
        type: "" // 预缴或欠缴
      }
    },
    created() {
      console.log(this.$route.query)
      this.type = this.$route.query.type
      if(this.payType == 1){
        this.timer = setInterval(this.CountDown, 1000);
      }

    },
    methods: {
      CountDown() {
        // eslint-disable-next-line no-debugger
        if (this.maxtime >= 0) {
          this.minutes = Math.floor(this.maxtime / 60);
          this.seconds = Math.floor(this.maxtime % 60);
          // if (maxtime == 5 * 60) alert("还剩5分钟");
          --this.maxtime;
        } else {
          // window.reload()
          this.payType = 3;

          clearInterval(this.timer);
        }
      },
      cancelOrder() {
        this.$refs.myConfirm.show('fadfdf')
      },
      userBehaviorFun(typeClick) {
        if (typeClick == 'clickConfirm') {
          this.$router.go(0)
        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .content {
        font-size: 0.15rem;
        overflow-y: scroll;

        .banner {

            width: 3.75rem;
            height: 1.18rem;
            padding: 0 0.15rem;
            padding-top: 0.18rem;
            box-sizing: border-box;
            background: linear-gradient(90deg, #04639D 0%, #024868 100%);

            div {
                display: flex;
                justify-content: space-between;
                line-height: 0.25rem;
            }

            .type {
                font-size: 0.18rem;
                font-weight: 500;
                color: #FFFFFF;
            }

            .name {
                font-size: 0.12rem;
                color: #C6DDEB;
            }

            .spaceTime {
                color: #C6DDEB;
            }
        }

        .orderList {
            width: 92%;
            margin: 0 auto;
            margin-top: -0.4rem;

            .payment {
                width: 100%;
                background: #FFFFFF;
                border-radius: 0.08rem;
                padding: 0.13rem;
                padding-top: 0;
                margin-bottom: 0.1rem;
                box-sizing: border-box;

                .room {
                    font-size: 0.13rem;
                    border-bottom: 0.01rem solid #ECECEC;
                    line-height: 0.5rem;
                }

                .payment-box {
                    margin-top: 0.1rem;
                    background: #ffffff;

                    .payment-list {
                        box-sizing: border-box;
                        background: #ffffff;
                        border-bottom: 0.01rem solid #ECECEC;

                        h3 {
                            font-size: 0.14rem;
                        }

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

                    .pay-message {
                        border-bottom: none;
                    }

                }

                .payMoney {
                    text-align: right;
                    margin-top: 0.13rem;
                    font-size: 0.14rem;
                    color: #505050;

                    span {
                        font-size: 0.15rem;
                        color: #DF4949;
                    }
                }

                .prepay {
                    margin-top: 0.16rem;
                    display: flex;
                    justify-content: space-between;

                    .payMoney {
                        margin-top: 0;
                    }

                    .paymen-name {
                        font-size: 0.13rem;
                        color: #505050;
                    }
                }
            }

        }
    }

    .footer {
        height: 0.55rem;
        background: #ffffff;
        font-size: 0.15rem;
        display: flex;
        justify-content: space-around;
        color: #ffffff;
        align-items: center;
        box-shadow: 0 -2px 10px 0 #cbc7c7;
        z-index: 999;

        div {
            line-height: 0.44rem;
            text-align: center;
            border-radius: 0.04rem;
        }

        .cancel {
            width: 1.55rem;
            height: 0.44rem;
            border: 0.01rem solid #04639D;
            color: #04639D;
        }

        .gopay {
            width: 1.55rem;
            height: 0.44rem;
            background: #04639D;
        }
    }
</style>