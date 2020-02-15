<template>
  <!--用户注册-->
  <div class="register">
    <!--表单填写-->
    <Form ref="phoneForm" v-if="switchFormStatus" :model="phoneForm" :rules="phoneRuleValidate" :label-width="80">
      <FormItem label="手 机 号" prop="phone">
        <Input v-model="phoneForm.phone" size="large" placeholder="请输入您的手机号"></Input>
      </FormItem>
      <FormItem class="code-input" label="验 证 码" prop="code">
        <Input v-model="phoneForm.code" type="password" size="large" placeholder="验证码"></Input>
        <!--发送验证码-->
        <span v-if="codeStatus" id="code-btn" class="ivu-tag ivu-tag-success ivu-tag-checked bl-back-green"
              @click="getCode(`phoneForm`)">发送验证码</span>
        <!--发送成功显示对应信息-->
        <span v-else id="code-tip" class="code-tip bl-text-gray">{{codeMsg}}</span>
      </FormItem>
      <FormItem class="bl-button">
        <Button type="success" @click="phoneSubmit(`phoneForm`)"> 注 册</Button>
      </FormItem>
    </Form>
    <!--注册成功后显示 输入密码表单-->
    <Form ref="passwordForm" v-else :model="passwordForm" :rules="passwordRuleValidate" :label-width="80">
      <FormItem label="密 码" prop="passwd">
        <Input type="password" v-model="passwordForm.passwd" placeholder="输入密码"></Input>
      </FormItem>
      <FormItem label="确 认 密 码" prop="passwdCheck">
        <Input type="password" v-model="passwordForm.passwdCheck" placeholder="确认密码"></Input>
      </FormItem>
      <FormItem class="bl-button">
        <Button type="success" @click="pwdSubmit(`passwordForm`)"> 完 成</Button>
      </FormItem>
    </Form>
    <!--跳转设置-->
    <div class="extra">
      <h5>已有账号，
        <nuxt-link to="/thirdInterface/login">马上登录</nuxt-link>
      </h5>
      <Divider/>
      <third-interface/>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN} from '../../utils/constant.js';
  import thirdInterface from '../../components/common/thirdInterface';
  export default {
    layout: 'login',
    data() {
      // 手机号校验
      const validatePhone = (rule, value, callback) => {
        // 是否满足规则
        if (value === '' || !(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入有效手机号!'));
        } else {
          // 满足规则 默认触发 后端接口判断用户手机号是否被注册
          // 手机号加密
          let phone = this.encrypt(value)
          // 请求
          this.$axios.post('/loginRegister/selPhone', {phone: phone})
            .then(({data: {code, msg}}) => {
              code === -109 ? callback(msg) : callback()
            }).catch(() => this.$Message.error('axios fail!'))
        }
      }
      // 密码校验
      const validatePass = (rule, value, callback) => {
        if (!(/^[0-9A-Za-z@#$!_.]{8,20}$/.test(value))) {
          callback(new Error('密码为8-20位字母、数字或特殊符号仅支持@.#$!_'))
        } else {
          if (this.passwordForm.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs['passwordForm'].validateField('passwdCheck')
          }
          callback();
        }
      };
      // 确认密码校验
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码!'));
        } else if (value !== this.$refs['passwordForm'].model.passwd) {
          callback(new Error('两次密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 注册表单
        phoneForm: {
          phone: '',
          code: ''
        },
        // 密码表单
        passwordForm: {
          passwd: '',
          passwdCheck: ''
        },
        // 注册表单验证
        phoneRuleValidate: {
          phone: [
            {required: true, min: 11, max: 11, trigger: 'blur', validator: validatePhone}
          ],
          code: [
            {required: true, min: 6, max: 6, message: '请输入有效验证码', trigger: 'blur'}
          ]
        },
        // 密码表单验证
        passwordRuleValidate: {
          passwd: [
            {required: true, trigger: 'blur', validator: validatePass}
          ],
          passwdCheck: [
            {required: true, trigger: 'blur', validator: validatePassCheck}
          ]
        },
        // 切换表单
        switchFormStatus: true,
        // 发送短信状态切换
        codeStatus: true,
        // 发送短信倒计时
        codeMsg: ''
      }
    },
    methods: {
      // 手机号短信服务
      phoneSubmit(name) {
        let that = this
        that.$refs[name].validate((valid) => {
          if (valid) {
            // 表单验证规则通过 提交注册 手机号加密
            let phone = that.encrypt(that.$refs[name].model.phone)
            that.$axios.post('/sms/checkSms', {phone: phone, identifyCode: that.$refs[name].model.code})
              .then(({data: {code, msg}}) => {
                if (code === 200) {
                  // 返回状态检测
                  that.$Message.success('注册成功')
                  that.switchFormStatus = !that.switchFormStatus
                  that.codeStatus = !that.codeStatus
                  that.codeMsg = ''
                  // 在this上绑定当前phone
                  that.phone = phone
                  return
                }
                return that.$Message.error(msg)
              }).catch(() => that.$Message.error('axios fail!'))
          } else {
            this.$Message.error('信息填写有误!')
          }
        })
      },
      // 获取验证码
      getCode(name) {
        let that = this
        // 定时器
        if (that.timerid) {
          return false
        }
        // 验证内容提醒 因为定时器存在 每次执行之后必须先清空当前提示内容
        that.codeMsg = ''
        // 验证表单中手机号
        that.$refs[name].validateField('phone', (valid) => {
          if (!valid) {
            let phone = that.encrypt(that.$refs[name].model.phone)
            // 获取验证码
            that.$axios.post('/sms/sendLoginSms', {phone: phone})
              .then(({data: {code}}) => {
                if (code === 200) {
                  that.$Message.success('验证码已经发送')
                  let count = 60
                  that.timerid = setInterval(() => {
                    that.codeMsg = `验证码以发送,还剩余${count--}秒`
                    if (count === 0) {
                      clearInterval(that.timerid)
                      that.timerid = undefined
                      that.codeMsg = ''
                      that.codeStatus = !that.codeStatus
                    }
                  }, 1000)
                  // 切换到短信提示码状态
                  that.codeStatus = !that.codeStatus
                  return
                }
                return that.$Message.error('验证码发送失败!')
              }).catch(() => that.$Message.error('axios fail!'))
          }
        })
      },
      // 密码设定
      pwdSubmit(name) {
        let that = this
        that.$refs[name].validate((valid) => {
          if (valid) {
            //此处拿到 之前绑定的phone 此处已加密
            // console.log(that.phone)
            let password = that.encrypt(that.$refs[name].model.passwd)
            that.$axios.post('/loginRegister/register', {phone: that.phone, password: password})
              .then(({data: {code, msg,data}}) => {
                if (code === 200) {
                  // 设置cookie过期时间
                  const expireDate = new Date();
                  expireDate.setDate(new Date().getDate() + 15);
                  Cookies.set(USER_TOKEN, data, {
                    // domain:"https://www.matu.net.cn",
                    expires: expireDate,
                    overwrite: false
                  })
                  that.phone = ''
                  location.href = '/'
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
  // 验证码框定位
  .code-input {
    position: relative;
  }

  #code-btn, #code-tip {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 22px;
    font-size: 12px;
  }
</style>
