<template>
<div>
     <div class="container">
       <img src="../assets/logo.png" alt="" width="140" height="100">
        <app-header></app-header>
        <hr>
        <app-footer></app-footer>
    </div>
</div>
  
    
</template>

<script>
    import Header from '../components/Header';
    import Footer from '../components/Footer';
export default {
  
  components: {
    'app-header': Header,
    'app-footer': Footer

  }
}
</script>

<style >

</style>
