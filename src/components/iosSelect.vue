<template>
    <div>
        <div class="select-box"></div>
    </div>
</template>

<script>
  import IosSelect from 'iosselect'
  import 'iosselect/src/iosSelect.css'
  export default {
    name: "iosSelect",
    props:['paidData'],
    methods:{
      choose() {
        this.$nextTick(() => {
          new IosSelect(1,
            [this.paidData],
            {
              container: '.select-box',
              title:'选择费项',
              itemHeight: 50,
              itemShowCount: 3,
              showAnimate: true,
              callback: (selectOneObj) => {
                this.$emit('func',selectOneObj)
              }
            });
        })

      }
    }
  }
</script>

<style scoped>

</style>