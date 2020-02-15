<template>
  <div class="article-info">
    <!--文章详情页面信息-->
    <!--响应端下的布局-->
    <Row :gutter="30">
      <Col :xs="24" :md="24" :lg="17" style="background: #FFF">
        <!--文章信息-->
        <b-notes :article="article"/>
        <Divider orientation="left" style="color: #e8eaec">评 论</Divider>
        <b-comment :articleId="article.id"/>
      </Col>
      <Col :xs="24" :md="24" :lg="0">
        <br/>
      </Col>
      <Col class="user-panel" :xs="24" :md="24" :lg="7">
        <!--个人信息面版-->
        <b-user-info :userId="article.user.id" :articleId="article.id"/>
        <br/>
        <b-article-focus :article="article"/>
      </Col>
    </Row>
  </div>
</template>

<script>
  import bNotes from './notes';
  import bComment from '../../../components/common/comment';
  import bUserInfo from '../../../components/public/container/articleUser';
  import bArticleFocus from '../../../components/public/container/articleFocus';
  import axios from 'axios';

  export default {
    layout: "public",
    data() {
      return {
        article: '' // 交给子组件的文章数据
      }
    },
    async asyncData({app, params}) {
      let id = params.id
      const {data: {code, data}} = await app.$axios.get(`/article/getArticleById?id=${id}`)
      if (code === 200) {
        return {
          article: data
        }
      }
    },
    components: {
      bNotes,
      bComment,
      bUserInfo,
      bArticleFocus
    }
  }
</script>

<style lang="scss" scoped>
  .article-info {
    min-height: 100vh;
  }

  @media (max-width: 1000px) {
    .user-panel {
      padding: 0 !important;
    }
  }

</style>
