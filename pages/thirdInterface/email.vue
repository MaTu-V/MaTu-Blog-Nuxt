<template>
  <div></div>
</template>

<script>
  import Qs from 'qs';
  import Cookies from 'js-cookie';
  import {USER_TOKEN} from '../../utils/constant.js';

    export default {
      mounted(){
        this.$Modal.confirm({
          title: '邮箱绑定',
          content: '<p>检测到您正在进行邮箱绑定操作，请再次确定您的操作</p>',
          onOk: () => {
            let that = this;
            const cookies = Cookies.get([USER_TOKEN]);
            that.$axios.setHeader(USER_TOKEN, cookies);
            that.$axios.get(`/user/updUserEmail/${that.$route.query.email}`).then(({data:{code,msg,data}})=>{
              if (code === 200){
                that.$Message.success("邮箱绑定成功!");
                window.location.href = "/user/personal";
              }else {
                that.$Message.success("邮箱不正确!");
                window.location.href = "/";
              }
            }).catch(()=>that.$Message.error("axios fail!"))
          },
          onCancel: () => {
            // 关闭当前页面
            let that = this;
            window.location.href = "/";
          }
        });
      }
    }
</script>

<style scoped>

</style>
