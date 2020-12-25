<template>
    <div class="container">
        <!--        预缴账单-->
        <div class="content" v-if="type == '1'">
            <div class="banner" v-if="tranStatus === '0'">
                <div>
                    <p class="type">待支付</p>
                    <p class="name">{{tranDate}}</p>
                </div>
                <div class="spaceTime">{{minutes}}分{{seconds}}秒后订单自动关闭</div>
            </div>
            <div class="banner" v-if="tranStatus === '1'">
                <div>
                    <p class="type">支付成功</p>
                    <p class="name">{{tranDate}}</p>
                </div>
                <div class="spaceTime">感谢您使用在线缴费！</div>
            </div>
            <div class="banner" v-if="tranStatus === '2'">
                <div>
                    <p class="type">已取消</p>
                    <p class="name">{{tranDate}}</p>
                </div>
                <div class="spaceTime">{{memo}}</div>

            </div>
            <div class="orderList">
                <div class="payment">
                    <p class="room world line">房间: 实地·遵义蔷薇国际-D3地块(7、8地块及03地块及03地块及03地</p>
                    <!--                    预缴订单-->
                    <div class="prepay" v-if="type == '1'">
                        <p class="paymen-name">{{feeName}}</p>
                        <p class="payMoney">实付：<span>¥{{payMoney}}</span></p>
                    </div>
                </div>
                <div class="payment">
                    <div class="room line">订单信息</div>
                    <div class="payment-box">
                        <div class="payment-list pay-message line">
                            <div>
                                <p class="paymen-name">订单号码</p>
                                <p class="payment-money">{{orderNumber}}</p>
                            </div>
                            <div>
                                <p class="paymen-name">下单时间</p>
                                <p class="payment-money">{{tranDate}}</p>
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
        <!--欠缴账单-->
        <div class="content" v-else>
            <div class="banner" v-if="tranStatus === '0'">
                <div>
                    <p class="type">待支付</p>
                    <p class="name">{{tranDate}}</p>
                </div>
                <div class="spaceTime">{{minutes}}分{{seconds}}秒后订单自动关闭</div>
            </div>
            <div class="banner" v-else-if="tranStatus === '3'">
                <div>
                    <p class="type">已取消</p>
                    <p class="name">{{tranDate}}</p>
                </div>
                <div class="spaceTime">{{memo}}</div>
            </div>
            <div class="banner" v-else>
                <div>
                    <p class="type">支付成功</p>
                    <p class="name">05-08 11:09</p>
                </div>
                <div class="spaceTime">感谢您使用在线缴费！</div>
            </div>
            <div class="orderList">
                <div class="payment">
                    <p class="room world line">房间: 实地·遵义蔷薇国际-D3地块(7、8地块及03地块及03地块及03地</p>
                    <!--                    预缴订单-->
                    <div>
                        <div class="payment-box" v-for="(item,index) in paymentList" :key="index">
                            <div class="payment-list line">
                                <h3>[{{item.billMonth}}]</h3>
                                <div v-for="(_item,_index) in item.billDetails" :key="_index">
                                    <p class="paymen-name">{{_item.paidName}}</p>
                                    <p class="payment-money">￥{{_item.paidTotal}}</p>
                                </div>
                            </div>
                        </div>
                        <p class="payMoney">实付：<span>¥{{totalMoney}}</span></p>
                    </div>


                </div>
                <div class="payment">
                    <div class="room line">订单信息</div>
                    <div class="payment-box">
                        <div class="payment-list pay-message line">
                            <div>
                                <p class="paymen-name">订单号码</p>
                                <p class="payment-money">{{orderNumber}}</p>
                            </div>
                            <div>
                                <p class="paymen-name">下单时间</p>
                                <p class="payment-money">{{tranDate}}</p>
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
        <div class="footer" v-if="tranStatus == 0">
            <div class="cancel" @click="cancelOrder">取消订单</div>
            <div class="gopay" @click="goPay">去支付</div>
        </div>
        <!--        confirm 组件-->
        <Confrim ref="myConfirm" @userBehavior="userBehaviorFun" type="confirm"></Confrim>
    </div>
</template>

<script>
  import Confrim from "../../components/confrim";
  import $ from "jquery";
  import {ipUri} from "../../main";

  export default {
    name: "OrderDetail",
    components: {
      Confrim
    },
    data() {
      return {
        minutes: 15,
        seconds: 0,
        orderNumber: "", // 订单
        maxtime: 15 * 60 - 1,
        timer: null,
        paymentList: null, // 欠缴列表
        totalMoney: 0, // 总费用
        memo: "", // 取消信息
        tranDate: "", // 订单时间
        isType: "1", // 是否为超时取消
        tranStatus: "0", // 支付状态
        feeName: "", // 预缴费项名称
        payMoney: "0", // 预缴费项价格
        type: "" // 预缴或欠缴
      }
    },
    created() {
      this.type = this.$route.query.type
      this.orderNumber = this.$route.query.orderId
      // this.orderNumber = '20201225153152208'
      // 获取订单信息
      this.getOrderList()
    },
    methods: {
      getOrderList() {
        // 0 欠缴  1 预缴
        if (this.type === '1') {
          //  获取预缴订单详情
          this.getPaymentInfo()
        } else {
          //  获取欠缴订单详情
          this.getBillDetailByTrans()
        }
      },
      getTime() {
        let data = {
          "orderID": this.orderNumber
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/getTime.do',
          url: `${ipUri["/bpi"]}/getTime.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            // 计算出下单到现在的时间 进行倒计时
            this.maxtime = (new Date(res.data.createTime) * 1 + (15 * 60 - 1) * 1000 - new Date(res.data.nowTime) * 1) / 1000
            this.timer = setInterval(this.CountDown, 1000);
          }
        })
      },
      // 获取欠缴账单详情
      getBillDetailByTrans() {
        let data = {
          "transactionid": this.orderNumber,
          "payMenthod": ""
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/getBillDetailByTrans.do',
          url: `${ipUri["/bpi"]}/getBillDetailByTrans.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            // 支付状态
            this.tranStatus = res.data.tranStatus
            // 支付信息
            this.memo = res.data.memo
            // 下单时间
            this.tranDate = res.data.tranDate.substring(0, 16)
            // 订单id
            this.transactionid = res.data.transactionid
            // 订单号
            this.orderNumber = res.data.transactionid

            // 欠缴总费用
            this.totalMoney = res.data.totalMoney

            //  欠缴列表
            this.paymentList = res.data.billDetail
            // 如果支付状态为待支付 则开启倒计时
            if (this.tranStatus == 0) {
              this.getTime()
            }
          }
        })
      },
      // 获取预缴订单详情
      getPaymentInfo() {
        let data = {
          orderId: this.orderNumber // 订单编号
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/property/prepayment/getPaymentInfo',
          url: `${ipUri["/bpi"]}/property/prepayment/getPaymentInfo`,
          contentType: "application/x-www-form-urlencoded",
          data: data,
          success: (res) => {
            this.tranStatus = res.data.tranStatus
            this.memo = res.data.memo
            this.tranDate = res.data.tranDate.substring(0, 16)
            this.transactionid = res.data.transactionid
            this.payMoney = res.data.payMoney
            this.feeName = res.data.feeName
            this.orderNumber = res.data.transactionid // 欠缴没有订单id 只有订单号 所以取消订单的时候为了统一一个变量名新增的一个变量
            if (this.tranStatus == 0) {
              this.getTime()
            }
          }
        })
      },
      CountDown() {
        // eslint-disable-next-line no-debugger
        if (this.maxtime > 0) {
          this.minutes = Math.floor(this.maxtime / 60);
          this.seconds = Math.floor(this.maxtime % 60);
          --this.maxtime;
        } else {
          //  重新获取订单详情
          // this.getOrderList()     // 先注释掉 因为目前后台没跑定时程序 所以永远都是待支付

          //  清除定时器
          clearInterval(this.timer);
        }
      },
      // 获取订单状态
      getTranStatus() {
        let data = {"transactionId": this.orderNumber};
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/getTranStatus.do',
          url: `${ipUri["/bpi"]}/getTranStatus.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            if (res.data.status == 0) {
              this.getPay() // 微信支付
            }
          }
        })
      },
      // 下单支付
      getPay() {
        $.ajax({
          type: "get",
          url: `${ipUri["/opi"]}/pay/create_order`,  //  获取支付签名
          success: (result) => {
            let res = JSON.parse(result)
            let {appId, timeStamp, nonceStr, signType, paySign} = res.payParams

            //  唤起微信支付
            if (typeof WeixinJSBridge != "undefined") {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": appId,     //公众号名称，由商户传入
                  "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                  "nonceStr": nonceStr, //随机串
                  "package": res.payParams.package,
                  "signType": signType,         //微信签名方式：
                  "paySign": paySign //微信签名
                },
                function (res) {
                  console.log(res)
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    // 完成订单
                    this.completePaidOrder();
                  }
                }
              );
            }
          }
        })
      },
      // 支付后完成订单
      completePaidOrder() {
        let data = {
          "transactionId": this.orderNumber,
          "updateTime": "2020-12-16 16:45:08",
          "payMethod": "900"
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/completePaidOrder.do',
          url: `${ipUri["/bpi"]}/completePaidOrder.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            console.log(res)
            // this.$router.push({path: '/PaySuccess', data: res.data})
            this.$router.push({path: '/wechat-pay/PaySuccess', data: res.data})
          }
        })
      },
      // 去支付
      goPay() {
        // 获取订单状态
        this.getTranStatus()
      },
      cancelOrder() {
        this.$refs.myConfirm.show('您确定取消订单？')
      },
      userBehaviorFun(typeClick) {
        if (typeClick == 'clickConfirm') {
          //  如果为预缴订单
          let url = '', data = null;
          if (this.type == '1') {
            url = 'property/prepayment/cancelAdvanceOrder'
            data = {'orderId': this.orderNumber}

          } else {
            url = 'cancelPaidOrder.do'
            data = {
              "transactionId": this.transactionid,
              "updateTime": this.tranDate,
              "payMethod": "900"
            }
            data = {'json': JSON.stringify(data)}
          }
          $.ajax({
            crossDomain: true,//兼容ie8,9
            type: "post",
            // url: '/bpi/' + url,
            url: `${ipUri["/bpi"]}/${url}`,
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: (res) => {
              console.log(res)
              this.getOrderList()
            }
          })
          // this.$router.go(0)
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
                font-size: 0.12rem;
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
                    line-height: 0.5rem;
                }

                .payment-box {
                    margin-top: 0.1rem;
                    background: #ffffff;

                    .payment-list {
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