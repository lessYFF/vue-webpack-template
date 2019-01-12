<template>
    <div id="app">
        <img alt="Vue logo" src="@assets/images/logo.png" />
        <HelloWorld msg="Vue.js App using webpack4" />
    </div>
</template>

<script>
import HelloWorld from '@views/home/components/helloworld.vue'

export default {
    name: 'app',
    components: {
        HelloWorld,
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
