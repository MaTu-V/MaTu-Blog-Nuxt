<template>
  <Card class="personal">
    <div class="basicForm">
      <Divider orientation="left">
        <p>基本 信息
          <small>设置</small>
        </p>
      </Divider>
      <Form ref="basicForm" :model="basicForm" :rules="basicFormValidate" :label-width="80">
        <FormItem label="头 像" prop="avatar">
          <img-upload @preservePicUrl="preservePicUrl"/>
        </FormItem>
        <FormItem label="昵 称" prop="name">
          <Input v-model="basicForm.name" type="text" placeholder="请填写昵称"></Input>
        </FormItem>
        <FormItem label="联系方式" prop="phone">
          <Input v-model="basicForm.phone" type="text" placeholder="请填写有效联系方式"></Input>
        </FormItem>
        <FormItem label="个人简介" prop="describe">
          <Input v-model="basicForm.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="个人介绍（字数限制100字）"></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="SubmitBasic(`basicForm`)">保存资料</Button>
        </FormItem>
      </Form>
    </div>
    <div class="thirdForm">
      <Divider orientation="left">
        <p>帐户 绑定
          <small>设置</small>
        </p>
      </Divider>
      <Form ref="ThirdForm" :model="ThirdForm" :rules="ThirdFormValidate" :label-width="80">
        <FormItem label="邮 箱" prop="email">
          <Input v-model="ThirdForm.email" placeholder="请填写邮箱帐户"></Input>
        </FormItem>
        <FormItem>
          <Button type="success" :loading="loadingFlag"  @click="SubmitThird(`ThirdForm`)">绑 定</Button>
        </FormItem>
      </Form>
    </div>
    <div class="securityForm">
      <Divider orientation="left">
        <p>帐户 安全
          <small>设置</small>
        </p>
      </Divider>
      <Form ref="securityForm" :model="securityForm" :rules="securityFormValidate" :label-width="80">
        <FormItem label="联系方式">
          <Input v-model="user.phone" disabled></Input>
        </FormItem>
        <FormItem label="新密码" prop="pwd">
          <Input v-model="securityForm.pwd" type="password" placeholder="如果您想修改您的密码, 请在此输入新密码,（密码为8-20位字母、数字或特殊符号仅支持@.#$!_）."></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input v-model="securityForm.passwdCheck" type="password" placeholder="请再次确认密码"></Input>
        </FormItem>
        <FormItem>
          <Button type="error" @click="SubmitSecurity(`securityForm`)">保存安全信息</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>
