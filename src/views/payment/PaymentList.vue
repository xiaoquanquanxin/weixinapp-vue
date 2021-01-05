<template>
    <div class="container">
        <div class="banner">
            <p>¥{{totalMoney}}</p>
            <span>未缴总金额</span>
            <div class="world" @click="choose">
                房间：{{roomName}}
                <!--                <img src="~@/assets/images/right.png">-->
            </div>
        </div>
        <div class="nav line">
            <div>
                <a :class="[{'active':active}]" @click="setAct">未缴账单</a>
            </div>
            <div>
                <a :class="[{'active':!active}]" @click="setUnAct">已缴账单</a>
            </div>
        </div>
        <!--        未缴账单-->
        <div class="content" v-if="active">
            <div class="screening">
                <div>{{billName}}</div>
                <div id="showBank" @click="paidOutChoose">费项筛选</div>
            </div>
            <div class="paid-box">
                <div class="form-item item-line" v-if="!noList">
                    <div class="box">
                        <payment class="context" :paidData="paidOutListFilter" :isFrozen="isFrozen"
                                 :paidName="'paidOut'"
                                 @billdsCheck="billdsCheck"></payment>
                    </div>
                    <div class="freeze" v-if="isFrozen">
                        <router-link to="/wechat-pay/PaymentRecords">您有账单被冻结，请支付或取消后再缴费>></router-link>
                    </div>
                    <div :class="['box-footer',{'box-shadow':!isFrozen}]">
                        <!--                <input type="checkbox" :checked="allChecked" id="allChecked">-->
                        <div class="allCheck">
                            <div class="all-box" :class="[{'isFrozen':isFrozen}]">
                                <label @click="allCheck">
                                    <span :class="['checkbox',{'isChecked':allChecked}]"></span>
                                    全选:
                                </label>
                                <b>¥ {{totleMoney}}</b>
                            </div>

                            <div v-if="isFrozen || totleMoney == 0" class="payment isFrozen">立即缴费</div>
                            <div v-else class="payment" @click="goConfirmPayment">立即缴费</div>
                        </div>
                    </div>
                </div>
                <div v-else class="no-message">
                    <img src="~@/assets/images/noMessage.png">
                    <p>暂无未缴账单</p>
                </div>
                <!--                费项弹框-->
                <ios-select ref="paidOutChild" @func="setCharges" :paidData="costItem"></ios-select>
            </div>
        </div>
        <!--        已缴账单-->
        <div class="content" v-else>
            <payment class="paid-box" :paidData="paidInList" v-if="!noList"></payment>
            <div v-else class="no-message">
                <img src="~@/assets/images/noMessage.png">
                <p>暂无已缴账单</p>
            </div>
        </div>
        <!--        房间弹框-->
        <ios-select ref="mychild" :paidData="room" @func="setRoom"></ios-select>
    </div>
</template>

