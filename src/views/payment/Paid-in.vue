<template>
    <div class="paid-box">
        <payment class="paid-box" :paidData="paidInList"></payment>
    </div>
</template>

<script>
  import payment from "../../components/payment/payment";
  import $ from 'jquery'
  export default {
    name: "paid-in",
    data() {
      return {
        paidInList: []
      }
    },
    created() {
      // 获取费用项目列表
      let data = {
        roomIDs: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
        userID: '575cd6b8b1c54389936cf47fe8347a40',
        startDate:'2012-02-05',
        endDate:'2020-02-05'
      };

      $.ajax({
        crossDomain: true,//兼容ie8,9
        type: "post",
        url: '/bpi/getPaidBill.do',
        contentType: "application/x-www-form-urlencoded",
        data: {'json': JSON.stringify(data)},
      }).then((res) => {
        // resolve(data)
        this.paidInList = res.data.content
      })
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