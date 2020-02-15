<template>
  <div>
    <!--文章数据-->
    <List class="article-list" v-if="pageFlag">
      <ListItem v-for="item in article" :key="item.id">
        <Row :gutter="40" align="middle">
          <!--图片位置-->
          <Col class="article-img" :xs="24" :md="8" :lg="6">
            <img v-if="item.image" :src="serverUrl + item.image" height="140" width="100%" />
            <img v-else src="../../assets/images/noPic.svg" height="140" width="100%" />
          </Col>
          <!--文章内容-->
          <Col class="article-content" :xs="24" :md="16" :lg="18">
            <Row :gutter="15" type="flex" justify="space-between" style="padding-bottom: 10px">
              <Col :xs="18" :md="9" :lg="9" class="bl-nowrap">
                <h3 class="bl-nowrap" v-text="item.title"></h3>
              </Col>
              <Col :xs="0" :md="9" :lg="9" class="bl-text-right bl-nowrap">
               <span>
                 <small>{{item.categories.categoryName}}</small>&nbsp;
                 <Icon type="ios-timer" size="20"/>{{item.establishTime}}
               </span>
              </Col>
            </Row>
            <p class="article-description bl-text-indent bl-over-hidden" style="height: 80px">{{item.summary}}</p>
            <Row class="bl-text-center" type="flex" justify="space-between" style="font-size: 14px">
              <Col :xs="24" :md="10" :lg="10" class="bl-text-left bl-nowrap">
                <span class="bl-tag" v-for="label in item.labels" :key="label.id" :style="'background-image:'+ label.back">
                    {{label.labelName}}
                </span>
              </Col>
              <Col :xs="24" :md="14" :lg="14">
                <Row :gutter="16" type="flex" justify="space-around" style="font-size: 14px">
                  <Col :xs="4" :md="3">
                    <Icon type="md-eye" size="16"/>
                    <br/>
                    <small>{{item.clickCounts || 0}}</small>
                  </Col>
                  <Col :xs="4" :md="3">
                    <Icon type="md-chatboxes" size="16"/>
                    <br/>
                    <small>{{item.commentCounts || 0}}</small>
                  </Col>
                  <Col :xs="4" :md="3">
                    <Icon type="md-rose" size="16"/><br/><small>{{item.likeCounts || 0}}</small>
                  </Col>
                  <!--删除文章信息-->
                  <Col :xs="5" :md="3">
                    <span class="bl-cursor" @click="deleteArticle(item.id)"><Icon type="ios-trash" size="16"/><br/><small>删除</small></span>
                  </Col>
                  <Col :xs="5" :md="3">
                    <span class="bl-cursor" @click="updArticle(item)"><Icon type="ios-create" size="16"/><br/><small>编辑</small></span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListItem>
      <br/>
      <!--分页组件-->
      <div class="bl-text-center">
        <b-page :total="total" :pageSize="pageSize" @getData="getPersonalArticle"/>
      </div>
    </List>
    <!--暂无数据-->
    <div class="article-none bl-text-center">
      <img width="200" height="200"  src="../../assets/images/empty.png" v-if="!pageFlag"/>
    </div>
    <!--加载更新详情框-->
    <b-article-upd ref="articleUpd"/>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN,SERVER_URL} from '../../utils/constant';
  import bArticleUpd from '../../components/public/container/articleUpd';
  import bPage from '../../components/common/page';
  export default {
    data() {
      return {
        serverUrl:SERVER_URL,
        page: 1, // 当前页数
        pageSize: 4, // 页面显示数据条数
        total: 0, // 总数据数
        article: [], // 数据内容
        pageFlag: false, //是否显示分页
      }
    },
    created() {
      this.getPersonalArticle(this.page, this.pageSize)
    },
    methods: {
      // 获取文章信息
      getPersonalArticle(page) {
        let that = this;
        const cookies = Cookies.get([USER_TOKEN]);
        that.$axios.setHeader(USER_TOKEN, cookies);
        that.$axios.get(`/article/getArticleByUserId?page=${page}&pageSize=${this.pageSize}`).then(({data: {code,msg,data}}) => {
          if (code === 200) {
            that.page = data.data.page // 当前页数
            that.pageSize = data.data.pageSize // 页面显示数据条数
            that.total = data.data.total // 总数据数
            that.article = data.data.rows // 数据内容
            that.pageFlag = data.data.total > 0 // 是否显示分页栏
            return
          }
          that.$Message.error(msg)
        }).catch(() => that.$Message.error('axios fail!'))
      },
      // 删除文章信息
      deleteArticle(id){
        let that = this
        that.$Modal.confirm({
          title: '删除操作',
          content: '您正在删除文章,请谨慎处理!',
          cancelText: '取消',
          onOk: () => {
            const cookies = Cookies.get([USER_TOKEN]);
            that.$axios.setHeader(USER_TOKEN, cookies);
            that.$axios.get(`/article/deleteArticleByUserId?articleId=${id}`).then(({data: {code,msg,data}})=>{
              if(code === 200){
                that.$Message.success("文章删除成功!")
                that.getPersonalArticle(that.page);
              }
            }).catch(()=>that.$Message.error("axios fail!"))
          }
        });
      },
      // 更新文章信息
      updArticle(item){
        this.$refs.articleUpd.article = item;
        this.$refs.articleUpd.articleForm.title = item.title;
        this.$refs.articleUpd.articleForm.summary = item.summary;
        this.$refs.articleUpd.content = item.content;
        this.$refs.articleUpd.updArticleFlag = true;
      }
    },
    components: {
      bPage,
      bArticleUpd
    }
  }
</script>

<style lang="scss" scoped>
  .ivu-list-item {
    padding: 2% 2.8%;
  }

  .article-list{
    background: #fff;
  }
  .article {
    width: 100%;
    height: auto;
    background: #fff;
    .article-content {
      .article-description {
        max-height: 120px;
        height: 80px;
        font-size: 12px;
      }
    }
  }
  .ivu-divider-horizontal {
    margin: 10px 0;
  }
</style>
