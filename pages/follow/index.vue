<template>
  <div class="user-follow">
    <Row type="flex" align="middle">
      <span>
        <img class="user-image" width="60" height="60" v-if="userInfo.avatar" :src="serverUrl + userInfo.avatar"/>
        <img class="user-image" width="60" height="60" v-else src="../../assets/images/avatar.png"/>
      </span>
      <h2 class="user-nick" v-html="userInfo.nickName"></h2>
      <p style="color: #BDC8D1" class="bl-cursor">
        <span :class="{active: status==0 }" @click="goFollow(0,userInfo.id)">关注</span>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <span :class="{active: status==1 }" @click="goFollow(1,userInfo.id)">粉丝</span>
      </p>
    </Row>
    <Divider style="background: #d1dae1;margin-bottom: 0"/>
    <!--关注 、粉丝列表-->
    <List item-layout="vertical">
      <ListItem class="list-item bl-cursor" v-for="item in userList" :key="item.id">
        <Row :gutter="30" type="flex" justify="space-around">
          <Col :xs="24" :md="12">
            <Row :gutter="16" type="flex" justify="start">
              <Col :md="4">
                <img class="user-image" width="45" height="45" v-if="item.avatar" :src="serverUrl + item.avatar"/>
                <img class="user-image" width="45" height="45" v-else src="../../assets/images/avatar.png"/>
              </Col>
              <Col :md="20">
                <h3 class="user-nick" v-html="item.nickName"></h3>
                <p class="bl-nowrap" style="color: #7F8C8D;margin-top: 3px">
                  {{item.describe || '这个人很懒什么都没写'}}
                </p>
                <div class="user-focus">
                  <ul>
                    <li><a href="#"><strong>{{item.articleCounts || 0}}</strong><span>作品</span></a></li>
                    <li><a @click="goFollow(0,item.id)"><strong>{{item.followCounts|| 0}}</strong><span>关注</span></a></li>
                    <li><a @click="goFollow(1,item.id)"><strong>{{item.fansCounts|| 0}}</strong><span>粉丝</span></a></li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Col>
          <Col :xs="24" :md="12">
            <Row :gutter="16" type="flex" justify="start">
              <Col :xs="8" :md="8" v-if="articleItem" v-for="articleItem in articleList[item.id]" :key="articleItem.id">
                <img v-if="articleItem.image" :src="serverUrl +articleItem.image" width="100%" @click="goArticleInfo(articleItem.id)"/>
                <img v-else src="../../assets/images/noPic.svg" width="100%" @click="goArticleInfo(articleItem.id)"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListItem>
    </List>
    <!--分页组件-->
    <div class="bl-text-center" v-if="pageFlag">
      <b-page :page="page" :pageSize="pageSize" :total="total" @getData="getUserList"/>
    </div>
  </div>
</template>

<script>
  import bPage from '../../components/common/page.vue';
  import {SERVER_URL} from '../../utils/constant';
  export default {
    name: "follow",
    layout: "public",
    data() {
      return {
        serverUrl:SERVER_URL,
        status: this.$route.query.status,
        userId: this.$route.query.userId,
        userInfo: '',
        page: 1, // 页数
        pageSize: 8, // 页面大小
        userList: 0, // 用户数据
        articleList:'', // 用户对应的文章信息
        total: 0,// 总数据量
        pageFlag: false, // 是否显示分页信息
        spinFlag: true // 是否显示加载状态
      }
    },
    created() {
      this.getUserInfo()
      this.getFollow(this.page)
    },
    methods: {
      // 读取发表人信息
      getUserInfo() {
        let that = this
        that.$axios.get(`/user/getArticleUser/${this.userId}`).then(({data: {code, msg, data}}) => {
          if (code === 200) {
            that.userInfo = data
          }
        }).catch(() => that.$Message.error("axios fail!"));
      },
      getFollow(page) {
        let that = this
        that.$axios.get(`/user/getUserFollowFan?BlogStatus=${that.status}&userId=${that.userId}&page=${page}&pageSize=${that.pageSize}`)
          .then(({data: {code, msg, data}}) => {
            if (code === 200) {
              that.page = data.users.page; // 当前页数
              that.pageSize = data.users.pageSize; // 当前页面大小
              that.total = data.users.total; // 总数据数
              that.userList = data.users.rows; // 数据内容
              that.pageFlag = data.users.total > 0;  //是否显示分页内容
              that.articleList = data.article;
              that.spinFlag = false // 关闭加载状态
              data.users.total > 0 ?  '':that.$Notice.warning({title: '消息提示', desc: '暂无该作者相关信息! '})
            }
          }).catch(() => that.$Message.error("axios fail!"));
      },
      // 分页加载
      getUserList(page){
        this.getFollow(page)
      },
      // 查找关注、粉丝
      goFollow(idx,userId){
        // 刷新页面
        window.location.href = `/follow?status=${idx}&userId=${this.encrypt(userId)}`
      },
      // 查看点击的文章信息
      goArticleInfo(articleId){
        this.$router.push({path: `/article/articleInfo/${articleId}`})
      }
    },
    components: {
      bPage
    }
  }
</script>

<style lang="scss" scoped>
  .list-item{
    &:hover{
      background: white;
    }
  }
  .user-follow {
    min-height: 100vh;
    .user-image {
      border-radius: 50%;
      margin: 0 20px;
    }
    .user-nick {
      margin: 0 20px 0 0;
    }
    .user-focus{
      ul > li{
        display: inline-block;
        padding: 30px;
        &:first-child{
          padding-left: 0;
        }
        a{
          display: flex;
          flex-direction: column;
          text-align: center;
          color: #336699;
        }
      }
    }
  }
  .active {
    color: #34495E;
  }
</style>
