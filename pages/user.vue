<template>
  <div class="user">
    <!--用户个人信息-->
    <Row class="user-info">
      <div>
        <!--用户头像-->
        <Col :xs="6" :md="3" :lg="2" class="bl-text-center">
          <img class="user-image" width="70" height="70" v-if="user.avatar" :src="serverUrl + user.avatar"/>
          <img class="user-image" width="70" height="70" v-else src="../assets/images/avatar.png"/>
        </Col>
        <!--用户介绍-->
        <Col :xs="18" :md="21" :lg="22">
          <p class="bl-text-white user-name">{{user.nickName}}</p>
          <div class="bl-nowrap">
            <small class="bl-text-white">{{user.describe || "暂无个人介绍"}}</small>
            <small class="bl-text-white" style="float: right;margin-right: 10px;">
              <Tag color="#5F69EF">
                <span @click="goFollow(0)">已关注：{{user.followCounts || "0"}}&nbsp;人</span>
              </Tag>
              <Tag color="#FF4877">
                <span @click="goFollow(1)">粉丝数：{{user.fansCounts || "0"}}&nbsp;人</span>
              </Tag>
            </small>
          </div>
        </Col>
        <!--切换banner背景图片-->
        <!--<div class="theme bl-cursor"></div>-->
      </div>
    </Row>
    <!--用户操作导航栏-->
    <Row class="user-nav">
      <div style="padding: 0 2%;">
        <Breadcrumb class="nav">
          <BreadcrumbItem>
            <nuxt-link :to="{path:'/user/personal'}">
              <Icon class="bl-text-red" type="md-planet" size="20"/>
              <small> 个人中心</small>
            </nuxt-link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <nuxt-link :to="{path:'/user/addArticle'}">
              <Icon class="bl-text-orange" type="ios-paper-plane" size="20"/>
              <small> 新建文章</small>
            </nuxt-link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <nuxt-link :to="{path:'/user/myArticle'}">
              <Icon class="bl-text-purple" type="md-list" size="20"/>
              <small> 我的文章</small>
            </nuxt-link>
          </BreadcrumbItem>
          <BreadcrumbItem class="bl-text-right">
            <!--占位-->
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </Row>
    <br/>
    <!--对应显示子组件-->
    <Row class="child-panel">
      <nuxt-child />
    </Row>
  </div>
</template>

<script>
  import {SERVER_URL} from '../utils/constant';
  export default {
    layout:"public",
    middleware: 'interceptUser', // 使用中间件
    data(){
      return{
        // 用户进入之前 从vuex中提取出用户个人信息
        user:this.$store.state.user.userInfo,
        serverUrl:SERVER_URL,
        chooseImgFlag:false
      }
    },
    methods:{
      // 查找关注、粉丝
      goFollow(idx){
        this.$router.push({path: '/follow', query: {status:idx,userId:this.encrypt(this.user.id)}})
      },
      // 选择背景图片
      chooseBackImg(){
        // TODO: 代做
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user{
    min-height: 100vh;
  }
  /**
  css样式修正
   */
  .wrapper .ivu-layout-content{
    margin: 0!important;
    margin-bottom: 35px!important;
    .user-info{
      width: auto;
      height: 200px;
      background: url("../static/backgroud/user-back-1.jpg") 50%;
      background-repeat: no-repeat;
      background-size: cover;
      transition: background-image .2s ease,background-size 1s ease;
      padding-top: 116px;
      position: relative;
      .user-image{
        border-radius: 50%;
      }
      .user-name{
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 5px;
      }
      .theme{
        position: absolute;
        right: 0;
        top: 0;
        background-image: url("../assets/images/theme.png");
        background-position: 0 0;
        width: 30px;
        height: 30px;
      }
    }
    .user-nav {
      width: 100%;
      height: 66px;
      line-height: 66px;
      background: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .nav {
        overflow-x: scroll;
        user-select: none;
      }
    }
    .child-panel{
      width: 100%;
    }
  }
</style>
