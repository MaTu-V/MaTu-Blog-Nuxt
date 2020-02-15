<template>
  <div class="bl-page">
    <Page :current="page" :total="total" :page-size="pageSize" size="small" @on-change="getPageData" show-elevator/>
  </div>
</template>

<script>
  export default {
    props:["page","total","pageSize"],
    methods:{
      getPageData(page){
        // 获取点击的页面
        let that = this
        that.$emit('getData',page)
        // 定时器 （处理页面滚动）
        let currentPosition = document.documentElement.scrollTop || document.body.scrollTop
        that.timeid = setInterval(() => {
          if (currentPosition >0){
            // 定时器
            window.scrollTo(0,currentPosition-=70)
          } else{
            window.scrollTo(0,0)
            clearInterval(that.timeid)
          }
        }, 20)
      }
    }
  }
</script>

<style scoped>
  .bl-page {
    width: inherit;
    padding: 20px 0;
  }
</style>
