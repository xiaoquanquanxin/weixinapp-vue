<template>
    <div class="paid-box">
        <div class="form-item item-line" v-if="!noList">
            <div class="box">
                <div class="screening">
                    <div>{{billName}}</div>
                    <div id="showBank" @click="choose">费项筛选</div>
                </div>
                <payment class="context" :paidData="paidOutList" :paidName="'paidOut'"
                         @billdsCheck="billdsCheck"></payment>
            </div>
            <div class="freeze" v-if="isFrozen">
                <router-link to="/PaymentRecords">您有账单被冻结，请支付或取消后再缴费>></router-link>
            </div>
            <div :class="['box-footer',{'box-shadow':!isFrozen}]">
                <!--                <input type="checkbox" :checked="allChecked" id="allChecked">-->
                <div class="allCheck">
                    <div class="all-box">
                        <label @click="allCheck">
                            <span :class="['checkbox',{'isChecked':allChecked}]"></span>
                            全选:
                        </label>
                        <b>¥ {{totleMoney}}</b>
                    </div>

                    <div v-if="isFrozen" class="payment isFrozen">立即缴费</div>
                    <div v-else class="payment" @click="goConfirmPayment">立即缴费</div>
                </div>
            </div>
        </div>
        <div v-else class="no-message">
            <img src="~@/assets/images/noMessage.png">
            <p>暂无未缴账单</p>
        </div>
        <ios-select ref="mychild" @func="setRoom" :paidData="paidOutList"></ios-select>
    </div>
</template>

<script>


  import payment from "../../components/payment/payment";
  import iosSelect from "../../components/iosSelect";
  import {ipUri} from "../../main";
  import {mapActions} from "vuex";
  import $ from 'jquery'

  export default {
    name: "paid-in",
    components: {
      payment,
      iosSelect
    },
    data() {
      return {
        noList: false, //
        billName: "全部费用",  // 费项名称
        isFrozen: false, // 冻结状态
        allChecked: true, //是否全选
        billIDsList: [], // 选中的费项列表
        paidOutList: [], // 费项列表
        totleMoney: 0
      }
    },
    created() {
      console.log(ipUri)
      this.getPaymentList() // 获取未缴账单列表
      this.getUnpaidBillTran() // 获取冻结账单列表
    },
    computed: {
      // allChecked() {
      //   return this.$store.state.paidOut.allChecked
      // }

    },
    methods: {
      getPaymentList() {
        let data = {
          roomIDs: '83a7999d-5177-4d0a-9d58-754aaad5db15',
          userID: '575cd6b8b1c54389936cf47fe8347a40' // 物管用户id
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: `${ipUri["/bpi"]}/getUnpaidBill.do`,
          // url: `/bpi/getUnpaidBill.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            this.paidOutList = res.data.content
            this.setTotalMoney(res.data.totalMoney)
            if (this.paidOutList) {
              this.paidOutList.map((item) => {
                // 拿到选中费项列表
                this.billIDsList.push(item.billDetails[0].billIds);
                // 判断是否有冻结账单
                if (item.billDetails[0].isFrozen === '1') {
                  // 默认选中所有费项
                  this.$set(item.billDetails[0], 'checked', true)
                  // 默认选中所有费项
                  this.totleMoney += item.billDetails[0].paidTotal
                }
              })
            } else {
              this.noList = true;
            }

          }
        })
      },
      getUnpaidBillTran() {
        let data = {
          "roomIds": "83a7999d-5177-4d0a-9d58-754aaad5db15",
          "contactNumber": "18201538993"
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/getUnpaidBillTranV1.do',
          url: `${ipUri["/bpi"]}/getUnpaidBillTranV1.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            if (res.data.length) {
              this.isFrozen = 1
            } else {
              this.isFrozen = 0
            }
          }
        })
      },
      ...mapActions('paidOut', [
        'setTotalMoney',
      ]),
      // iosSelect 激活组件
      choose() {
        this.$refs.mychild.choose()
      },
      // 选择房间
      setRoom(value) {
        this.billName = value.value
        this.$showToast.show('hello2020!', 2000)
        // this.$showToast.hide()
      },
      //  全选按钮点击事件
      allCheck() {
        this.paidOutList.map((item) => {
          if (item.billDetails[0].isFrozen === '1') {
            this.$set(item.billDetails[0], 'checked', !this.allChecked)
            if (!item.billDetails[0].checked) {
              this.totleMoney -= item.billDetails[0].paidTotal
            } else {
              this.totleMoney += item.billDetails[0].paidTotal
            }

          }
        })
        // this.setAllChecked(!this.allChecked) // 更改全选按钮状态
        this.setBillIDsList()
      },
      // 立即缴费
      goConfirmPayment() {
        let query = {
          userID: "575cd6b8b1c54389936cf47fe8347a40",
          totleMoney: this.totleMoney,
          billIDsList: this.billIDsList
        }
        console.log(this.billIDsList)
        // this.$router.push({path: '/ConfirmPayment', query})
        this.$router.push({path: '/wechat-pay/ConfirmPayment', query})
      },
      // 单费项点击事件
      billdsCheck(id) {
        this.paidOutList.map((item) => {
          if (item.billDetails[0].billIds == id) {
            // 遍历费项列表 找到选中费项 控制选中状态
            this.$set(item.billDetails[0], 'checked', !item.billDetails[0].checked)
            // 根据选中费项checked属性 添加/删除 选中费项列表内容
            if (!item.billDetails[0].checked) {
              if (this.billIDsList.indexOf(item.billDetails[0].billIds) != '-1') {
                this.billIDsList.splice(this.billIDsList.indexOf(item.billDetails[0].billIds), 1)
              }
              this.totleMoney -= item.billDetails[0].paidTotal
            } else {
              this.billIDsList.push(item.billDetails[0].billIds)
              this.totleMoney += item.billDetails[0].paidTotal
            }
          }

        })
        this.isCheckedAll()
      },
      setBillIDsList() {
        this.isCheckedAll()
        this.billIDsList = []
        if (!this.allChecked) {
          this.billIDsList = []
        } else {
          this.paidOutList.map((item) => {
            this.billIDsList.push(item.billDetails[0].billIds)
          })
        }
      },
      isCheckedAll() {
        // 控制全选按钮
        // 筛选未冻结列表
        let checkedItem = this.paidOutList.filter(item => {
          return item.billDetails[0].isFrozen == '1';
        });
        this.allChecked = checkedItem.every((item) => {
          if (item.billDetails[0].isFrozen === '1') {
            return item.billDetails[0].checked
          }
        })
      },

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
        padding-bottom: 0.8rem;
    }

    .freeze {
        position: fixed;
        bottom: 0.5rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.13rem;
        padding-left: 0.16rem;
        background: #DE8748;
        width: 100%;
        text-align: center;

        a {
            color: #ffffff;
        }
    }

    .screening {
        display: flex;
        justify-content: space-between;
        background: #f8f8f8;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.13rem;
        color: #909090;
        font-size: 0.12rem;

        #showBank {
            font-size: 0.13rem;
            color: #000000;
        }
    }

    .box-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5rem;
        background: #ffffff;
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

            label {
                display: flex;
                align-items: center;
                height: 100%;
            }
        }
    }

    .box-shadow {
        box-shadow: 0 -2px 10px 0 #cbc7c7;

    }

    .no-message {
        padding-top: 1.2rem;
        text-align: center;
        color: #808080;
        font-size: 0.13rem;

        img {
            width: 0.66rem;

        }
    }

    .isFrozen {
        opacity: 0.4;
    }
</style>