<template>
  <div class="about">
    <Row>
      <Col span="24">
        <div class="title bl-text-center">
          <h1>码 - 途 ( 个人博客 )</h1>
          <p>发布于: 2019-10-16</p>
        </div>
        <Divider/>
        <div class="content">
          <p> 对于该博客的一些介绍：</p>
          <p><strong>1、建站意义：</strong>记录一些学习的笔记是最常见的博客形式，我也同样不例外，同样，我也希望能够做一些好的样例，来作为个人的技术积淀。</p>
          <p><strong>2、建站初衷：</strong>希望能坚持去记录以下自己的所学并做到持续更新，希望自己不只是三分热度。</p>
          <p><strong>3、网站服务：</strong>网站部分采用服务端渲染，支持网页端、移动端使用。</p>
          <p><strong>4、友链合作：</strong>作为刚入门的我，也希望多一些友链，如您愿意，可以在评论区留言，谢谢。</p>
          <p><strong>5、友情提示：</strong>如您申请，也请同样希望您做好本博链接。</p>
          <!--<Divider/>-->
          <p><strong>6、联系地址：</strong></p>
          <!--<p><strong>姓名：</strong><strong>WangDong</strong></p>-->
          <p class="bl-text-black"><strong>网址：</strong><a href="https://matu.net.cn" target="_blank" class="href-link">https://matu.net.cn</a></p>
          <p class="bl-text-black"><strong>github链接：</strong><a href="https://github.com/MaTu-V" target="_blank" class="href-link">https://github.com/MaTu-V</a></p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    layout: "public"
  }
</script>

<style lang="scss" scoped>
  .about {
    width: 100%;
    background: white;
    padding: 10px 30px;
    min-height: 100vh;
    .title > h1 {
      padding: 15px 0;
    }
    .content {
      p {
        padding: 15px 0;
      }
    }
  }
</style>
