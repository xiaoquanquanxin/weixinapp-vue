<template>
    <div class="container">
        <div class="banner">
            <p @click="choose">{{roomName}}</p>
        </div>
        <div class="nav">
            <div>
                <router-link to="/PaymentList/paid-out" active-class="active" exact>未缴账单</router-link>
            </div>
            <div>
                <router-link to="/PaymentList/paid-in" active-class="active">已缴账单</router-link>
            </div>
        </div>
        <router-view class="content"></router-view>
        <ios-select ref="mychild" :paidData="room" @func="setRoom"></ios-select>
    </div>
</template>

<script>
  import iosSelect from "../../components/iosSelect";

  export default {
    name: "PaymentList",
    components: {
      iosSelect
    },
    data() {
      return {
        room: [
          {'id': '10001', 'value': '实地-遵义蔷薇国际'},
          {'id': '10002', 'value': '中山-遵义蔷薇国际'},
          {'id': '10003', 'value': '广州-遵义蔷薇国际'},
          {'id': '10004', 'value': '北京-遵义蔷薇国际'},
          {'id': '10005', 'value': '天津-遵义蔷薇国际'},
        ],
        roomName:"实地-遵义蔷薇国际"
      }
    },
    methods: {
      setRoom(value) {
        console.log(value)
        this.roomName = value.value
        this.$showToast.show('hello2020!',2000)
        // this.$showToast.hide()
      },
      choose() {
        this.$refs.mychild.choose()
      }
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
        height: 1.2rem;
        background: #b5b5b5;
        flex: none;
    }

    .nav {
        display: flex;
        height: 0.4rem;
        background: #ffffff;
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
                border-bottom: 1px solid transparent;
            }
        }
    }

    .nav .active {
        border-bottom: 1px solid #6f2222;
        color: darkred;
    }
</style>