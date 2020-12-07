<template>
    <div class="container">
        <div class="banner" @click="aaa"></div>
        <div class="nav">
            <div>
                <router-link to="/PaymentList/paid-out" active-class="active" exact>未缴账单</router-link>
            </div>
            <div>
                <router-link to="/PaymentList/paid-in" active-class="active">已缴账单</router-link>
            </div>
        </div>
        <router-view class="content"></router-view>
    </div>
</template>

<script>

  export default {
    name: "PaymentList",
    methods:{
      aaa(){
        this.$showToast.show('hello2020!')
        // this.$showToast.hide()
      }
    }
  }
</script>

<style scoped lang="less">
    @import '~@/assets/css/common.less';
    .container{
        height: 100%;
    }
    .banner{
        height: 1.2rem;
        background: #b5b5b5;
        flex: none;
    }
    .nav{
        display: flex;
        height: 0.4rem;
        div{
            height: 0.4rem;
            line-height: 0.4rem;
            flex: 1;
            text-align: center;
            padding: 0 0.5rem;
            box-sizing: border-box;
            a{
                font-size: .12rem;
                display: block;
                height: 100%;
                border-bottom: 1px solid transparent;
            }
        }
    }
    .nav .active{
        border-bottom: 1px solid #6f2222;
        color: darkred;
    }
</style>