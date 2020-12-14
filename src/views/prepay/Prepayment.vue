<template>
    <div class="container">
        <div class="header world bg" @click="choose">房间: 实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="payment">
            <div>预缴费项</div>
            <div class="bg payment-name" @click="choose">预收住宅管理费（A1-1505）</div>
        </div>
        <div class="payment-box">
            <div class="payment-list">
                <h3>预缴余额</h3>
                <div>
                    <p class="paymen-name">住宅物业管理费</p>
                    <p class="payment-money">￥123</p>
                </div>
            </div>
        </div>
        <div class="payment">
            <div>费项缴纳</div>
            <div class="bg payment-name" @click="showRates">收费标准</div>
        </div>
        <div class="content">

            <div class="pay">
                <div class="pay-list">
                    <div>
                        <p class="month">1个月</p>
                        <p class="price"><span>¥</span>182.90</p>
                    </div>
                    <div class="checked">
                        <p class="month">3个月</p>
                        <p class="price"><span>¥</span>182.90</p>
                    </div>
                    <div>
                        <p class="month">6个月</p>
                        <p class="price"><span>¥</span>182.90</p>
                    </div>
                    <div>
                        <p class="month">12个月</p>
                        <p class="price"><span>¥</span>182.90</p>
                    </div>
                    <div>
                        <p class="month" @click="custom = true">自定义</p>
                    </div>
                </div>
            </div>
            <div :class="['footer',{'is-custom':custom}]">
                <router-link to="ConfirmPrepay">立即缴费</router-link>
            </div>
        </div>
        <!--        收费标准-->
        <div :class="['rates olay ios-select-widget-box one-level-box fadeInUp',{'fadeOutDown':!rates}]" v-if="rates"
             @click.stop="rates = false">
            <div class="layer" style="height: 194px;" @click.stop="rates = false">
                <header style="height: 44px; line-height: 44px;font-size: 16px" class="iosselect-header">
                    <a style="height: 44px; line-height: 44px" href="javascript:void(0)" @click.stop="rates = false"
                       class="sure">取消</a>
                    <h2 class="iosSelectTitle">收费标准</h2>
                </header>
                <section class="iosselect-box">
                    <div class="one-level-contain oneLevelContain" style="font-size: 16px; height: 150px;">
                        <ul class="select-one-level" style="transform: translate(0px, 0px) translateZ(0px);">
                            <li>
                                <p>2020-02</p>
                                <p>145元</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <!--        自定义-->
        <div :class="['custom olay ios-select-widget-box one-level-box fadeInUp',{'fadeOutDown':!custom}]" v-if="custom"
             @click.stop="custom = false">
            <div class="layer" style="height: 194px;" @click.stop="custom = true">
                <header style="height: 44px; line-height: 44px;font-size: 16px" class="iosselect-header">
                    <a style="height: 44px; line-height: 44px" href="javascript:void(0)" @click.stop="custom = false"
                       class="sure">x</a>
                    <h2 class="iosSelectTitle">费用预算</h2>
                </header>
                <section class="iosselect-box">
                    <div class="one-level-contain oneLevelContain" style="font-size: 16px; height: 150px;">
                        <ul class="select-one-level" style="transform: translate(0px, 0px) translateZ(0px);">
                            <li>
                                <p>预缴月数</p>
                                <p><span>-</span> 3 <span>+</span></p>
                            </li>
                            <li>
                                <p>实际金额</p>
                                <p class="money">￥731.60</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <ios-select ref="mychild" @func="setRoom" :paidData="room"></ios-select>
        <!--        confirm 组件-->
        <Confrim ref="myConfirm" @userBehavior="userBehaviorFun" type="alert"></Confrim>
    </div>
</template>

