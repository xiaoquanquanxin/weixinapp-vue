<template>
    <div class="form-item">
        <ul>
            <li v-for="item in paidData" :key="item.index">
                <div class="year">{{item.year}}</div>
                <div v-for="items in item.data" :key="items.id" >
                    <input v-if="paidName === 'paidOut'" type="checkbox" :id="items.id"><label :for="items.id">{{items.value}}</label>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>


  export default {
    name: "payment",
    data() {
      return {

      }
    },
    props:['paidData','paidName'],
    methods: {


    }
  }
</script>

<style scoped lang="less">
    .form-item {
        font-size: 0.16rem;
    }
    li{
        border-bottom: 1px solid #eeeeee;
        padding-left: 0.13rem;
        div{
            line-height: 0.4rem;
        }
    }
    .year{
        border-bottom: 1px solid #eeeeee;
    }

</style>