<template>
<div class="container">
    <app-login></app-login>
    <app-footer></app-footer>
        
</div>
</template>

<script>
    import Login from '../userPages/Login';
    import Footer from '../components/Footer';
export default {

  components: {
    'app-login': Login,
    'app-footer': Footer

  }
}
</script>
<style scoped>
.container {
    width: 100%;
}
</style>>
