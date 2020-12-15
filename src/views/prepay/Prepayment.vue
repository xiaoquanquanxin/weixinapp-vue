<template>
    <div class="container">
        <div class="header world bg" @click="choose">房间: 实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="payment">
            <div>预缴费项</div>
            <div class="bg payment-name" @click="choose">{{feeName}}</div>
        </div>
        <div class="payment-box">
            <div class="payment-list">
                <h3>预缴余额</h3>
                <div>
                    <p class="paymen-name">住宅物业管理费</p>
                    <p class="payment-money">￥{{balanceAmount}}</p>
                </div>
                <div v-if="enoughDeductionDate">
                    <p class="paymen-name">暂存款可扣至</p>
                    <p class="payment-money">{{enoughDeductionDate}}</p>
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
                    <div v-for="item in paymentList" :key="item.index" :class="{'checked':item.checked}">
                        <p class="month">{{item.paymentName}}</p>
                        <p class="price"><span>¥</span>{{item.price}}</p>
                    </div>
                    <div v-if="paymentList.length<= 4">
                        <p class="month" @click="custom = true">自定义</p>
                    </div>
                </div>
            </div>
            <div v-if="isFreeze" class="footer is-freeze">
                您有已出账单未结算，不能预缴
            </div>
            <div v-else :class="['footer',{'is-custom':custom}]">
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
                            <li v-for="item in feeCharge" :key="item.index">
                                <p>{{item.startDate}}</p>
                                <p>{{item.amount}}元</p>
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
                                <p><span @click="monthRed">-</span> 3 <span @click="monthAdd">+</span></p>
                            </li>
                            <li>
                                <p>实际金额</p>
                                <p class="money">￥{{731.60}}</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <ios-select ref="mychild" @func="setRoom" :paidData="iosData"></ios-select>
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
        feeName: "",
        iosData: [],
        roomName: "实地-遵义蔷薇国际",
        feeId: '',
        isFreeze: 0, // 是否有欠缴
        maxMonth: 0, // 允许缴纳最大月数
        paymentList: [], // 快捷支付列表
        balanceAmount: "", // 费项余额
        enoughDeductionDate: "", // 暂存款日期
        feeCharge: [] // 收费标准
      }
    },
    components: {
      iosSelect,
      Confrim
    },
    created() {
      // 先获取有没有预缴订单
      this.getFeeItem()
    },
    methods: {
      // 查询是否有预缴订单
      getFeeItem() {
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
            if (res.code == '4000') {
              this.$refs.myConfirm.show(res.msg)
            }
            if (!res.data) {
              this.$refs.myConfirm.show('费项异常，暂不能进行预缴')
            }
            this.getFeeInfo()
          }
        })
      },
      // 查询预缴费项信息
      getFeeInfo() {
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
            if (res.code == 2000) {
              this.feeName = `${res.data[0].feeName}(${res.data[0].itemSourceName})`
              let arr = [];
              res.data.map((item) => {
                arr.push({
                  'id': item.feeId,
                  'value': `${item.feeName}(${item.itemSourceName})`,
                  'itemSourceName': item.itemSourceName
                })
              })
              this.iosData = arr
              this.feeId = res.data[0].feeId //预付款收费项目ID
              this.itemSourceName = res.data[0].itemSourceName //数据来源：房间号、表具编号、车位号
              this.balanceAmount = res.data[0].balanceAmount //预存款余额
              this.calcTimeUint = res.data[0].calcTimeUint  //账单周期
              this.getFeeChargeStandard()
              this.getFeeitemDetails()
            }
          }
        })
      },
      // 获取费项收费标准
      getFeeChargeStandard() {

        let data = {
          pmdsRoomId: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40',
          feeId: this.feeId,
          itemSourceName: this.itemSourceName
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: '/bpi/property/prepayment/getFeeChargeStandard',
          contentType: "application/x-www-form-urlencoded",
          data: data,
          success: (res) => {
            this.feeCharge = res.data
          }
        })
      },
      // 获取专项预缴费项订单明细
      getFeeitemDetails() {
        let data = {
          pmdsRoomId: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40',
          feeId: this.feeId,
          itemSourceName: this.itemSourceName,
          customMonths: 1
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: '/bpi/property/prepayment/queryFeeitemDetails',
          data: data,
          success: (res) => {
            this.enoughDeductionDate = res.data.enoughDeductionDate
            this.isFreeze = res.data.hasOutstandingBill
            this.maxMonth = res.data.maxMonth
            let arr = [], price = 0;
            for (let i = 0, len = res.data.feeItems.length; i < len; i++) {
              if (i > res.data.maxMonth) break
              if (i == 0 || i == 2 || i == 5 || i == 11) {
                price += parseFloat(res.data.feeItems[i].perUnit)
                res.data.feeItems[i].price = price
                res.data.feeItems[i].paymentName = `${i+1}个月`
                res.data.feeItems[i].checked = i == 2 ? true : false
                arr.push(res.data.feeItems[i])
              }
              if (i > 11) {
                break;
              }
            }
            this.paymentList = arr;
            console.log(this.paymentList)
          }
        })
      },
      monthRed(){

      },
      monthAdd(){

      },
      setRoom(value) {
        console.log(value)
        this.feeId = value.id
        this.itemSourceName = value.itemSourceName
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
            opacity: 1;
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

    .is-freeze {
        color: #ffffff;
        background: #a4a1a1;
    }

    .is-custom {
        z-index: 999;
    }
</style>