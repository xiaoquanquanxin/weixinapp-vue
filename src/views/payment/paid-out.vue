<template>
    <div class="paid-box">
        未缴
        <div class="form-item item-line">
            <div class="box">
                <!--                <input type="hidden" name="bank_id" id="bankId" value="">-->
                <span id="showBank" @click="choose">费项筛选</span>
                <payment class="context" :paidData="paidOut"></payment>
            </div>
            <div class="box-footer"></div>
        </div>
        <div class="select-box"></div>
    </div>
</template>

<script>
  import IosSelect from 'iosselect'
  import 'iosselect/src/iosSelect.css'

  import payment from "../../components/payment/payment";
  export default {
    name: "paid-in",
    components:{
      payment
    },
    data() {
      return {
        paidOut: [
          {'id': '10000', 'value': '未缴未缴未缴未缴未缴'},
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
    methods: {
      choose() {
        this.$nextTick(() => {
          new IosSelect(1,
            [this.paidOut],
            {
              container: '.select-box',
              itemHeight: 50,
              itemShowCount: 3,
              showAnimate: true,
              callback: function (selectOneObj) {
                console.log(selectOneObj)
              }
            });
        })

      }
    }
  }
</script>

<style scoped>
    /*@import '~@/assets/css/common.less';*/
    .paid-box{
        overflow-y: scroll;
    }
    .form-item {
        font-size: 0.16rem;
    }
    .context{
        padding-bottom: 0.4rem;
    }
    .box-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.4rem;
        background: red;
    }
</style>