<template>
  <!--文章详情模块-->
  <div class="notes">
    <h2 class="notes-title" v-text="article.title"></h2>
    <Row style="margin-bottom: 5px" class="code-row-bg" type="flex" justify="start" :gutter="16">
      <Col :xs="24" :sm="8" :md="8"><strong> 作者：</strong> {{ article.user.nickName}}</Col>
      <Col :xs="24" :sm="8" :md="8"><strong> 分类: </strong> {{article.categories.categoryName}}</Col>
      <Col :xs="24" :sm="8" :md="8" class="bl-nowrap"><strong> 发布时间：</strong>
        <Time :time="article.establishTime"/>
      </Col>
    </Row>
    <Row type="flex" justify="start" :gutter="16">
      <Col :md="24">
        <strong> 标签：</strong>
        <span class="bl-tag" v-for="item in article.labels" :key="item.id" :style="'background-image:'+ item.back">
          {{item.labelName}}
        </span>
      </Col>
    </Row>
    <Divider></Divider>
    <div class="i-editor-md content bl-text-indent" v-html="content"></div>
  </div>
</template>

<script>
  import marked  from "marked";
  export default {
    props:["article"],
    data(){
      return{
        content:''
      }
    },
    created(){
      this.content = marked(this.article.content);
    }
  }
</script>

<style lang="scss" scoped>
  .notes {
    padding: 20px 8px;
    height: auto;
    .notes-title {
      padding-bottom: 5px;
    }
  }

</style>
