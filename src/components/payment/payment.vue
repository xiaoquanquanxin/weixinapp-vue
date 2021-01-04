<template>
    <div class="form-item">
        <ul>
            <li v-for="(item,index) in paidData" :key="index" class="line">
                <div class="year line">{{item.billMonth}}</div>
                <div v-for="items in item.billDetails" :key="items.billIds"
                     :class="['paid-cont',{'isFrozen':isFrozen}]"
                     @click="choosepaid(items.billIds,index,Number(items.isFrozen))">
                    <div>
                        <span v-if="paidName === 'paidOut'" :class="['checkbox',{'isChecked':items.checked}]"></span>
                        <div class="world">
                            {{items.paidName}}
                            <span v-if="!Number(items.isFrozen)" class="border">冻结</span>
                        </div>
                    </div>
                    <div class="paid-pay">
                        ￥{{items.paidTotal}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

  // import {mapActions} from "vuex";

  export default {
    name: "payment",
    data() {
      return {
        // paidList: this.$store.state.paidOut.paidOutList,
        // billdsList:[]
      }
    },
    props: ['paidData', 'paidName', 'isAllChecked','isFrozen'],
    computed: {
      allChecked() {
        return this.$store.state.paidOut.allChecked
      }
    },
    created() {
    },
    methods: {
      // ...mapActions('paidOut', [
      //   //  保存病人信息，这是为了给组件用，而不是页面，所以要store
      //   'setAllChecked',
      // ]),
      choosepaid(id, index) {
        let prev = true ,next = true;
        // 如果没有冻结账单 则可以操作账单列表
        if(!this.isFrozen){
          //  判断之前月份有没有没勾选
          for (let i = 0; i < index; i++) {
            if (this.paidData[i]) {
              this.paidData[i].billDetails.forEach((_item) => {
                if(!_item.checked){
                  this.$showToast.show('不能跳月缴费，请把之前的月份账单结清。', 2000)
                  prev = false
                }
              })
            }
          }
          //  判断之后月份有没有勾选
          for (let i = index, len = this.paidData.length; i < len; i++) {
            if (this.paidData[i + 1]) {
              this.paidData[i+1].billDetails.forEach((_item) => {
                if(_item.checked){
                  this.$showToast.show('不能跳月缴费，请把之前的月份账单结清。', 2000)
                  next = false
                }
              })

            }
          }
          // 都不满足则不是跳月缴费 可以操作勾选
          if(prev && next){
            this.$emit('billdsCheck', id)
          }

        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "~@/assets/css/common.less";

    .form-item {
        font-size: 0.16rem;
    }

    li {
        padding-left: 0.1rem;

        div {
            line-height: 0.4rem;
        }
    }

    .year {
        font-size: 0.14rem;
    }

    .paid-cont {
        display: flex;
        justify-content: space-between;
        padding-right: 0.1rem;
        font-size: 0.13rem;
        color: #333333;

        > div {
            display: flex;
            align-items: center;

            .world {
                width: 2.6rem;
            }
        }

    }

    .checkbox {
        display: block;
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

    .isFrozen {
        opacity: 0.4;
    }
    .border{
        padding: 0.02rem 0.06rem;
        border: 1px solid #ECECEC;
        font-size: 0.11rem;
    }
</style>