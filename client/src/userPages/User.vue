<template>
<div class="container">
    <app-header></app-header>
    <app-newPost></app-newPost>
    <app-feedPost></app-feedPost>
    <app-feedPost></app-feedPost>
    <app-footer></app-footer>
        
</div>
</template>

<script>
import Header from '../components/Header';
import NewPost from '../components/NewPost';
import FeedPost from '../components/Feed';
import Footer from '../components/Footer';

export default {

  components: {
    'app-header': Header,
    'app-newPost':NewPost,
    'app-feedPost':FeedPost,
    'app-footer': Footer

  },

}
</script>
<style scoped>
</style>