<template>
  <div class="contact">
    <Row :gutter="30">
      <Col :xs="24" :md="24" :lg="17">
        <!--网站留言板块-->
        <Card shadow>
          <p class="bl-text-title bl-text-center">
            留言
          </p>
          <div class="content">
            <p><strong>1、友链申请：</strong></p>
            <Timeline>
              <TimelineItem>请确认贵站可正常访问。</TimelineItem>
              <TimelineItem>原创博客、技术博客优先。</TimelineItem>
              <TimelineItem>两个月内有新文章更新。</TimelineItem>
            </Timeline>
            <p><strong>2、评论留言：</strong></p>
            <Timeline>
              <TimelineItem>请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。</TimelineItem>
              <TimelineItem>用户需对自己在使用本站服务过程中的行为承担法律责任（直接或间接导致的）。</TimelineItem>
              <TimelineItem>本站管理员有权保留或删除评论内容。</TimelineItem>
              <TimelineItem>评论内容只代表网友个人观点，与本网站立场无关。</TimelineItem>
            </Timeline>
          </div>
        </Card>
        <br/>
        <Card shadow>
          <p class="bl-text-title" style="margin-bottom: 15px">
            参与评论
          </p>
          <b-comment/>
        </Card>
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
  import bHot from '../../components/public/container/hot.vue'; // 热门搜索模块
  import bLabel from '../../components/public/container/label.vue'; // 标签模块
  import bLink from '../../components/public/container/link.vue'; // 友链模块
  import bFollow from '../../components/public/container/follow.vue'; // 追随我模块
  import bComment from '../../components/common/comment.vue'; // 评论区模块
  export default {
    layout: "public",
    components: {
      bHot,
      bLabel,
      bFollow,
      bLink,
      bComment
    }
  }
</script>

<style lang="scss" scoped>
  .contact {
    min-height: 100vh;
    .content {
      p {
        padding: 15px 0;
      }
    }
  }
</style>
