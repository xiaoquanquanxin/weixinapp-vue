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