<script>
  import iosSelect from "../../components/iosSelect";
  import Confrim from "../../components/confrim";
  import $ from 'jquery'

  export default {
    name: "Prepayment",
    data() {
      return {
        rates: false, // 收费标准
        custom: false, // 自定义
        room: [
          {'id': '10001', 'value': '实地 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着)'},
          {'id': '10002', 'value': '中山 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
          {'id': '10003', 'value': '广州 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
          {'id': '10004', 'value': '北京 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
          {'id': '10005', 'value': '天津 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
        ],
        roomName: "实地-遵义蔷薇国际"
      }
    },
    components: {
      iosSelect,
      Confrim
    },
    created() {
      let data = {
        pmdsRoomId: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
        cmdsId: '575cd6b8b1c54389936cf47fe8347a40'
      };
      $.ajax({
        crossDomain: true,//兼容ie8,9
        type: "post",
        url: '/bpi/property/prepayment/hasFeeItem',
        contentType: "application/x-www-form-urlencoded",
        data: data,
        success: (res) => {
          if(res.code == '4000'){
            this.$refs.myConfirm.show(res.msg)
          }
          this.getFeeInfo()
        }
      })
    },
    methods: {
      getFeeInfo(){
        let data = {
          pmdsRoomId: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40'
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: '/bpi/property/prepayment/queryFeeInfo',
          contentType: "application/x-www-form-urlencoded",
          data: data,
          success: (res) => {
            console.log(res)
          }
        })
      },
      setRoom(value) {
        console.log(value)
        this.roomName = value.value

      },
      // 收费标准
      showRates() {
        this.rates = true
      },
      choose() {
        this.$refs.mychild.choose()
      },
      userBehaviorFun(typeClick) {
        if (typeClick == 'clickConfirm') {
          this.$router.push({path: '/'})
        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .header {
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.14rem;
        padding-left: 0.11rem;
        box-sizing: border-box;
        background-color: #ffffff;

    }

    .content {
        background: #ffffff;
    }

    .bg {
        padding-right: 0.25rem;
        background-image: url("~@/assets/images/rightB.png");
        background-size: 0.07rem 0.11rem;
        background-repeat: no-repeat;
        background-position: center right 0.1rem;
    }

    .pay {
        padding-top: 0.22rem;
    }

    .payment {
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.14rem;
        padding-left: 0.11rem;
        margin-top: 0.1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        border-bottom: 0.01rem solid #ECECEC;

        .paymen-name {
            font-size: 0.12rem;
        }
    }

    .payment-box {
        background: #ffffff;

        .payment-list {
            padding: 0.13rem;
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
    }

    .pay-list {
        display: flex;
        margin-bottom: 0.14rem;
        flex-wrap: wrap;

        div {
            width: 1.09rem;
            height: 0.75rem;
            border-radius: 0.04rem;
            border: 0.01rem solid #DBDBDB;
            text-align: center;
            box-sizing: border-box;
            flex: none;
            flex-direction: column;
            display: flex;
            justify-content: center;
            margin: 0 0.04rem 0.1rem 0.1rem;

            .month {
                font-size: 0.13rem;
            }

            .price {
                font-size: 0.22rem;

                span {
                    font-size: 0.12rem;
                }
            }
        }

        .checked {
            background: #F5FBFF;
            border: 0.01rem solid #04639D;
        }

    }

    .rates {
        .one-level-contain {
            overflow-y: scroll;
        }

        li {
            display: flex;
            justify-content: space-between;
        }
    }

    .custom {
        .sure {
            color: #333333;
        }

        li {
            display: flex;
            justify-content: space-between;
            opacity: 1;
            height: 0.4rem;
            line-height: 0.4rem;

            .money {
                color: #ce6a6a;
            }
        }
    }

    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0.1rem;
        margin: auto;
        font-size: 0.15rem;
        width: 92%;
        height: 0.44rem;
        background: #04639D;
        border-radius: 0.04rem;
        text-align: center;
        line-height: 0.44rem;

        a {
            display: block;
            width: 100%;
            height: 100%;
            color: #ffffff;
        }
    }

    .is-custom {
        z-index: 999;
    }
</style>