<script>
  import iosSelect from "../../components/iosSelect";
  import $ from "jquery";
  import {ipUri} from "../../main";
  import payment from "../../components/payment/payment";

  export default {
    name: "PaymentList",
    components: {
      iosSelect,
      payment,
    },
    data() {
      return {
        room: [],
        active: true,
        roomName: "",
        costItem: [], //费项列表
        totalMoney: 0, // 未缴总费用
        roomId: "", //   房间id
        noList: false, //
        billName: "全部费用",  // 费项名称
        isFrozen: false, // 冻结状态
        allChecked: true, //是否全选
        billIDsList: [], // 选中的费项列表
        paidOutList: [], // 未缴账单列表
        paidOutListFilter: [], // 未缴账单列表
        totleMoney: 0,
        paidInList: [], // 已缴账单列表
      }
    },

    created() {
      document.title="欠缴账单列表"
      //  获取房间列表
      this.getRoomList();
    },
    methods: {
      getRoomList() {
        $.ajax({
          type: "POST",
          // url: '/opi/pay/create_order',  //  获取支付签名
          url: `${ipUri["/bpi"]}/getPmdRooms.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {
            wxUserID: "5"
          },
          success: (result) => {
            let roomList = [];
            result.data.forEach((item) => {
              roomList.push({
                id: item.roomId,
                value: item.roomName
              })
            });

            this.room = roomList;
            this.roomName = roomList[0].value //  默认第一个房间名称
            this.roomId = roomList[0].id  // 默认第一个房间id
            this.getUnpaidBillTran() // 获取冻结账单列表
            this.getPaymentList() // 获取未缴账单列表
          }
        })
      },
      setAct() { // 未缴账单导航点击事件
        this.active = true
        this.getPaymentList() // 获取未缴账单列表
        this.getUnpaidBillTran() // 获取冻结账单列表
      },
      setUnAct() { // 已缴账单导航点击事件
        this.active = false
        // 获取已缴账单列表
        this.getPaidInList();
      },
      // 获取已缴账单列表
      getPaidInList() {
        let data = {
          roomIDs: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
          userID: '575cd6b8b1c54389936cf47fe8347a40',
          startDate: '2012-02-05',
          endDate: '2020-02-05'
        };

        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          // url: '/bpi/getPaidBill.do',
          url: `${ipUri["/bpi"]}/getPaidBill.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            this.paidInList = res.data.content
            if (!this.paidInList) {
              this.noList = true
            } else {
              this.noList = false
            }

          }
        })
      },

      //  选择房间
      setRoom(value) {
        this.roomName = value.value
        this.roomId = value.id
        if (this.active) {
          this.getPaymentList() // 获取未缴账单列表
          this.getUnpaidBillTran() // 获取冻结账单列表
        } else {
          this.getPaidInList(); // 获取已缴账单
        }

        // this.$showToast.hide()
      },
      //  唤起弹出层
      choose() {
        this.$refs.mychild.choose()
      },
      // 获取未缴账单列表
      getPaymentList() {
        let data = {
          roomIDs: this.roomId,
          userID: '575cd6b8b1c54389936cf47fe8347a40' // 物管用户id
          // roomIDs: '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
          // userID: '575cd6b8b1c54389936cf47fe8347a40',
        };
        $.ajax({
          crossDomain: true,//兼容ie8,9
          type: "post",
          url: `${ipUri["/bpi"]}/getUnpaidBill.do`,
          // url: `/bpi/getUnpaidBill.do`,
          contentType: "application/x-www-form-urlencoded",
          data: {'json': JSON.stringify(data)},
          success: (res) => {
            this.totleMoney = 0; // 总价格
            this.billIDsList = []; // 选中账单id
            if (res.data.content) {
              this.noList = false;
              this.paidOutList = res.data.content //  所有未缴账单列表
              this.paidOutListFilter = res.data.content // 根据费项
              this.totalMoney = res.data.totalMoney
              let costItem = []; // 费项列表
              this.paidOutListFilter.forEach((item) => {
                item.billDetails.forEach((_item) => {
                  //  拿到项目名称 添加到costItem数组中 去重
                  if (costItem.indexOf(_item.paidName) == -1) {
                    costItem.push(_item.paidName)
                  }
                  // 拿到选中账单id
                  this.billIDsList.push(_item.billIds);
                  // 判断是否有冻结账单
                  if (_item.isFrozen === '1') {
                    // 默认选中所有费项
                    this.$set(_item, 'checked', true)
                    // 默认选中所有费项
                    this.totleMoney += _item.paidTotal
                  }
                })

              })
              costItem.forEach((item) => { // 把处理好的费项赋值给this.costItem
                this.costItem.push({
                  id: "",
                  value: item
                })
              })
            } else {
              this.noList = true;
            }

          }
        })
      },
      // 获取冻结账单列表
      getUnpaidBillTran() {
        let data = {
          "roomIds": this.roomId,
          // "roomIds": '4a7477c8-7a28-46ce-bfc9-678e6dd71aaa',
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
            if (res.data.length) { // 如果有data返回则为有冻结账单
              this.isFrozen = 1
            } else {
              this.isFrozen = 0
            }
          }
        })
      },
      // iosSelect 激活组件 费项
      paidOutChoose() {
        this.$refs.paidOutChild.choose()
      },
      // 选择费项
      setCharges(value) {
        this.billName = value.value
        //  筛选 包含 所选费项的 账单
        this.paidOutListFilter = this.paidOutList.filter((item) => {
          item.billDetails.forEach((_item) => {
            if (_item.paidName == value.value) {
              return item
            }
          })
        })
        this.billIDsList = [];
        this.totleMoney = 0;
        this.paidOutListFilter.forEach((item) => {
          item.billDetails.forEach((_item) => {
            // 拿到选中账单id
            this.billIDsList.push(_item.billIds);
            // 判断是否有冻结账单
            if (_item.isFrozen === '1') {
              // 默认选中所有费项
              this.$set(_item, 'checked', true)
              // 默认选中所有费项
              this.totleMoney += _item.paidTotal
            }
          })
        })
        // this.$showToast.hide()
      },
      //  全选按钮点击事件
      allCheck() {
        this.totleMoney = 0;
        // 如果没有冻结账单 则可以操作账单列表
        if (!this.isFrozen) {
          this.paidOutListFilter.map((item) => {
            item.billDetails.forEach((_item) => {
              if (_item.isFrozen === '1') {
                this.$set(_item, 'checked', !this.allChecked)
                if (_item.checked) {
                  this.totleMoney += _item.paidTotal;
                }
              }
            })

          })
          // this.setAllChecked(!this.allChecked) // 更改全选按钮状态
          this.setBillIDsList() //  设置选中的账单id
        }

      },
      // 立即缴费
      goConfirmPayment() {
        let query = {
          userID: "575cd6b8b1c54389936cf47fe8347a40",
          roomId: this.roomId,
          totleMoney: this.totleMoney,
          billIDsList: this.billIDsList

        }
        console.log(query)
        // this.$router.push({path: '/ConfirmPayment', query})
        this.$router.push({path: '/wechat-pay/ConfirmPayment', query})
      },
      // 费项点击事件
      billdsCheck(id) {
        this.totleMoney = 0;
        this.paidOutListFilter.map((item) => {
          item.billDetails.forEach((_item) => {
            if (_item.billIds == id) {
              // 遍历费项列表 找到选中费项 控制选中状态
              this.$set(_item, 'checked', !_item.checked)
              // 根据选中费项checked属性 添加/删除 选中费项列表内容
              if (!_item.checked) {
                if (this.billIDsList.indexOf(_item.billIds) != '-1') {
                  this.billIDsList.splice(this.billIDsList.indexOf(_item.billIds), 1)
                }
              } else {
                this.billIDsList.push(_item.billIds)
              }
            }
            if (_item.checked) {
              this.totleMoney += _item.paidTotal;
            }
          })

        });
        this.totleMoney = this.totleMoney.toFixed(2)
        this.isCheckedAll()
      },
      setBillIDsList() {
        this.isCheckedAll()
        this.billIDsList = []
        if (!this.allChecked) {
          this.billIDsList = []
        } else {
          this.paidOutListFilter.map((item) => {
            item.billDetails.forEach((_item) => {
              this.billIDsList.push(_item.billIds)
            })

          })
        }
      },
      isCheckedAll() {
        // 控制全选按钮
        let checkedItem = this.paidOutListFilter.every(item => {
         return item.billDetails.some((_item) => {
           return _item.checked
         })
        });
        this.allChecked = checkedItem
      },

    }
  }
