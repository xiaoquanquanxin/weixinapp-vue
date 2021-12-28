<template>
    <div>
        <div class="banner"></div>
        <div class="payment right-button paid-out">
            <div @click="goPage('/wechat-pay/PaymentList')">物业缴费</div>
        </div>
        <div class="payment right-button prepayment">
            <div @click="goPage('/wechat-pay/Prepayment')">预缴费用</div>
        </div>
        <div class="payment right-button paymentRecords">
            <div @click="goPage('/wechat-pay/PaymentRecords')">缴费记录</div>
        </div>
        <div class="payment right-button paymentRecords">
            <div @click="goPage('/wechat-pay/kesu')">客诉</div>
        </div>

    </div>
</template>
<script>
  import {mapActions} from 'vuex';
  import $ from "jquery";

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

      $.ajax({
        crossDomain: true,//兼容ie8,9
        type: "get",
        // headers:{
        //   'sessionkey':"onBNR6oOaFKvW09R7P3nJ9EEjIPU"
        // },
        url: 'http://58.247.0.18:29015/v1/netpay/webpay/pay?\n' +
          'appId=10037ca75e6125aa015e9e12a89b001b&timestamp=20170606135700&nonce=99930a147f5353dd8a8f29a5329f37e9&content=\n' +
          '%7B%22requestTimestamp%22%3A%222018-06-\n' +
          '14%2014%3A31%3A36%22%2C%22sign%22%3A%2288FDA8C5105C6F1091BD3EA7CDDBEFC9%22%2C%22mid%22%3A%22898201612345678%22%\n' +
          '2C%22subOrders%22%3A%5B%7B%22mid%22%3A%22988460101800202%22%2C%22totalAmount%22%3A1%7D%2C%7B%22mid%22%3A%229884\n' +
          '60101800203%22%2C%22totalAmount%22%3A1%7D%5D%2C%22tid%22%3A%2288880001%22%2C%22instMid%22%3A%22YUEDANDEFAULT%22\n' +
          '%2C%22platformAmount%22%3A%221%22%2C%22srcReserve%22%3A%22reserve%22%2C%22totalAmount%22%3A%223%22%2C%22limitCr\n' +
          'editCard%22%3A%22%22%2C%22divisionFlag%22%3A%22true%22%2C%22notifyUrl%22%3A%22https%3A%2F%2Fqrtest2.chinaums.com%2Fnetpay-portal%2Ftest%2FnotifyUrl.do%22%2C%22returnUrl%22%3A%22https%3A%2F%2Fqrtest2.chinaums.com%2Fnetpayportal%2Ftest%2FreturnUrl.do%22%2C%22merOrderId%22%3A%221000201806141434075636511%22%7D&signature=IPmdGHYCcfN%2\n' +
          'Bmto0%2F02ZkwoUf1NT3YqPKaUyKMaec1I',
      }).then((res) => {
        console.log(res)
      })

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

