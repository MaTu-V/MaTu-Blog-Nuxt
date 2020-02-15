<template>
  <div>
    <template v-if="user">
      <Col :xs="4" :md="0" :lg="0" class="login bl-text-right">
        <BreadcrumbItem :to="{path:'/user/personal'}">
          <span style="color:#161617;font-size: 13px;font-weight: bold">个人中心</span>
        </BreadcrumbItem>
      </Col>
      <Col :xs="0" :md="4" :lg="4" class="login bl-text-right">
        <Dropdown trigger="click">
          <a href="javascript:void(0)" class="href-link user-Info bl-text-center" style="color: #161617">
            <span class="user-nick bl-nowrap">{{user.nickName}}</span>
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <nuxt-link :to="{path:'/user/personal'}">
              <DropdownItem>
                <Icon type="ios-speedometer-outline" size="20"/>
                个人设置
              </DropdownItem>
            </nuxt-link>
            <nuxt-link :to="{path:'/user/addArticle'}">
              <DropdownItem>
                <Icon type="ios-add-circle-outline" size="20"/>
                新建文章
              </DropdownItem>
            </nuxt-link>
            <nuxt-link :to="{path:'/user/myArticle'}">
              <DropdownItem>
                <Icon type="ios-brush-outline" size="20"/>
                我的文章
              </DropdownItem>
            </nuxt-link>
            <!--<nuxt-link :to="{path:'/user/messages'}">-->
              <!--<DropdownItem>-->
                <!--<Icon type="ios-chatbubbles-outline" size="20"/>-->
                <!--消息中心-->
              <!--</DropdownItem>-->
            <!--</nuxt-link>-->
            <DropdownItem divided>
              <div @click="logOut">
                <Icon type="ios-ionitron-outline" size="20"/> &nbsp;&nbsp;注&nbsp;&nbsp;销&nbsp;&nbsp;
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </template>
    <template v-else>
      <Col :xs="4" :md="4" :lg="4" class="login bl-text-right">
        <BreadcrumbItem :to="{path:'/thirdInterface/login/'}">登录</BreadcrumbItem>
      </Col>
    </template>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {USER_TOKEN} from '../../../utils/constant'
  export default {
    data() {
      // 判断当前vuex中是否存在用户信息
      return {
        user: this.$store.state.user.userInfo || ""
      }
    },
    methods: {
      logOut() {
        let that = this
        Cookies.remove(USER_TOKEN)
        that.$store.commit('user/setUser', '')
        that.user = that.$store.state.user.userInfo
        that.$Message.success("注销成功")
        window.location.href = "/"
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ivu-menu-horizontal.ivu-menu-light:after {
    content: none;
    background: white !important;
    height: 0 !important;
  }

  .user-Info {
    color: #7f828b;
    font-weight: normal;
    .user-nick {
      padding-left: 15px;
    }
  }
</style>
