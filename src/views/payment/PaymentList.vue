<template>
    <div class="container">
        <div class="banner">
            <p>¥1265.00</p>
            <span>未缴总金额</span>
            <div class="world" @click="choose">
                房间：{{roomName}}
                <!--                <img src="~@/assets/images/right.png">-->
            </div>
        </div>
        <div class="nav">
            <div>
                <router-link to="/PaymentList/Paid-out" active-class="active" exact>未缴账单</router-link>
            </div>
            <div>
                <router-link to="/PaymentList/Paid-in" active-class="active">已缴账单</router-link>
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
          {'id': '10001', 'value': '实地 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着)'},
          {'id': '10002', 'value': '中山 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
          {'id': '10003', 'value': '广州 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
          {'id': '10004', 'value': '北京 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
          {'id': '10005', 'value': '天津 - 遵义蔷薇国际 - D3地块(7、8地块及周边地块还有啥来着'},
        ],
        roomName: "实地-遵义蔷薇国际"
      }
    },
    methods: {
      setRoom(value) {
        console.log(value)
        this.roomName = value.value
        this.$showToast.show('hello2020!', 2000)
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