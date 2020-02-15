<template>
  <div class="container">
    <Row :gutter="30">
      <Col :xs="24" :md="24" :lg="17">
        <!--加载状态-->
        <Spin fix v-if="spinFlag">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        <b-article :idKey="idKey" :pageFlag="pageFlag" :page="page" :pageSize="pageSize" :article="article" :total="total"/>
      </Col>
      <Col :xs="24" :md="24" :lg="0">
        <br/>
      </Col>
      <Col :xs="24" :md="24" :lg="7">
        <Row :gutter="16">
          <b-hot/>
        </Row>
        <br/>
        <Row :gutter="16">
          <b-label/>
        </Row>
        <br/>
        <Row :gutter="16">
          <b-link/>
        </Row>
        <br/>
        <Row :gutter="16">
          <b-follow/>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import bArticle from './articleList.vue'; // 文章列表
  import bHot from '../../components/public/container/hot.vue'; // 热门搜索模块
  import bLabel from '../../components/public/container/label.vue'; // 标签模块
  import bLink from '../../components/public/container/link.vue'; // 友链模块
  import bFollow from '../../components/public/container/follow.vue'; // 追随我模块
  export default {
    layout: "public",
    data() {
      return {
        idKey: 0, // 默认分类点击
        page: 0, // 页数
        pageSize: 0, // 页面大小
        article: 0, // 文章数据
        total: 0 ,// 总数据量
        pageFlag:false, // 是否显示分页信息
        spinFlag:true // 是否显示加载状态
      }
    },
    /**
     * 服务端渲染
     * @param app
     * @param query (传递：idKey代表分类编号,pageNum:点击页数)
     */
    async asyncData({app, query}) {
      // 获取当前路径的传递参数（默认分类id）
      const idKey = (query.id === '' || query.id === undefined) ? 1 : query.id;
      // 加载页数
      const page = (query.page === '' || query.page === undefined) ? 1 : query.page;
      // 每页大小
      const pageSize = 8;
      const {data: {code, data}} = await app.$axios.get(`/article/getArticle?categoryId=${idKey}&page=${page}&pageSize=${pageSize}`);
      if (code === 200){
        return {
          idKey: idKey, // 当前数据分类
          page: data.data.page, // 当前页数
          pageSize: data.data.pageSize, // 当前页面大小
          total: data.data.total, // 总数据数
          article: data.data.rows, // 数据内容
          pageFlag: data.data.total > 0,  //是否显示分页内容
          spinFlag:false // 关闭加载状态
        }
      }
    },
    components: {
      bHot,
      bLabel,
      bFollow,
      bArticle,
      bLink
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
