<template>
  <Card>
    <p slot="title" class="bl-text-title">
      <Icon type="md-git-branch"  size="20"/>
      标签
    </p>
    <div class="label">
      <span class="bl-tag"
            v-for="item in label" :key="item.id"
            :style="'background-image:'+ item.back" @click="goLabel(item)">
        {{item.labelName}}
      </span>
    </div>
  </Card>
</template>

<script>
    export default {
      data(){
        return{
          label: this.$store.state.home.label || ""
        }
      },
      methods:{
        goLabel(label){
          this.$router.push({path: '/label', query: {id:label.id,name:label.labelName}})
        }
      }
    }
</script>

<style lang="scss" scoped>
  .label{
    width: 98%;
    margin: 0 auto;
    word-wrap: break-word!important;
  }
</style>
