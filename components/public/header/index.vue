<template>
  <div class="bl-header">
    <Breadcrumb separator="">
      <Row>
        <!--手机端下显示下拉侧边栏按钮-->
        <Col :xs="4" :md="0" :lg="0" class="logo bl-text-center">
          <BreadcrumbItem class="bl-cursor">
            <Icon type="md-menu" @click="showSiderFlag=true" size="23" color="#161617"/>
          </BreadcrumbItem>
          <Drawer title="码 - 途" placement="left" :closable="false" v-model="showSiderFlag">
            <!--遍历导航菜单-->
            <p class="phone-sider" v-for="item in menu" :key="item.id">
              <a :class="{active: activeName === item.name }" @click="select(item)">
                <Icon :custom="item.icon" size="18"/>
                <span v-text="item.name"></span>
              </a>
            </p>
          </Drawer>
        </Col>
        <!--左侧logo-->
        <Col :xs="16" :md="2" :lg="2" class="logo bl-text-center">
          <BreadcrumbItem :to="{path:'/'}">
            <strong style="color:#161617;font-size: 20px">码 途</strong>
          </BreadcrumbItem>
        </Col>
        <!--导航区域-->
        <Col :xs="0" :md="18" :lg="18" class="nav">
          <!--遍历导航菜单-->
          <BreadcrumbItem v-for="item in menu" :key="item.id">
            <a :class="{active: activeName === item.name }" @click="select(item)" style="color: #161617">
              <Icon :custom="item.icon" size="18"/>
              <span v-text="item.name"></span>
            </a>
          </BreadcrumbItem>
        </Col>
        <blog-login/>
      </Row>
    </Breadcrumb>
  </div>
</template>

<script>
  import blogLogin from './user.vue';

  export default {
    data() {
      return {
        // 切换菜单
        menu: [
          {
            id: '1',
            name: 'java笔记',
            icon: 'iconfont icon-java1',
            href: '/article?id=1&menu=java'
          },
          {
            id: '2',
            name: 'Web笔记',
            icon: 'ivu-icon ivu-icon-md-code',
            href: '/article?id=2&menu=web'
          },
          {
            id: '3',
            name: 'SQL笔记',
            icon: 'ivu-icon ivu-icon-logo-buffer',
            href: '/article?id=3&menu=sql'
          },
          {
            id: '4',
            name: '个人练习',
            icon: 'ivu-icon ivu-icon-md-color-wand',
            href: '/article?id=4&menu=practice'
          },
          {
            id: '5',
            name: 'GitHub',
            icon: 'ivu-icon ivu-icon-logo-github',
            href: 'https://github.com/MaTu-V'
          },
          {
            id: '6',
            name: '码 - 途',
            icon: 'ivu-icon ivu-icon-md-infinite',
            href: '/matu/about'
          }
        ],
        // 高亮名称(默认高亮)
        activeName: '',
        showSiderFlag:false // 手机下侧边栏显示
      }
    },
    created() {
      let that = this
      that.menu.filter((item) => {
        if (item.id === that.$route.query.id) {
          that.activeName = item.name
          return
        }
      })
    }
    ,
    methods: {
      select(obj) {
        this.activeName = obj.name
        window.location.href = obj.href
      }
    }
    ,
    components: {
      blogLogin
    }
  }
</script>

<style lang="scss" scoped>
  /*icon字体库导入*/
  @import "../../../assets/css/stylesheet.css";

  .phone-sider{
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: left;
    text-indent: 2px;
    a{
      color: #515A6E;
    }
  }
  .active {
    color: #4285f4 !important;
  }
</style>
