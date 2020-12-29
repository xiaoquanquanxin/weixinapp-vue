<template>
    <div class="container">
        <div class="room world">房间：实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="payment-list line">
            <div>
                <p class="paymen-name">{{feeName}}</p>
                <p class="payment-money">￥{{perUnit}}</p>
            </div>
        </div>
        <div class="footer" @click="goPay">微信支付</div>
        <Confrim ref="myConfirm" type="alert"></Confrim>
    </div>
</template>

<script>
  import $ from "jquery";
  import {ipUri} from "../../main";
  import Confrim from "../../components/confrim";
  export default {
    name: "ConfirmPrepay",
    data() {
      return {
        feeName: "",
        perUnit: "",
        type: "",
        arr: [],
        orderId: ""
      }
    },
    components: {
      Confrim
    },
    created() {
      this.feeName = this.$route.query.feeName
      this.perUnit = this.$route.query.perUnit
      this.arr = this.$route.query.arr
      this.type = this.$route.query.type
      this.roomID = this.$route.query.roomID
      this.feeId = this.$route.query.feeId
    },
    methods: {
      goPay() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let data = {
          pmdsRoomId: this.roomID, // 房间主数据id
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40', // 用户主数据id
          userID: 1, // 用户主数据id
          userName: "f范秉川", // 客户名称
          phoneNum: '18500039456', // 用户手机号
          feeItems: JSON.stringify(this.arr), // 订单明细 json格式
          villageInfoId: "1", // 楼盘ID
          terminalSource: isiOS ? '1' : '2', // 终端类型 0 Android 1 iPhone
          totalAmount: this.perUnit, // 订单金额
          feeId: this.feeId, // 费项id
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/property/prepayment/createAdvanceOrder',
          url: `${ipUri["/bpi"]}/property/prepayment/createAdvanceOrder`,
          data: data,
          success: (res) => {
            console.log(res)
            if (res.code == 2000) {
              this.orderDate = res.data
              // this.getTranStatus()
              this.orderId = res.data.orderCode
              this.getTranStatus() // 先查询订单状态 是否是待支付
            } else {
              this.$refs.myConfirm.show(res.msg)
            }
          }
        })
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
            if (res.data.status == 0) { // 如果状态时待支付
              this.getPay() // 微信支付
              // this.completePaidOrder()
              // this.$router.push({path: '/wechat-pay/PaySuccess', query: this.typeDate})
            } else {
              this.$refs.myConfirm.show('您的账单已缴纳，请重新选择！')
            }
          }
        })
      },
      // 下单支付
      getPay() {
        $.ajax({
          type: "get",
          // url: '/opi/pay/create_order',  //  获取支付签名
          url: `${ipUri["/opi"]}/pay/create_order`,
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
                  } else {
                    this.$router.push({
                      path: '/wechat-pay/OrderDetail',
                      query: {'type': this.type, 'orderId': this.orderId}
                    })
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
            // this.$router.push({path: '/PaySuccess', query: this.typeDate})
            let data = {
              createTime: res.data.createTime.substring(0, 16),
              orderId: res.data.orderId,
              orderMoney: this.totleMoney,
              type: 1
            }
            this.$router.push({path: '/wechat-pay/PaySuccess', query: data})
            // this.$router.push({path: '/wechat-pay/PaySuccess', query: this.typeDate})
          }
        })
      },
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