<script>
  import Qs from 'qs';
  import Cookies from 'js-cookie';
  import {USER_TOKEN} from '../../utils/constant.js';
  import ImgUpload from '../../components/common/ImgUpload';

  export default {
    data() {
      //定义手机验证规则
      const validatePhone = (rule, value, callback) => {
        if (value === '' || !(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入有效手机号!'));
        } else {
          if (value === this.user.phone) {
            callback()
            return
          }
          // 查询判断该号码是否被注册
          let phone = this.encrypt(value)
          this.$axios.post('/loginRegister/selPhone', {phone: phone})
            .then(({data: {code, msg}}) => {
              code === -109 ? callback(msg) : callback()
            }).catch(() => this.$Message.error('axios fail!'))
        }
      }
      const validatePass = (rule, value, callback) => {
        if (!(/^[0-9A-Za-z@#$!_.]{8,20}$/.test(value))) {
          callback(new Error('密码为8-20位字母、数字或特殊符号仅支持@.#$!_'))
        } else {
          if (this.securityForm.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs['securityForm'].validateField('passwdCheck')
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码!'));
        } else if (value !== this.$refs['securityForm'].model.pwd) {
          callback(new Error('两次密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: this.$store.state.user.userInfo, // 用户信息
        loadingFlag:false, // 按钮加载状态
        emailUrl: 'http://localhost:3000/thirdInterface/email', // 邮件发送打开地址
        //基本信息
        basicForm: {
          avatar: '' || this.$store.state.user.userInfo.avatar,
          name: '' || this.$store.state.user.userInfo.nickName,
          phone: '' || this.$store.state.user.userInfo.phone,
          describe: '' || this.$store.state.user.userInfo.describe,
        },
        //绑定信息
        ThirdForm: {
          email: '' || this.$store.state.user.userInfo.email,
        },
        //帐户安全信息
        securityForm: {
          pwd: '',
          passwdCheck: ''
        },
        //基本信息规则
        basicFormValidate: {
          name: [
            {required: true, message: '昵称不可为空!', trigger: 'blur'},
            {type: 'string', min: 1, max: 16, message: '昵称不得超过16字!', trigger: 'blur'}
          ],
          phone: [
            {required: true, trigger: 'blur', validator: validatePhone}
          ],
          describe: [
            {type: 'string', max: 100, message: '个人简介不得超过100字!', trigger: 'blur'}
          ]
        },
        //绑定信息规则
        ThirdFormValidate: {
          email: [
            {required: true, message: '邮箱帐户不得为空!', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确!', trigger: 'blur'}
          ],
        },
        // 帐户安全信息规则
        securityFormValidate: {
          pwd: [
            {required: true, trigger: 'blur', validator: validatePass}
          ],
          passwdCheck: [
            {required: true, trigger: 'blur', validator: validatePassCheck}
          ]
        }
      }
    },
    methods: {
      //获取子组件传递回来的图片路径
      preservePicUrl(Urls) {
        this.basicForm.avatar = Urls[0];
      },
      //基本信息提交
      SubmitBasic(name) {
        let that = this;
        that.$refs[name].validate((valid) => {
          if (valid) {
            // 数据加密
            let nickName = that.encrypt(that.$refs[name].model.name);
            let phone = that.encrypt(that.$refs[name].model.phone);
            const cookies = Cookies.get([USER_TOKEN]);
            that.$axios.setHeader(USER_TOKEN, cookies);
            that.$axios.post('/user/updUserInfo', {
              avatar: that.$refs[name].model.avatar,
              phone: phone,
              nickName: nickName,
              describe: that.$refs[name].model.describe
            })
              .then(({data: {code, msg, data}}) => {
                if (code === 200) {
                  location.href = '/user/personal';
                  return
                }
                return that.$Message.error(msg)
              }).catch(() => that.$Message.error('axios fail!'))
          } else {
            that.$Message.error('信息填写有误!')
          }
        })
      },
      // 绑定信息提交
      SubmitThird(name) {
        let that = this
        that.$refs[name].validate((valid) => {
          if(valid){
            let email = that.encrypt(that.$refs[name].model.email)
            let emailUrl = that.encrypt(that.emailUrl)
            that.loadingFlag = true
            const cookies = Cookies.get([USER_TOKEN]);
            that.$axios.setHeader(USER_TOKEN, cookies);
            that.$axios.get(`/mail/bindEmail?email=${email}&url=${emailUrl}`).then(({data:{code,msg,data}})=>{
              that.loadingFlag = false
              if (code === 200) {
                that.$Message.success("邮件已发送,请注意查收!")
                return
              }
            }).catch(()=>{
              that.$Message.error("axios fail!")
              that.loadingFlag = false
            })
          }else {
            that.$Message.error('信息填写有误!')
          }
        })
      },
      // 帐户安全提交
      SubmitSecurity(name) {
        let that = this
        that.$refs[name].validate((valid) => {
          if (valid) {
            let password = that.encrypt(that.$refs[name].model.pwd)
            let phone = that.encrypt(that.user.phone)
            that.$axios.post('/loginRegister/forgetPwd', {phone: phone, password: password})
              .then(({data: {code, msg, data}}) => {
                if (code === 200) {
                  // 设置cookie过期时间
                  const expireDate = new Date();
                  expireDate.setDate(new Date().getDate() + 15);
                  Cookies.set(USER_TOKEN, data, {
                    // domain:"https://www.matu.net.cn",
                    expires: expireDate,
                    overwrite: false
                  })
                  location.href = '/user/personal'
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
      ImgUpload
    }
  }
</script>
