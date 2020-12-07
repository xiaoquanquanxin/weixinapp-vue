<template>
    <div class="paid-box">
        已缴
        <payment class="paid-box" :paidData="paidIn"></payment>
    </div>
</template>

<script>
  import payment from "../../components/payment/payment";

  export default {
    name: "paid-in",
    data() {
      return {
        paidIn: [
          {'id': '10000', 'value': '已缴已缴已缴'},
          {'id': '10001', 'value': '工商银行'},
          {'id': '10002', 'value': '农业银行'},
          {'id': '10003', 'value': '建设银行'},
          {'id': '10004', 'value': '中国银行'},
          {'id': '10005', 'value': '工商银行'},
          {'id': '10006', 'value': '农业银行'},
          {'id': '10007', 'value': '建设银行'},
          {'id': '10008', 'value': '中国银行'},
          {'id': '10009', 'value': '工商银行'},
        ]
      }
    },
    components: {
      payment
    },
  }
</script>

<style scoped>
    .paid-box {
        overflow-y: scroll;
    }
</style>