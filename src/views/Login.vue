<template>
    <div class="login-container">
        <div class="login-form">
            {{count}}
            <button @click="setCountAdd"> ++ </button>
            <button @click="setCountReduce"> --</button>
            <router-link to="*"><button>去404</button></router-link>
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
<style scoped>

</style>

