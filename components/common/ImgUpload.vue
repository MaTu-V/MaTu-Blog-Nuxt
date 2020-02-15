<template>
  <div class="ImgUpload">
    <div class="demo-upload-list" v-for="item in uploadList">
      <img :src="serverUrl + item">
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </div>
    <Upload
      ref="upload"
      action=""
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :on-remove="handleRemove"
      type="drag"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="serverUrl + imgName " v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN,SERVER_URL} from '../../utils/constant';
  export default {
    name: "ImgUpload",
    data () {
      return {
        serverUrl:SERVER_URL,
        imgName: '',
        visible: false,
        uploadList: [] // 单个图片上传 多个则用[]
      }
    },
    methods: {
      handleView (url) {
        this.imgName = url;
        this.visible = true
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式: ' + file.name + '不正确，请选择jpg或png或jpeg.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件：  ' + file.name + ' 太大，不超过2MB.'
        });
      },
      handleRemove(url){
        this.uploadList.filter((item,index)=>{
          if (item === url){
            this.uploadList.splice(index)
          }
        })
        this.$emit('preservePicUrl',this.uploadList);
      },
      handleBeforeUpload (file) {
        let that = this
        const check = that.uploadList.length < 1;
        if (!check) {
          that.$Notice.warning({
            title: '最多可上传1张图片.'
          });
          return;
        }
        let formData = new FormData();
        formData.append("Img", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        const cookies = Cookies.get([USER_TOKEN]);
        that.$axios.setHeader(USER_TOKEN, cookies);
        that.$axios.post("/file/uploadImg", formData, config)
          .then(({data: {code, msg,data}}) => {
            if(code === 200 ){
              that.$Message.success("图片上传成功!");
              that.uploadList.push(data); //当前页面压入
              //调用父组件方法压入图片地址
              that.$emit('preservePicUrl',that.uploadList);
            }else {
              that.$Message.error("图片上传失败!");
            }
          })
          .catch(() => that.$Message.error('axios fail!'));
        return check;
      }
    }
  }
</script>

<style lang="scss">
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .ivu-upload-list{
    display: none;
  }
</style>
