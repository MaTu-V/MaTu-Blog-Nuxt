<template>
  <div class="userInfo">
    <Row>
      <Card class="bl-text-center">
        <img class="user-image" width="80" height="80" v-if="userInfo.avatar" :src="serverUrl + userInfo.avatar"/>
        <img class="user-image" width="80" height="80" v-else src="../../../assets/images/avatar.png"/>
        <h3 class="user-nick" v-text="userInfo.nickName"></h3>
        <p class="user-intro bl-text-left bl-text-indent" style="font-size: 13px;color: #B4BBC0">
          个人介绍:{{userInfo.describe}}</p>
        <Divider>
          <span class="iconfont icon-liubianxing icon-focus bl-cursor" :style="'color:' + follow.color" @click="followUser">
            <h6 v-text="follow.title"></h6>
          </span>
        </Divider>
        <Row type="flex" justify="space-around" class="user-focus bl-text-center bl-cursor">
          <Col :xs="12" :md="12">
            <div @click="goFollow(0)">
              关注
              <p v-text="userInfo.followCounts|| 0" style="font-size: 20px;color: #34495E;font-weight: bold"></p>
            </div>
          </Col>
          <Col :xs="12" :md="12">
            <div @click="goFollow(1)">
              粉丝
              <p v-text="userInfo.fansCounts|| 0" style="font-size: 20px;color: #34495E;font-weight: bold"></p>
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN,SERVER_URL} from '../../../utils/constant';
  export default {
    name: "userInfo",
    props: ["userId","articleId"],
    data(){
      return{
        serverUrl:SERVER_URL,
        userInfo:'', // 用户个人信息
        follow:{
          color:'#3d7eff',
          title:'+',
          followStatus:1, // 未关注
        }
      }
    },
    created(){
      this.getUserInfo() // 读取文章发表人信息
      this.isFollowExists(); // 判断是否关注
    },
    methods:{
      // 读取发表人信息
      getUserInfo(){
        let that = this
        that.$axios.get(`/user/getArticleUser/${this.encrypt(this.userId)}`).then(({data:{code,msg,data}})=>{
          if(code === 200){
            that.userInfo = data
          }
        }).catch(()=>that.$Message.error("axios fail!"));
      },
      // 判断是否关注
      isFollowExists(){
        let that = this
        // 用户未登录
        if (!Cookies.get([USER_TOKEN])) {
          that.follow.title = '+';
          that.follow.color = '#3d7eff';
          that.follow.followStatus = 1;
          return
        }
        const cookies = Cookies.get([USER_TOKEN]);
        that.$axios.setHeader(USER_TOKEN, cookies);
        that.$axios.get(`/user/isFollowExists?followId=${that.userId}`).then(({data:{code,msg,data}})=>{
          if ((code === -107)){
            that.follow.title = '√';
            that.follow.color = '#1abc9c';
            that.follow.followStatus = -1;
          } else {
            that.follow.title = '+';
            that.follow.color = '#3d7eff';
            that.follow.followStatus = 1;
          }
        }).catch(()=>that.$Message.error("axios fail!"));
      },
      //获取相关信息
      followUser() {
        let that = this
        // 用户未登录
        if (!Cookies.get([USER_TOKEN])) {
          that.$Message.warning('您还未登录,无法关注!');
          return
        }
        const cookies = Cookies.get([USER_TOKEN]);
        that.$axios.setHeader(USER_TOKEN, cookies);
        that.$axios.get(`/user/followUser?BlogStatus=${that.follow.followStatus}&followId=${that.userInfo.id}`).then(({data: {code, msg, data}}) => {
          if (code === 200) {
            if (that.follow.followStatus === Math.abs(that.follow.followStatus)) {
              that.$Message.success("关注成功!");
              that.follow.title = '√';
              that.follow.color = '#1abc9c';
              that.getUserInfo();
            } else {
              that.$Message.success("已取消关注!");
              that.follow.title = '＋';
              that.follow.color = '#3d7eff';
              that.getUserInfo();
            }
            that.follow.followStatus = (that.follow.followStatus * -1);
          }
        }).catch(() => that.$Message.error("axios fail!"))
      },
      // 查找关注、粉丝
      goFollow(idx){
        this.$router.push({path: '/follow', query: {status:idx,userId:this.encrypt(this.userInfo.id)}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*icon字体库导入*/
  @import "../../../assets/css/stylesheet.css";

  .userInfo {
    .ivu-card-body {
      padding: 20px;
    }
    .user-image {
      border-radius: 50%;
      margin-top: 25px;
    }
    .user-nick {
      font-size: 16px;
      padding: 20px 0;
    }
    .user-intro {
      padding-bottom: 10px;
    }
    .icon-focus {
      font-size: 42px !important;
      position: relative;
      h6 {
        position: absolute;
        top: -2px;
        left: 0;
        bottom: 0;
        right: 0;
        color: white;
      }
    }
    .user-focus {
      font-size: 12px;
    }
  }
</style>
