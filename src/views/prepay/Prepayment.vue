<template>
    <div class="container">
        <div class="header world bg" @click="choose">房间: 实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="payment line">
            <div>预缴费项</div>
            <div class="bg payment-name" @click="choose">{{feeName}}</div>
        </div>
        <div class="payment-box">
            <div class="payment-list line">
                <h3>预缴余额</h3>
                <div>
                    <p class="paymen-name">{{feeName}}</p>
                    <p class="payment-money">￥{{balanceAmount}}</p>
                </div>
                <div v-if="enoughDeductionDate">
                    <p class="paymen-name">暂存款可扣至</p>
                    <p class="payment-money">{{enoughDeductionDate}}</p>
                </div>
            </div>
        </div>
        <div class="payment line">
            <div>费项缴纳</div>
            <div class="bg payment-name" @click="showRates">收费标准</div>
        </div>
        <div class="content">

            <div v-if="calcTimeUint == 2" class="pay">
                <div v-if="paymentList.length" class="pay-list">
                    <div v-for="(item,index) in paymentList" :key="index"  :class="{'isFrozen':isFrozen}">
                        <div @click="customFunc(item)" :class="{'checked':item.checked}"
                             v-if="item.type === 1">
                            <p class="month" v-if="!item.paymentMonth">
                                自定义
                            </p>
                            <p class="month" v-if="item.paymentMonth">
                                {{item.paymentMonth}}个月
                                <span v-if="item.type === 1">自定义</span>
                            </p>
                            <p class="price" v-if="item.paymentMonth"><span>¥</span>{{item.perUnit}}</p>
                        </div>
                        <div v-else :class="{'checked':item.checked}" @click="choosePayment(item)">
                            <p class="month">{{item.paymentMonth}}个月</p>
                            <p class="price"><span>¥</span>{{item.perUnit}}</p>
                        </div>
                    </div>
                </div>
                <div v-else class="calcTimeUint">
                    <img src="~@/assets/images/calcTimeUint.png">
                    <p>该费项没有收费设置</p>
                </div>
            </div>
            <div v-else class="calcTimeUint">
                <img src="~@/assets/images/calcTimeUint.png">
                <p>抱歉，暂不支持“季度”和年预缴</p>
            </div>

            <div v-if="isFrozen" class="footer is-freeze">
                您有已出账单未结算，不能预缴
            </div>
            <div v-else :class="['footer',{'is-custom':custom}]" @click="goPayment">
                立即缴费
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
                            <li v-for="(item,index) in feeCharge" :key="index">
                                <p>{{item.startDate}} 至 {{item.endDate}}</p>
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
            <div class="layer" style="height: 2.48rem;background: #FFFFFF" @click.stop="custom = true">
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
                                <p class="choose-price">
                                    <span @click="monthRed" class="monthRed"></span>
                                    <span class="price">
                                        <input type="text" v-model="customObj.paymentMonth"
                                               @input="getCurPrice(customObj.paymentMonth)">
                                    </span>
                                    <span @click="monthAdd" class="monthAdd"></span>
                                </p>
                            </li>
                            <li>
                                <p>实际金额</p>
                                <p class="money">￥{{customObj.perUnit}}</p>
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
        feeItems: [], // 专项预缴费项订单明细列表
        customObj: {
          type: 1,
          checked: null,
          paymentMonth: null,
          perUnit: null,
        },
        isFrozen: 0, // 是否有欠缴
        calcTimeUint: "", // 账单周期模型
        maxMonth: 12, // 允许缴纳最大月数
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
          pmdsRoomId: '83a7999d-5177-4d0a-9d58-754aaad5db15',
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
          pmdsRoomId: '83a7999d-5177-4d0a-9d58-754aaad5db15', // 房间主数据id
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40'  // 用户主数据id
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

              // 获取费项收费标准
              this.getFeeChargeStandard()

              // 获取专项预缴费项订单明细
              this.getFeeitemDetails()
            }
          }
        })
      },

      getFeeChargeStandard() {

        let data = {
          pmdsRoomId: '83a7999d-5177-4d0a-9d58-754aaad5db15',  //房间主数据id
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40',  //用户主数据id
          feeId: this.feeId,  // 费项id
          itemSourceName: this.itemSourceName // 数据来源：房间号、表具编号、车位号
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

      getFeeitemDetails() {
        let data = {
          pmdsRoomId: '83a7999d-5177-4d0a-9d58-754aaad5db15', //房间主数据id
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40', //  用户主数据id
          feeId: this.feeId, // 费项id
          itemSourceName: this.itemSourceName, // 数据来源：房间号、表具编号、车位号
          customMonths: 1  //  自定义预缴月数
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: '/bpi/property/prepayment/queryFeeitemDetails',
          data: data,
          success: (res) => {
            this.enoughDeductionDate = res.data.enoughDeductionDate
            this.isFrozen = res.data.hasOutstandingBill
            this.maxMonth = res.data.maxMonth;
            this.feeItems = res.data.feeItems;
            let arr = [], perUnit = 0;
            for (let i = 0, len = res.data.feeItems.length; i < len; i++) {
              if (i >= res.data.maxMonth) break
              perUnit += parseFloat(res.data.feeItems[i].perUnit);
              if (i == 0 || i == 2 || i == 5 || i == 11) {
                arr.push({
                  perUnit: perUnit.toFixed(2),
                  paymentMonth: i + 1,
                  checked: i == 2 && !res.data.hasOutstandingBill ? true : false
                })
              }
              if (i > 11) {
                break;
              }
            }
            arr.push(this.customObj);
            this.paymentList = arr;

            // // 获取个人冻结订单
            // this.getUnpaidBillTran()
          }
        })
      },
      // 选择快捷支付
      choosePayment(item) {
        if (!this.isFrozen) {
          this.paymentList.map((item) => {
            item.checked = false;
          });
          item.checked = true;
        }

      },
      // 自定义
      customFunc() {
        //  如果没有价格，那么一定是第一次打开的
        if (!this.isFrozen) {
          //    我要默认执行选择快捷支付的事件
          const checkedItem = this.paymentList.find(item => {
            return item.checked;
          });
          const {
            paymentMonth,
            perUnit,
          } = checkedItem;
          // console.log(JSON.parse(JSON.stringify(this.customObj)));
          this.paymentList.map((item) => {
            item.checked = false;
          });
          Object.assign(this.customObj, {
            checked: true,
            paymentMonth,
            perUnit,
          });
          //  打开弹框
          this.custom = true;
        }

      },
      // 预缴月数 --
      monthRed() {
        if (this.customObj.paymentMonth-- > 1) {
          this.getCurPrice(this.customObj.paymentMonth)
        } else {
          this.customObj.paymentMonth = 1
        }
      },
      // 预缴月数 ++
      monthAdd() {
        if (this.customObj.paymentMonth++ < this.maxMonth) {
          this.getCurPrice(this.customObj.paymentMonth)
        } else {
          this.customObj.paymentMonth = this.maxMonth
          // this.$showToast.show('hello2020!', 2000)
        }
      },
      // 立即缴费
      goPayment() {
        const checkedItem = this.paymentList.find(item => {
          return item.checked;
        });
        const {
          paymentMonth,
          perUnit
        } = checkedItem;
        let arr = this.feeItems.slice(0, paymentMonth)

        let data = {
          pmdsRoomId: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa', // 房间主数据id
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40', // 用户主数据id
          userName: "f范秉川", // 客户名称
          phoneNum: '18500039456', // 用户手机号
          feeItems: JSON.stringify(arr), // 订单明细 json格式
          villageInfoId: "1", // 楼盘ID
          terminalSource: '1', // 终端类型 0 Android 1 iPhone
          totalAmount: perUnit, // 订单金额
          feeId: this.feeId, // 费项id
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: '/bpi/property/prepayment/createAdvanceOrder',
          data: data,
          success: (res) => {
            console.log(res)
            if (res.code == 2000) {
              // this.$router.push('ConfirmPayment')
            }
            this.$router.push({path: '/ConfirmPrepay', query: {'feeName': this.feeName, 'perUnit': perUnit}})
          }
        })

        //
      },
      setRoom(value) {
        this.feeId = value.id
        this.itemSourceName = value.itemSourceName
      },
      getCurPrice(number) {
        if (number > this.maxMonth) {
          this.$showToast.show('hello2020!', 2000)
          this.customObj.paymentMonth = number = this.maxMonth
        }
        let perUnit = 0
        for (let i = 0; i < number; i++) {
          perUnit += parseFloat(this.feeItems[i].perUnit);
        }
        this.customObj.perUnit = perUnit.toFixed(2)

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

    .calcTimeUint {
        text-align: center;
        font-size: 0.14rem;
        color: #808080;
        padding-top: 0.9rem;

        img {
            width: 8%;
            margin-bottom: 0.08rem;
        }
    }

    .pay-list {
        display: flex;
        margin-bottom: 0.14rem;
        flex-wrap: wrap;

        > div div {
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
                position: relative;

                span {
                    position: absolute;
                    right: -0.08rem;
                    top: -0.22rem;
                    width: 0.37rem;
                    height: 0.15rem;
                    background: #FFF1ED;
                    border-radius: 0 0.02rem 0 0.02rem;
                    color: #E6582F;
                    font-size: 0.1rem;
                }
            }

            .price {
                font-size: 0.16rem;

                span {
                    font-size: 0.12rem;
                }
            }
        }

        .checked {
            background: #F5FBFF;
            border: 0.01rem solid #04639D;

            .price {
                color: #04639D;
            }
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

        section {
            padding: 0 0.16rem;
            box-sizing: border-box;
        }

        li {
            display: flex;
            justify-content: space-between;
            opacity: 1;
            height: 0.6rem;
            line-height: 0.6rem;
            border-bottom: 0.01rem solid #ECECEC;
            padding: 0;
            font-size: 0.14rem;

            .money {
                color: #ce6a6a;
                font-size: 0.15rem;
            }

            .choose-price {
                display: flex;
                align-items: center;

                img {
                    width: 0.12rem;
                }

                span {
                    background-repeat: no-repeat;
                    background-position: left center;
                    background-size: 0.12rem;
                    width: 0.12rem;
                    height: 0.12rem;
                }

                .monthRed {
                    background-image: url("~@/assets/images/redu.png");
                }

                .monthAdd {
                    background-image: url("~@/assets/images/add.png");
                }

                .price {
                    width: 0.46rem;
                    height: 0.3rem;
                    font-size: 0.15rem;
                    line-height: 0.3rem;
                    background: #EDEDED;
                    border-radius: 0.02rem;
                    display: inline-block;
                    margin: 0 0.15rem;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        text-align: center;
                        background: transparent;
                    }
                }
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
        color: #ffffff;
    }

    .is-freeze {
        color: #ffffff;
        background: #a4a1a1;
    }

    .is-custom {
        z-index: 999;
    }

    .isFrozen {
        opacity: 0.4;
    }
</style>