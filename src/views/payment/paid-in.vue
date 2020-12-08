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
          {
            'year': '2016', 'data': [
              {'id': '10001', 'value': '工商银行'},
            ]
          },
          {
            'year': '2017', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
          {
            'year': '2018', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
          {
            'year': '2019', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
          {
            'year': '2020', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
          {
            'year': '2021', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
          {
            'year': '2022', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
          {
            'year': '2023', 'data': [
              {'id': '10002', 'value': '建设银行'},
            ]
          },
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
        background: #ffffff;
    }
</style>