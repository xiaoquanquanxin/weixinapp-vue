<template>
    <div>
        <div class="pay">
            <img src="~@/assets/images/paysuccess.png" alt="">
            <p>订单支付成功</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "PaySuccess"
  }
</script>

<style scoped lang="less">
    .pay{
        width: 100%;
        height: 1.27rem;
        background: #FFFFFF;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        img{
            width: 0.45rem;
            height: 0.45rem;
        }
        p{
            font-size: 0.18rem;
            color: #000000;
            line-height: 0.25rem;
        }
    }
</style>