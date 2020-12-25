<template>
    <div>
        <div class="banner"></div>
        <div class="payment right-button paid-out">
            <div @click="goPage('/wechat-pay/PaymentList/Paid-out')">物业缴费</div>
        </div>
        <div class="payment right-button prepayment">
            <div @click="goPage('/wechat-pay/Prepayment')">预缴费用</div>
        </div>
        <div class="payment right-button paymentRecords">
            <div @click="goPage('/wechat-pay/PaymentRecords')">缴费记录</div>
        </div>
    </div>
</template>
<script>
  import {mapActions} from 'vuex';
  // import $ from "jquery";

  export default {
    computed: {
      count() {
        return this.$store.state.test.count
      }
    },
    data() {
      return {};
    },
    created() {
      // $.ajax({
      //   crossDomain: true,//兼容ie8,9
      //   type: "get",
      //   headers:{
      //     'sessionkey':"onBNR6oOaFKvW09R7P3nJ9EEjIPU"
      //   },
      //   url: 'mpi/user/userInfo',
      // }).then((res) => {
      //   console.log(res)
      // })
      // let res = {
      //   "payOrderId": "P0020201225105619000014",
      //   "sign": "5491D8DDFEA4E861E210E728EE9139EF",
      //   "resCode": "SUCCESS",
      //   "payParams": {
      //     "timeStamp": "1608864979",
      //     "package": "prepay_id=wx251056194116795a84d196eda291ce0000",
      //     "paySign": "0386ABCC9A905EC9E7CC5B780EB3AABA",
      //     "appId": "wx38471b86e45e684f",
      //     "signType": "MD5",
      //     "nonceStr": "1608864979646"
      //   },
      //   "prepayId": "wx251056194116795a84d196eda291ce0000",
      //   "retCode": "SUCCESS",
      //   "retMsg": ""
      // }
      // let {appId, timeStamp, nonceStr, signType, paySign} = res.payParams
      // if (typeof WeixinJSBridge != "undefined") {
      //   WeixinJSBridge.invoke(
      //     'getBrandWCPayRequest', {
      //       "appId": appId,     //公众号名称，由商户传入
      //       "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
      //       "nonceStr": nonceStr, //随机串
      //       "package": res.payParams.package,
      //       "signType": signType,         //微信签名方式：
      //       "paySign": paySign //微信签名
      //     },
      //     function (res) {
      //       console.log(res)
      //       if (res.err_msg == "get_brand_wcpay_request:ok") {
      //         // 使用以上方式判断前端返回,微信团队郑重提示：
      //         //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      //         // 完成订单
      //         // this.completePaidOrder();
      //       }
      //     }
      //   );
      // }
    },
    methods: {
      ...mapActions('test', [
        'setCountAdd',
        'setCountReduce',
      ]),
      goPage(url) {
        // this.$axios({
        //   url: "aaa",
        //   method: 'get',
        // }).then(()=>{
        //   this.$router.push({path: url})
        // })


        this.$router.push({path: url})
      }
    }
  };
</script>
<style scoped lang="less">
    // 列表组件布局 用react的话 直接把下面注释就可以
    .banner {
        width: 100%;
        height: 1.78rem;
        background-image: url("../assets/images/payIndex-banner.png");
        background-position: left center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .payment {
        height: 0.5rem;
        line-height: 0.5rem;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        padding-left: 0.6rem;
        box-sizing: border-box;
        margin-bottom: 0.1rem;
        font-size: .12rem;
        background-position: left 0.1rem center;
        background-repeat: no-repeat;
        background-size: 0.38rem 0.39rem;
        background-color: #FFFFFF;

        div {
            width: 100%;
            height: 100%;
        }

        a {
            width: 100%;
            height: 100%;
            display: block;
            color: #333333;
        }
    }

    .paid-out {
        background-image: url("../assets/images/paid-out.png");
    }

    .prepayment {
        background-image: url("../assets/images/prepayment.png");
    }

    .paymentRecords {
        background-image: url("../assets/images/paymentRecords.png");
    }

</style>