</script>

<style scoped lang="less">
    @import '~@/assets/css/common.less';

    .container {
        height: 100%;
        font-size: 0.16rem;
    }

    .banner {
        height: 1.29rem;
        background-image: url("~@/assets/images/banner.png");
        background-size: cover;
        flex: none;
        text-align: center;

        p {
            margin: 0;
            padding-top: 0.19rem;
            font-size: 0.26rem;
            /*font-weight: bold;*/
            color: #FFFFFF;
            line-height: 0.37rem;
            /*text-align: center;*/
        }

        span {
            font-size: 0.12rem;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 0.17rem;
            opacity: 0.75;
        }

        div {
            width: 92%;
            height: 0.3rem;
            color: #ffffff;
            margin: 0 auto;
            text-align: left;
            padding: 0.06rem 0.1rem;
            padding-right: 0.35rem;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.14);
            background-image: url("~@/assets/images/right.png");
            background-size: 0.07rem 0.11rem;
            background-repeat: no-repeat;
            background-position: center right 0.1rem;
            font-size: 0.13rem;

            margin-top: 0.08rem;
            opacity: 0.75;
        }
    }

    .nav {
        display: flex;
        height: 0.4rem;
        background: #ffffff;
        margin-top: 0.1rem;

        div {
            height: 0.39rem;
            line-height: 0.4rem;
            flex: 1;
            text-align: center;
            padding: 0 0.5rem;
            box-sizing: border-box;

            a {
                font-size: .12rem;
                display: block;
                height: 100%;
                color: #808080;
                border-bottom: 1px solid transparent;
            }
        }
    }

    .nav .active {
        border-bottom: 1px solid #04639D;
        color: #04639D;
    }


    .content {
        background-color: #F8F8F8;
        overflow: hidden;
        /*padding-bottom: 1.0rem;*/
    }


    //  未缴账单
    .paid-box {
        height: 100%;
        overflow-y: scroll;
    }

    .context {
        padding-bottom: 1rem;
    }

    .form-item {
        background: #ffffff;
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


    //  已缴账单
    .paid-box {
        overflow-y: scroll;
        background: #ffffff;
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
</style>