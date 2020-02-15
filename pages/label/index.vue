<template>
  <div class="canvans-wrapper">
    <div class="label-title bl-text-center">
      <p style="color: #fff;font-size: 28px">
        <Icon type="md-pricetags" size="28"/>&nbsp;{{labelName}}
      </p>
    </div>
    <br/>
    <!--列表菜单-->
    <div class="article-list">
      <!--页面展示菜单-->
      <div class="article-item" v-for="item in articleList" :key="item.id">
        <div class="item">
          <div class="img-area">
            <img v-if="item.image" :src="serverUrl+item.image" width="100%" height="180"/>
            <img v-else src="../../assets/images/noPic.svg" width="100%" height="180"/>
            <div class="label-position">
              <span class="bl-tag" style="background:rgba(0,0,0,.5);border-radius:0;border:none" v-text="labelName"></span>
            </div>
          </div>
          <div class="item-detail bl-nowrap">
            <h4 class="title bl-nowrap" style="width: 80%" v-html="item.title"></h4>
            <Row type="flex" justify="space-between" style="font-size: 14px">
              <Col :md="12">
                <Icon type="ios-timer" size="14"/>&nbsp;&nbsp;<Time :time="item.establishTime"/>
              </Col>
              <Col :md="12" class="bl-text-right">
                <Icon type="md-heart" size="14"/>&nbsp;&nbsp;{{item.likeCounts || 0}}
                <Icon type="md-chatboxes" size="14"/>&nbsp;&nbsp;{{item.commentCounts || 0}}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <!--分页组件-->
    <div class="bl-text-center" v-if="pageFlag">
      <b-page :page="page" :pageSize="pageSize" :total="total" @getData="getArticleList"/>
    </div>
  </div>
</template>

<script>
  import PointWave from '../../components/common/3Dcanvans';
  import blogHeader from '../../components/public/header/index';
  import blogFooter from '../../components/public/footer/index';
  import bPage from '../../components/common/page.vue';
  import {SERVER_URL} from '../../utils/constant';
  export default {
    layout: "public",
    data() {
      return {
        serverUrl:SERVER_URL,
        page: 1, // 页数
        pageSize: 16, // 页面大小
        total: 0,// 总数据量
        articleList: '', // 用户对应的文章信息
        pageFlag: false, // 是否显示分页信息
        labelId: this.$route.query.id,// 标签id
        labelName: this.$route.query.name,// 标签id
      }
    },
    created() {
      this.getLabelArticle(this.page)
    },
    methods: {
      async getLabelArticle(page) {
        let that = this
        const {data: {code, msg, data}} = await that.$axios.get(`/article/getLabelArticle?labelId=${this.labelId}&page=${page}&pageSize=${this.pageSize}`);
        if (code === 200) {
          that.page = data.data.page; // 当前页数
          that.pageSize = data.data.pageSize; // 当前页面大小
          that.total = data.data.total; // 总数据数
          that.articleList = data.data.rows; // 数据内容
          that.pageFlag = data.data.total > 0;  //是否显示分页内容
          that.spinFlag = false // 关闭加载状态
          data.data.total > 0 ?  '':that.$Notice.warning({title: '消息提示', desc: '暂未查找到该标签下所属文章信息! '})
        }
      },
      getArticleList(page){
        this.getLabelArticle(page)
      }
    },
    components: {
      blogHeader,
      blogFooter,
      bPage,
      PointWave
    }
  }
</script>

<style lang="scss" scoped>
  .canvans-wrapper {
    width: 100%;
    min-height: 100vh;
  }
  .label-title{
    width: 100%;
    height: 200px;
    line-height: 200px;
    background: url("../../static/backgroud/user-back-2.jpg") 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .article-list {
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: 25% 25% 25% 25%;
    align-content: center;
    .article-item {
      background: #fff;
      display: inline-block;
      margin: 20px 0 20px 15px;
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, .05);
      &:nth-child(4n + 1) {
        margin-left: 0;
      }
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
      }
      .item {
        .img-area{
          position: relative;
          .label-position{
            position: absolute;
            top: 10px;
            left: 10px;
          }
        }
        .item-detail {
          padding: 5px 10px 10px 10px;
          .title {
            font-size: 14px;
            font-weight: 500;
            color: #1f2d3d;
            margin-bottom: 20px;
          }
        }
      }
    }
  }

  /*响应式*/
  @media (max-width: 992px) {
    .article-list{
      grid-template-columns: 100%;
      .article-item {
        margin: 0;
      }
    }
  }
</style>
