<template>
    <div class="">
        <div class="payment right-button">
            <div @click="goPage('PaymentList/paid-out')">物业缴费</div>
        </div>
        <div class="payment right-button">
            <div @click="goPage('PaymentList/paid-out')">预缴费用</div>
        </div>
        <div class="payment right-button">
            <router-link to="/">缴费记录</router-link>
        </div>
    </div>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    computed: {
      count() {
        return this.$store.state.test.count
      }
    },
    data() {
      return {};
    },
    methods: {
      ...mapActions('test', [
        'setCountAdd',
        'setCountReduce',
      ]),
      goPage(url) {
        // this.$axios({
        //   url: "aaa",
        //   method: 'get',
        // }).then(()=>{
        //   this.$router.push({path: url})
        // })
        this.$router.push({path: url})
      }
    }
  };
</script>
<style scoped lang="less">
    // 列表组件布局 用react的话 直接把下面注释就可以
    .payment {
        height: 0.5rem;
        line-height: 0.5rem;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        padding: 0 0.26rem;
        box-sizing: border-box;
        margin-bottom: 0.1rem;
        font-size: .12rem;
        div {
            width: 100%;
            height: 100%;
        }
    }

</style>

