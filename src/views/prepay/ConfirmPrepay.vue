<template>
    <div class="container">
        <div class="room world">房间：实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="payment-list line">
            <div>
                <p class="paymen-name">{{feeName}}</p>
                <p class="payment-money">￥{{perUnit}}</p>
            </div>
        </div>
        <div class="footer" @click="goPay">微信支付</div>
    </div>
</template>

<script>
  import $ from "jquery";
  import {ipUri} from "../../main";

  export default {
    name: "ConfirmPrepay",
    data(){
      return{
        feeName:"",
        perUnit:"",
        type:"",
        arr:[],
        orderId:""
      }
    },
    created() {
      this.feeName = this.$route.query.feeName
      this.perUnit = this.$route.query.perUnit
      this.arr = this.$route.query.arr
      this.type = this.$route.query.type
    },
    methods: {
      goPay() {
        let data = {
          pmdsRoomId: this.roomID, // 房间主数据id
          cmdsId: '575cd6b8b1c54389936cf47fe8347a40', // 用户主数据id
          userID: 1, // 用户主数据id
          userName: "f范秉川", // 客户名称
          phoneNum: '18500039456', // 用户手机号
          feeItems: JSON.stringify(this.arr), // 订单明细 json格式
          villageInfoId: "1", // 楼盘ID
          terminalSource: '1', // 终端类型 0 Android 1 iPhone
          totalAmount: this.perUnit, // 订单金额
          feeId: this.feeId, // 费项id
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/property/prepayment/createAdvanceOrder',
          url: `${ipUri["/bpi"]}/property/prepayment/createAdvanceOrder`,
          data: data,
          success: (res) => {
            console.log(res)
            if (res.code == 2000) {
              // this.$router.push('ConfirmPayment')

            }

          }
        })
        this.$router.push({path: '/PaySuccess', query: {'type': this.type,'orderId':this.orderId}})
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .room {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: left;
        padding: 0 0.11rem;
        box-sizing: border-box;
        background-color: #ffffff;
        font-size: 0.14rem;
        color: #000000;
        flex: none;
    }

    .payment-list {
        padding: 0.11rem;
        box-sizing: border-box;
        background: #ffffff;
        margin-top: 0.11rem;

        h3 {
            font-size: 0.14rem;
        }

        div {
            display: flex;
            justify-content: space-between;
            font-size: 0.14rem;
            line-height: 0.3rem;

            .paymen-name {
                color: #505050;
            }

            .payment-money {
                color: #DF4949;
            }
        }
    }

    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0.1rem;
        margin: auto;
        height: 0.44rem;
        background: #04639D;
        border-radius: 0.04rem;
        text-align: center;
        line-height: 0.44rem;
        color: #ffffff;
        font-size: 0.15rem;
        width: 92%;
    }
</style>