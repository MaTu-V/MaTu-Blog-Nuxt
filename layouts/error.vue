<template>
  <div class="wrapper">
    <Header>
      <blog-header/>
    </Header>
    <div v-if="error" class="error-image"  @click="goBack">
      <img src="../static/error/404.png" width="350" height="350"/>
    </div>
    <Footer>
      <blog-footer/>
    </Footer>
  </div>
</template>

<script>
  import blogHeader from '../components/public/header/index.vue';
  import blogFooter from '../components/public/footer/index.vue';
  export default {
    props:["error"],
    methods:{
      goBack(){
        window.location.href = "/"
      }
    },
    components:{
      blogHeader,
      blogFooter
    }
  }
</script>

<style lang="scss" scoped>
.error-image{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
