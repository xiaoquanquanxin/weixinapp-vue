<template>
    <div class="container">
        <div class="room world">房间：{{roomName}}</div>
        <div class="content">

            <div class="payment-box">
                <div class="payment-list line" v-for="(item,index) in billList" :key="index">
                    <h3>【{{item.billMonth}}】</h3>
                    <div v-for="items in item.billDetails" :key="items.billIds">
                        <p class="paymen-name">{{items.paidName}}</p>
                        <p class="payment-money">￥{{items.paidTotal}}</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="box-shadow box-footer">
            <div class="allCheck">
                <div class="all-box">
                    <label>
                        待支付:
                    </label>
                    <b>¥ {{totleMoney}}</b>
                </div>
                <div class="payment" @click="goPay">微信支付</div>
            </div>
        </div>
        <Confrim ref="myConfirm" type="alert"></Confrim>
    </div>

</template>

<script>
  import $ from 'jquery'
  import {ipUri} from "../../main";
  import Confrim from "../../components/confrim";
  // import wx from 'weixin-js-sdk'

  export default {
    name: "ConfirmPayment",
    data() {
      return {
        billList: [],  // 选中订单列表
        billIDsList: [], // 选中订单id
        roomId: "", // 房间id
        roomName: "", // 房间名称
        totleMoney: 0,
        isReady: false,
        typeDate: null, // 下单详情
        orderDate: null, // 订单详情 完成订单时需要的参数
        billData: "", // 未缴账单列表
        billDetails: "" // 创建订单需要列表格式
      }
    },
    components: {
      Confrim
    },
    created() {
      document.title="欠缴确认订单"
      // this.getPay();
      this.billIDsList = this.$route.query.billIDsList;
      this.roomId = this.$route.query.roomId;
      this.getRoomList()
      let data = {
        roomIDs: this.roomId,
        userID: '575cd6b8b1c54389936cf47fe8347a40',
      };
      $.ajax({
        crossDomain: true,//兼容ie8,9
        type: "post",
        // url: '/bpi/getUnpaidBill.do',
        url: `${ipUri["/bpi"]}/getUnpaidBill.do`,
        contentType: "application/x-www-form-urlencoded",
        data: {'json': JSON.stringify(data)},
      }).then((res) => {
        // resolve(data) billIds
        this.billData = res.data
        this.billIDsList.map((billItem) => {
          res.data.content.map((item) => {
            item.billDetails.forEach((_item) => {
              if (_item.billIds == billItem) {
                this.billList.push(item)
                this.totleMoney += _item.paidTotal
              }
            })
          })
        })
        let arr = [];
        this.billList.map((item) => {
          item.billDetails.map((_item) => {  //  提交给后台的数据格式
            _item.roomID = res.data.roomIds
            _item.period = item.billMonth
            _item.billId = _item.billIds
            _item.buildingID = 1   //  没数据 暂时写死       😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈😈
            arr.push(_item)
          })
        })
        this.billDetails = arr;
      })

    },
    methods: {
      //  获取房间列表
      getRoomList() {
        $.ajax({
          type: "POST",
          // url: '/opi/pay/create_order',  //  获取支付签名
          url: `${ipUri["/bpi"]}/getPmdRooms.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {
            wxUserID: "5"
          },
          success: (result) => {
            result.data.forEach((item)=>{
              if(item.roomId == this.roomId){
                this.roomName = item.roomName
              }
            })
          }
        })
      },
      getUnpaidBillTran() {
        let data = {
          "roomIds": "83a7999d-5177-4d0a-9d58-754aaad5db15",
          "contactNumber": "18201538993"
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/getUnpaidBillTranV1.do',
          url: `${ipUri["/bpi"]}/getUnpaidBillTranV1.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            if (res.data.length) {
              this.isFrozen = 1
            } else {
              this.isFrozen = 0
            }
          }
        })
      },
      goPay() {
        // 查询是否有冻结账单
        this.getUnpaidBillTran();
        if (!this.isFrozen) { // 如果没有冻结账单 则发起支付
          let json = {
            "customerId": "575cd6b8b1c54389936cf47fe8347a40",
            "contactNumber": "18201538993",
            "paidIDs": this.billIDsList.join(','),
            "terminalSource": "0",
            "hqUserId": "0",
            "projectID": "1"
          }
          // 提交订单到物业
          $.ajax({
            crossDomain: true,//兼容ie8,9
            type: "post",
            // url: '/bpi/submitOrder.do',
            url: `${ipUri["/bpi"]}/submitOrder.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {'json': JSON.stringify(json)},
            success: (res) => {
              this.orderNumber = res.data.orderId
              this.orderDate = res.data
              this.createTime = res.data.createTime.substring(0, 16)
              this.typeDate = {
                createTime: res.data.createTime.substring(0, 16),
                orderId: res.data.orderId,
                orderMoney: this.totleMoney,
                type: 0
              }
              if (res.code == 2000) {
                // 创建订单接口到后台
                this.creatOrder(res)
              } else {
                this.$refs.myConfirm.show(res.msg)
              }
            },
          })
        } else {
          this.$refs.myConfirm.show('您的账单已提交，请不要重复操作！')
        }
      },
      creatOrder(result) {
        let dataP2 = {
          userID: 1, // 微信用户id
          orderCode: result.data.orderId,
          payType: 0, // 0 欠缴
          orderDate: 0,
          billDetails: JSON.stringify(this.billDetails),
          orderMoney: result.data.orderMoney,
          terminalSource: 0,
          projectID: 1   // 项目id
        }
        // eslint-disable-next-line no-debugger
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/submitCommBill.do',
          url: `${ipUri["/bpi"]}/submitCommBill.do`,
          contentType: "application/x-www-form-urlencoded",
          data: dataP2,
          success: (res) => {
            if (res.code == 2000) {
              // 创建好订单 先查看订单状态是不是待支付
              this.getTranStatus()
            }
          },
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
            if (res.data.status == 0) {

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
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        let data = {
          mchId: '10000000',  // 自定义商户ID，公众号支付传10000000
          mchOrderNo: this.orderDate.orderId,   //  商户订单号
          channelId: "WX_JSAPI",  //  渠道id,公众号传"WX_JSAPI"
          amount: this.orderDate.orderMoney.toFixed(2),  //  支付金额（单位分）
          clientIp: "192.168.100.81",  //  客户端IP
          device: isiOS ? 'ios' : 'Android',  //  设备
          openId: "ouxLS1GtoZLHu2s_qA93BqIldWnY" //  当前app对应的下openId
        }
        $.ajax({
          type: "POST",
          // url: '/opi/pay/create_order',  //  获取支付签名
          url: `${ipUri["/opi"]}/pay/create_order`,
          data: {
            params:JSON.stringify(data)
          },
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
                      query: {'type': this.type, 'orderId': this.orderNumber}
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
          "transactionId": this.orderDate.orderId,
          "updateTime": this.orderDate.createTime,
          "payMethod": this.orderDate.orderMoney
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/completePaidOrder.do',
          url: `${ipUri["/bpi"]}/completePaidOrder.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: () => {
            // this.$router.push({path: '/PaySuccess', query: this.typeDate})
            this.$router.push({path: '/wechat-pay/PaySuccess', query: this.typeDate})
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .container {
        background: #F8F8F8;
        font-size: 0.14rem;
    }

    .content {
        overflow-y: scroll;
        padding-bottom: 0.6rem;
    }

    .room {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: left;
        padding: 0 0.1rem;
        box-sizing: border-box;
        background-color: #ffffff;
        font-size: 0.14rem;
        color: #000000;
        flex: none;
    }

    .payment-box {
        margin-top: 0.1rem;
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

    .box-shadow {
        box-shadow: 0 -2px 10px 0 #cbc7c7;
        padding: 0 0.1rem;
        box-sizing: border-box;
        height: 0.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #ffffff;

        .checkbox {
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
            border: 0.01rem solid #979797;
            border-radius: 100%;
            margin-right: 0.1rem;
        }

        .isChecked {
            background-image: url("~@/assets/images/checked.png");
            background-size: cover;
            width: 0.16rem;
            height: 0.16rem;
            border: none;
        }

        .allCheck {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 0.13rem;
            font-weight: 400;
            color: #333333;

            b {
                font-size: 0.15rem;
                color: #DF4949;
                line-height: 0.21rem;
                margin-left: 0.2rem;
            }

        }

        .payment {
            width: 1rem;
            height: 0.4rem;
            background: #04639D;
            border-radius: 0.05rem;
            font-size: 0.15rem;
            color: #FFFFFF;
            line-height: 0.4rem;
            text-align: center;
        }

        .all-box {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;

            label {
                display: flex;
                align-items: center;
                height: 100%;
            }

        }
    }
</style>