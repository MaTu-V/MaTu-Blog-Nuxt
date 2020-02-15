<template>
  <Card class="hot-card">
    <p slot="title" class="bl-text-title">
      <Icon type="md-ribbon" size="20"/>
      热门点击
    </p>
    <List class="hot-list">
      <ListItem v-for="item in hotList" :key="item.id">
        <div @click="toDetails(item.id)" style="width: 100%;" class="bl-cursor">
          <Row :gutter="20" type="flex" justify="space-between">
            <!--图片位置-->
            <Col class="hot-img bl-text-center" :xs="6" :md="6" :lg="6">
              <img v-if="item.image" height="55" width="90" :src="serverUrl +item.image"/>
              <img v-else height="55" width="90" src="../../../assets/images/noPic.svg"/>
            </Col>
            <!--文章内容-->
            <Col class="hot-content" :xs="16" :md="16" :lg="16" style="font-size:13px;">
              <Row style="padding-bottom: 5%">
                <Col :xs="24" :md="24" :lg="24">
                  <p class="bl-nowrap" v-text="item.title"></p>
                </Col>
              </Row>
              <Row type="flex" justify="space-around">
                <Col :xs="12" :md="12" :lg="12">
                  <Icon type="md-eye" size="14"/>
                  &nbsp;&nbsp;<span v-text="item.clickCounts"></span>
                </Col>
                <Col :xs="12" :md="12" :lg="12">
                  <Icon type="ios-timer" size="14"/>
                  <Time class="bl-nowrap" :time="item.establishTime" type="date"/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </ListItem>
    </List>
  </Card>
</template>

<script>
  import {SERVER_URL} from  '../../../utils/constant';
  export default {
    data() {
      return {
        serverUrl:SERVER_URL,
        hotList: this.$store.state.home.hot
      }
    },
    methods: {
      // 点击单个文章 跳转到 文章详情页面
      toDetails: function (id) {
        //拿到点击文章的id传入详情页面
        this.$router.push({path: `/article/articleInfo/${id}`})
      }
    }
  }
</script>

<style lang="scss">
  .hot-card {
    .ivu-card-body {
      /*padding: 4% !important;*/
    }
    .ivu-list-item {
      padding: .5% 0 1% 0;
      border-bottom: none;
    }
    .ivu-row {
      width: 100% !important;
      padding: 1% 0;
    }
    .hot-list {
      width: 100%;
      height: auto;
      font-size: 12px;
      background: white;
      color: #34495E;
    }
  }
</style>
