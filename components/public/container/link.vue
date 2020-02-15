<template>
  <Card>
    <p slot="title" class="bl-text-title">
      <Icon type="ios-people" size="22"/>
      友链
    </p>
    <div class="link">
      <p class="link-info bl-cursor" v-for="item in link" :key="item.id" @click="goLink(item.url)">
        <Icon type="ios-person"/>&nbsp;&nbsp;{{item.webName}}
      </p>
    </div>
  </Card>
</template>

<script>
  export default {
    data() {
      return {
        link: this.$store.state.home.link || ""
      }
    },
    methods: {
      goLink(url) {
        window.open(url);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link {
    width: 98%;
    margin: 0 auto;
    word-wrap: break-word !important;
    .link-info{
      margin-bottom: 10px;
      &:hover{
        color: #4285f4;
      }
    }
  }
</style>
