<template>
    <div class="">
        <div class="payment right-button">
            <router-link to="Payment">物业缴费</router-link>
        </div>
        <div class="payment right-button">
            <router-link to="">预缴费用</router-link>
        </div>
        <div class="payment right-button">
            <router-link to="PaymentList/paid-in">缴费记录</router-link>
        </div>
    </div>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    computed: {
      count(){
        return this.$store.state.test.count
      }
    },
    data(){
      return {};
    },
    methods: {
      //  xxx
      ...mapActions('test', [
        'setCountAdd',
        'setCountReduce',
      ]),
    }
  };
</script>
<style scoped lang="less">
    // 列表组件布局 用react的话 直接把下面注释就可以
    .payment{
        height: 0.5rem;
        line-height: 0.5rem;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        padding: 0 0.26rem;
        box-sizing: border-box;
        margin-bottom: 0.1rem;
        a{
            font-size: .12rem;
            display: block;
            width: 100%;
            height: 100%;
        }
    }

</style>

