<template>
  <!--用户入口页面-->
  <div>
    <!--首页内容展示-->
    <b-container/>
  </div>
</template>

<script>
  /**
   * 将article作为普通用户入口
   */
  import bContainer from './article/index.vue';

  export default {
    layout: "public",
    components: {
      bContainer
    },
    beforeCreate(){
      // 初始化前跳转 路由重定向
       this.$router.push({path:'/article/'})
    }
  }
</script>

<style scoped>

</style>
