<template>
    <div class="paid-box">
        <div class="form-item item-line">
            <div class="box">
                <!--                <input type="hidden" name="bank_id" id="bankId" value="">-->

                <div class="screening">
                    <div>{{billName}}</div>
                    <div id="showBank" @click="choose">费项筛选</div>
                </div>
                <payment class="context" :paidData="paidOut" :paidName="'paidOut'"></payment>
            </div>
            <div class="freeze" v-if="isFreeze">您有账单被冻结，请支付或取消后再缴费>></div>
            <div class="box-footer"></div>
        </div>
        <ios-select ref="mychild" @func="setRoom" :paidData="paidOut"></ios-select>
    </div>
</template>

<script>


  import payment from "../../components/payment/payment";
  import iosSelect from "../../components/iosSelect";

  export default {
    name: "paid-in",
    components: {
      payment,
      iosSelect
    },
    data() {
      return {
        isFreeze:false, // 冻结状态
        paidOut: [      // 费项列表
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
              {'id': '10003', 'value': '建设银行'},
            ]
          },
          {
            'year': '2019', 'data': [
              {'id': '10004', 'value': '建设银行'},
            ]
          },
          {
            'year': '2020', 'data': [
              {'id': '10005', 'value': '建设银行'},
            ]
          },
          {
            'year': '2021', 'data': [
              {'id': '10006', 'value': '建设银行'},
            ]
          },
          {
            'year': '2022', 'data': [
              {'id': '10007', 'value': '建设银行'},
            ]
          },
          {
            'year': '2023', 'data': [
              {'id': '10008', 'value': '建设银行'},
            ]
          },
        ],
        billName: ""  // 费项名称
      }
    },
    methods: {
      choose() {
        this.$refs.mychild.choose()
      },
      setRoom(value) {
        console.log(value)
        this.bill = value.value
        this.$showToast.show('hello2020!', 2000)
        // this.$showToast.hide()
      },
    }
  }
</script>

<style scoped>
    /*@import '~@/assets/css/common.less';*/
    .paid-box {
        overflow-y: scroll;
        background: #ffffff;
    }

    .form-item {
        font-size: 0.16rem;
    }

    .context {
        padding-bottom: 0.6rem;
    }

    .box-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.4rem;
        background: #ffffff;
    }
    .freeze{
        position: fixed;
        bottom: 0.4rem;
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.14rem;
        padding-left: 0.16rem;
        background: red;
        width: 100%;
        color: #ffffff;
    }
    .screening {
        display: flex;
        justify-content: space-between;
        background: #f8f8f8;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.13rem;
    }
</style>