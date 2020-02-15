<template>
  <div class="articleFocus">
    <!--文章评价-->
    <Row type="flex" justify="space-around" class="article-focus bl-text-center bl-cursor">
      <Card class="bl-text-center">
        <Col :xs="12" :md="12">
          <div style="border-right: 1px solid #e8eaec;margin-bottom: 10px;" @click="likeCounts(article.id)">
            <p style="font-size: 12px" v-text="like.title"></p>
            <p v-text="like.likeCounts" class="focus-counts"></p>
          </div>
        </Col>
        <Col :xs="12" :md="12">
          <div  @click="collectionCounts(article.id)">
            <p style="font-size: 12px" v-text="collection.title"></p>
            <p v-text="collection.collectionCounts" class="focus-counts"></p>
          </div>
        </Col>
      </Card>
    </Row>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN} from '../../../utils/constant';
  export default {
    props: ["article"],
    data(){
      return{
        like:{
          title:'赞', // 提示
          likeStatus:1, // 操作状态
          likeCounts:this.article.likeCounts|| 0
        },
        collection:{
          title:'收藏',
          collectionStatus: 4 , // 操作状态
          collectionCounts:this.article.collectionCounts|| 0
        },
      }
    },
    created(){
      this.isCollectionExists(); // 状态初始化
    },
    methods:{
      // 判断是否收藏
      isCollectionExists(){
        let that = this
        // 用户未登录
        if (!Cookies.get([USER_TOKEN])) {
          that.collection.title = '收藏';
          that.collection.collectionStatus = 4;
          return
        }
        const cookies = Cookies.get([USER_TOKEN]);
        that.$axios.setHeader(USER_TOKEN, cookies);
        that.$axios.get(`/article/isArticleCollectionExists?articleId=${that.article.id}`).then(({data:{code,msg,data}})=>{
          if ((code === -107)){
            that.collection.title = '已收藏';
            that.collection.collectionStatus = -4;
          } else {
            that.collection.title = '收藏';
            that.collection.collectionStatus = 4;
          }
        }).catch(()=>that.$Message.error("axios fail!"));
      },
      //获取相关信息
      likeCounts(id){
        let that = this
        that.$axios.get(`/article/updArticleInformation?BlogStatus=${that.like.likeStatus}&articleId=${id}`).then(({data:{code,msg,data}})=>{
          if (code === 200){
            if(that.like.likeStatus=== Math.abs(that.like.likeStatus)){
              that.$Message.success("点赞成功!");
              that.like.title = '已赞';
              that.like.likeCounts++;
            }else{
              that.$Message.success("已取消点赞!");
              that.like.title = '赞';
              that.like.likeCounts--;
            }
            that.like.likeStatus = (that.like.likeStatus * -1);
          }
        }).catch(()=>  that.$Message.error("axios fail!"))
      },
      collectionCounts(id){
        let that = this
        if (!Cookies.get([USER_TOKEN])) {
          that.$Message.warning('您还未登录,无法收藏!');
          return
        }
        const cookies = Cookies.get([USER_TOKEN]);
        that.$axios.setHeader(USER_TOKEN, cookies);
        that.$axios.get(`/article/updArticleInformation?BlogStatus=${that.collection.collectionStatus}&articleId=${id}`).then(({data:{code,msg,data}})=>{
          if (code === 200){
            if(that.collection.collectionStatus === Math.abs(that.collection.collectionStatus)){
              that.$Message.success("收藏成功!");
              that.collection.title = '已收藏';
              that.collection.collectionCounts++;
            }else{
              that.$Message.success("已取消收藏!");
              that.collection.title = '收藏';
              that.collection.collectionCounts--;
            }
            that.collection.collectionStatus = (that.collection.collectionStatus * -1);
          }
        }).catch(()=>  that.$Message.error("axios fail!"))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .focus-counts{
    font-size: 16px;color: #34495E;
  }
</style>
