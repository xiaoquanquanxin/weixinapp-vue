<template>
    <div class="form-item">
        <ul>
            <li v-for="item in paidData" :key="item.id">{{item.value}}</li>
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
    props:['paidData'],
    methods: {


    }
  }
</script>

<style scoped>


    .form-item {
        font-size: 0.16rem;
    }

</style>