<template>
  <div class="login">
    <Form ref="loginForm" :model="loginForm" :rules="loginRuleValidate" :label-width="80">
      <FormItem label="用 户 名" prop="phone">
        <Input v-model="loginForm.phone" size="large" placeholder="用户名/邮箱/手机号"></Input>
      </FormItem>
      <FormItem label="密 码" prop="passwd">
        <Input v-model="loginForm.passwd" type="password" size="large" placeholder="密 码"></Input>
      </FormItem>
      <FormItem class="bl-button">
        <Button type="success" :loading="loadingFlag" @click="loginSubmit(`loginForm`)"> 登 录</Button>
      </FormItem>
    </Form>
    <div class="extra">
      <Row>
        <Col :xs="12" :md="12">
          <h5>
            <nuxt-link class="router-link" to="/thirdInterface/register">现在注册</nuxt-link>
          </h5>
        </Col>
        <Col :xs="12" :md="12">
          <h5>
            <nuxt-link class="router-link" to="/thirdInterface/forget">忘记密码？</nuxt-link>
          </h5>
        </Col>
      </Row>
      <Divider/>
      <div>
        <h5>快捷方式登录</h5>
        <br/>
        <third-interface/>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN} from '../../utils/constant.js';
  import thirdInterface from '../../components/common/thirdInterface.vue';
  export default {
    layout: 'login',
    data() {
      const that = this;
      // 定义手机验证规则
      const validatePhone = (rule, value, callback) => {
        if (value === '' || !(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入有效手机号!'));
        } else {
          // 查询判断该号码是否被注册 （加密手机号）
          let phone = that.encrypt(value);
          that.$axios.post('/loginRegister/selPhone', {phone: phone})
            .then(({data:{code,msg}}) => {
              code === -109 ? callback() : callback(msg);
            }).catch(() => that.$Message.error('axios fail!'));
        }
      }
      return {
        loadingFlag: false, // 登录状态
        loginForm: {
          phone: '',
          passwd: '',
        },
        loginRuleValidate: {
          phone: [
            {required: true, min: 11, max: 11, trigger: 'blur', validator: validatePhone}
          ],
          passwd: [
            {required: true, message: '请输入用户名密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loginSubmit(name) {
        let that = this;
        that.$refs[name].validate((valid) => {
          if (valid) {
            // 数据加密
            let phone = that.encrypt(that.$refs[name].model.phone);
            let passwd = that.encrypt(that.$refs[name].model.passwd);
            that.loadingFlag = true
            that.$axios.post('/loginRegister/login', {phone: phone, password: passwd})
              .then(({data:{code,msg,data}}) => {
                that.loginBtnFlag = false
                if (code === 200) {
                  // 设置cookie过期时间
                  const expireDate = new Date();
                  expireDate.setDate(new Date().getDate() + 15);
                  Cookies.set(USER_TOKEN, data, {
                    // domain:"https://www.matu.net.cn",
                    expires: expireDate,
                    overwrite: false
                  })
                  window.location.href = '/'
                  return
                }
                return that.$Message.error(msg)
              }).catch(() => that.$Message.error('axios fail!'))
          } else {
            that.$Message.error('信息填写有误!')
          }
        })
      }
    },
    components: {
      thirdInterface
    }
  }
</script>

<style lang="scss">
  /*icon字体库导入*/
  @import "../../assets/css/stylesheet.css";
  /*简单设置跳转样式*/
  .router-link {
    color: #515A6E;
    &:hover {
      color: #333;
    }
  }
</style>
