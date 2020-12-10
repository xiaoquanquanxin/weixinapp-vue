<template>
    <div class="container">
        <div class="room">房间：实地·遵义蔷薇国际-D3地块(7、8地块及03地…</div>
        <div class="content">

            <div class="payment-box">
                <div class="payment-list" v-for="item in billList" :key="item.billDetails[0].billIds">
                    <h3>[{{item.billMonth}}]</h3>
                    <div v-for="items in item.billDetails" :key="items.billIds">
                        <p class="paymen-name">{{items.paidName}}</p>
                        <p class="payment-money">￥{{items.paidTotal}}</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="box-shadow box-footer">
            <div class="allCheck">
                <div class="all-box">
                    <label>
                        待支付:
                    </label>
                    <b>¥ {{totleMoney}}</b>
                </div>
                <div class="payment" @click="goPay">立即缴费</div>
            </div>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: "ConfirmPayment",
    data() {
      return {
        billList: [],
        totleMoney: 0
      }
    },
    created() {
      let data = {
        roomIDs: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
        userID: '575cd6b8b1c54389936cf47fe8347a40'
      };
      this.billIDsList = this.$route.query.billIDsList
      $.ajax({
        crossDomain: true,//兼容ie8,9
        type: "post",
        url: '/bpi/getUnpaidBill.do',
        contentType: "application/x-www-form-urlencoded",
        data: {'json': JSON.stringify(data)},
      }).then((res) => {
        // resolve(data) billIds
        this.totleMoney = res.data.totalMoney
        this.billIDsList.map((billItem) => {
          res.data.content.map((item) => {
            // eslint-disable-next-line no-debugger
            if (item.billDetails[0].billIds == billItem) {
              this.billList.push(item)
            }
          })
        })
      })
      console.log(navigator.userAgent) //  获取手机型号
    },
    methods:{
      goPay(){
        this.$router.push({path:'/PaySuccess'})
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .container {
        background: #F8F8F8;
        font-size: 0.14rem;
    }

    .content {
        overflow-y: scroll;
        padding-bottom: 0.6rem;
    }

    .room {
        width: 100%;
        height: 0.3rem;
        text-align: left;
        padding: 0.06rem 0.1rem;
        padding-right: 0.35rem;
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.14);
        font-size: 0.13rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        opacity: 0.75;
        color: #000000;
        flex: none;
    }

    .payment-box {
        margin-top: 0.1rem;
        background: #ffffff;

        .payment-list {
            padding: 0.13rem;
            box-sizing: border-box;
            background: #ffffff;
            border-bottom: 0.01rem solid #ECECEC;

            h3 {
                font-size: 0.14rem;
            }

            div {
                display: flex;
                justify-content: space-between;
                font-size: 0.13rem;
                line-height: 0.3rem;

                .paymen-name {
                    color: #505050;

                }

                .payment-money {
                    color: #333333;
                }
            }
        }
    }

    .box-shadow {
        box-shadow: 0 -2px 10px 0 #cbc7c7;
        padding: 0 0.1rem;
        box-sizing: border-box;
        height: 0.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #ffffff;

        .checkbox {
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
            border: 0.01rem solid #979797;
            border-radius: 100%;
            margin-right: 0.1rem;
        }

        .isChecked {
            background-image: url("~@/assets/images/checked.png");
            background-size: cover;
            width: 0.16rem;
            height: 0.16rem;
            border: none;
        }

        .allCheck {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 0.13rem;
            font-weight: 400;
            color: #333333;

            b {
                font-size: 0.15rem;
                color: #DF4949;
                line-height: 0.21rem;
                margin-left: 0.2rem;
            }

        }

        .payment {
            width: 1rem;
            height: 0.4rem;
            background: #04639D;
            border-radius: 0.05rem;
            font-size: 0.15rem;
            color: #FFFFFF;
            line-height: 0.4rem;
            text-align: center;
        }

        .all-box {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;

            label {
                display: flex;
                align-items: center;
                height: 100%;
            }

        }
    }
</style>