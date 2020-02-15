<template>
  <!--文章列表渲染-->
  <div class="article">
    <List class="article-list">
      <ListItem v-for="item in article" :key="item.id">
        <div @click="toDetails(item.id)">
          <Row align="middle">
            <!--图片位置-->
            <Col class="article-img" :xs="24" :md="8" :lg="8">
              <img v-if="item.image" height="160" width="100%" :src="serverUrl+item.image">
              <img v-else height="160" width="100%" src="../../assets/images/noPic.svg">
            </Col>
            <!--文章内容-->
            <Col class="article-content" :xs="24" :md="16" :lg="16">
              <!--标题-->
              <Row align="middle">
                <Col :xs="24" :md="24" :lg="24" class="title bl-nowrap">
                  <p class="article-title" v-text="item.title"></p>
                </Col>
              </Row>
              <!--用户信息-->
              <Row :gutter="15" align="middle" style="padding-bottom: 10px">
                <Col :xs="20" :md="20" :lg="20" class="bl-nowrap">
                  <span v-text="item.user.nickName"></span>&nbsp;&nbsp;
                  <Icon type="ios-timer" size="18"/>
                  <Time class="bl-nowrap" :time="item.establishTime" type="date"/>
                </Col>
                <Col :xs="4" :md="4" :lg="4" class="bl-text-right">
                  <Icon type="md-chatboxes"/>&nbsp;&nbsp;{{item.commentCounts || 0}}
                </Col>
              </Row>
              <!--文章内容-->
              <p class="article-description bl-text-indent bl-over-hidden" style="height: 70px;" v-text="item.summary">
              </p>
              <Row class="bl-text-center" type="flex" justify="start">
                <span class="bl-tag" v-for="label in item.labels" :key="label.id" :style="'background-image:'+ label.back">
                    {{label.labelName}}</span>
              </Row>
            </Col>
          </Row>
        </div>
      </ListItem>
    </List>
    <!--分页组件-->
    <div class="bl-text-center" v-if="pageFlag">
      <b-page :page="page" :pageSize="pageSize" :total="total" @getData="getArticle"/>
    </div>
  </div>
</template>

<script>
  import bPage from '../../components/common/page.vue';
  import {SERVER_URL} from '../../utils/constant';
  export default {
    // 读取父组件传递数据 即 index数据
    props:["idKey","page","pageNum","article","pageFlag","total","pageSize"],
    data() {
      return {
        serverUrl:SERVER_URL
      }
    },
    methods: {
      // 点击单个文章 跳转到 文章详情页面
      toDetails: function (id) {
        //拿到点击文章的id传入详情页面
        this.$router.push({path: `/article/articleInfo/${id}`})
      },
      // 分页组件点击 会触发该父组件方法使得路由转换，页面刷新，重新进行服务端渲染
      getArticle(page){
        // 刷新页面
        window.location.href = `/article?id=${this.idKey}&page=${page}`
      }
    },
    components: {
      bPage
    }
  }
</script>

<style lang="scss" scoped>
  .ivu-list-item {
    padding: 2%;
    &:hover {
      border: 2px solid #4285f4;
      transition: all 0.1s cubic-bezier(.03, 1.29, .72, .8);
    }
  }

  .article {
    width: 100%;
    height: auto;
    background: #fff;
    .article-list{
      border-bottom: 1px solid #e8eaec;
    }
    .article-content {
      padding-left: 2%;
      .article-title{
        font-size: 16px;
        font-weight: bold;
        color: #34495E;
        margin-bottom: 5px;
      }
      .article-description {
        max-height: 120px;
        /*font-size: 12px;*/
        padding: 1.5% 0;
      }
    }
  }
</style>
