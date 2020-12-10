<template>
    <div class="form-item">
        <ul>
            <li v-for="item in paidData" :key="item.index">
                <div class="year">{{item.billMonth}}</div>
                <div v-for="items in item.billDetails" :key="items.billIds" class="paid-cont"
                     @click="choosepaid(items.billIds)">
                    <div>
                        <span v-if="paidName === 'paidOut'" :class="['checkbox',{'isChecked':items.checked}]"></span>{{items.paidName}}
                    </div>
                    <div>
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
    props: ['paidData', 'paidName', 'isAllChecked'],
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
      choosepaid(id) {
        // console.log(id)
        // this.paidData.map((item,index) => {
        //   if (item.billDetails[0].billIds == id) {
        //     if(item.billDetails[0].checked){
        //       this.billdsList.splice(index,1)
        //     }else{
        //       this.billdsList.push(item.billDetails[0])
        //     }
        //     this.$set(item.billDetails[0], 'checked', !item.billDetails[0].checked)
        //   }
        // })
        // let isCheck = this.paidData.every((item)=>{
        //   return item.billDetails[0].checked
        // })
        this.$emit('func',id)
        // console.log(this.billdsList)
        // this.setAllChecked(isCheck)
      }
    }
  }
</script>

<style scoped lang="less">
    .form-item {
        font-size: 0.16rem;
    }

    li {
        border-bottom: 1px solid #eeeeee;
        padding-left: 0.1rem;

        div {
            line-height: 0.4rem;
        }
    }

    .year {
        border-bottom: 1px solid #eeeeee;
    }

    .paid-cont {
        display: flex;
        justify-content: space-between;
        padding-right: 0.1rem;
    }

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
</style>