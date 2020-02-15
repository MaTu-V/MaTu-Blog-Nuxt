<template>
  <Row type="flex" justify="start" class="code-row-bg">
    <Col :xs="8" :md="8">
      <Icon custom="iconfont icon-QQ" class="icon-qq bl-cursor" size="40" @click="clickThird(0)"/>
    </Col>
    <Col :xs="8" :md="8">
      <Icon custom="iconfont icon-weixin" class="icon-qq bl-cursor" size="44" @click="clickThird(1)"/>
    </Col>
    <Col :xs="8" :md="8">
      <Icon custom="iconfont icon-xinlang" class="icon-qq bl-cursor" size="40" @click="clickThird(2)"/>
    </Col>
  </Row>
</template>

<script>
  // 第三方登录插件
  export default {
    methods:{
      clickThird(id){
        this.$Message.warning("很抱歉此处带建设中，请尝试其他登录方式....")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-qq:hover {
    color: #2db7f5;
  }

  .icon-weixin:hover {
    color: #19be6b;
  }

  .icon-xinlang:hover {
    color: #ed4014;
  }
</style>
