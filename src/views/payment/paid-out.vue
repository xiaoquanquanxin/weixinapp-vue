<template>
    <div class="paid-box">
        <div class="form-item item-line">
            <div class="box">
                <!--                <input type="hidden" name="bank_id" id="bankId" value="">-->

                <div class="screening">
                    <div>{{billName}}</div>
                    <div id="showBank" @click="choose">费项筛选</div>
                </div>
                <payment class="context" :paidData="paidOutList" :paidName="'paidOut'"></payment>
            </div>
            <div class="freeze" v-if="isFreeze">您有账单被冻结，请支付或取消后再缴费>></div>
            <div :class="['box-footer',{'box-shadow':!isFreeze}]">
                <!--                <input type="checkbox" :checked="allChecked" id="allChecked">-->
                <div class="allCheck">
                    <div class="all-box">
                        <label @click="allCheck">
                            <span :class="['checkbox',{'isChecked':allChecked}]"></span>
                            全选:
                        </label>
                        <b>¥1265.00</b>
                    </div>
                    <div class="payment">立即缴费</div>
                </div>
            </div>
        </div>
        <ios-select ref="mychild" @func="setRoom" :paidData="paidOutList"></ios-select>
    </div>
</template>

<script>


  import payment from "../../components/payment/payment";
  import iosSelect from "../../components/iosSelect";
  import {mapActions} from "vuex";

  export default {
    name: "paid-in",
    components: {
      payment,
      iosSelect
    },
    data() {
      return {
        isFreeze: false, // 冻结状态
        paidOutList: [],
        billName: ""  // 费项名称
      }
    },
    created() {
      // 获取费用项目列表
      this.paidOutList = [
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
    computed: {
      allChecked() {
        return this.$store.state.paidOut.allChecked
      }
    },
    methods: {
      ...mapActions('paidOut', [
        //  保存病人信息，这是为了给组件用，而不是页面，所以要store
        'setAllChecked',
      ]),
      choose() {
        this.$refs.mychild.choose()
      },
      setRoom(value) {
        console.log(value)
        this.bill = value.value
        this.$showToast.show('hello2020!', 2000)
        // this.$showToast.hide()
      },
      allCheck() {
        this.paidOutList.map((item) => {
          this.$set(item.billDetails[0], 'checked', !this.allChecked)
        })
        this.setAllChecked(!this.allChecked) // 更改全选按钮状态
      }
    }
  }
</script>

<style scoped lang="less">
    /*@import '~@/assets/css/common.less';*/
    .paid-box {
        overflow-y: scroll;
        background: #ffffff;
    }

    .context {
        padding-bottom: 0.6rem;
    }

    .freeze {
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

    .box-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5rem;
        background: #ffffff;
    }

    .box-shadow {
        box-shadow: 0 -2px 10px 0 #cbc7c7;
        padding: 0 0.1rem;
        box-sizing: border-box;

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
        }
    }

</style>