<template>
    <div class="paid-box">
        <payment class="paid-box" :paidData="paidInList"></payment>
    </div>
</template>

<script>
  import payment from "../../components/payment/payment";

  export default {
    name: "paid-in",
    data() {
      return {
        paidInList: []
      }
    },
    created() {
      // 获取费用项目列表
      this.paidInList = [
        {
          "billMonth": "2019-9",
          "billDetails": [
            {
              "paid": "4801",
              "paidName": "住宅物业管理费",
              "paidStatus": "0",
              "isMeter": "1",
              "paidTotal": 183,
              "isFrozen": "0",
              "billIds": "789612"
            }
          ]
        },
        {
          "billMonth": "2019-10",
          "billDetails": [
            {
              "paid": "4801",
              "paidName": "住宅物业管理费",
              "paidStatus": "0",
              "isMeter": "1",
              "paidTotal": 183,
              "isFrozen": "1",
              "billIds": "799458"
            }
          ]
        },
      ]
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