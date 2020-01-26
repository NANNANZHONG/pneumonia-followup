<template>
  <div>
    <van-nav-bar title="身份验证" class="navbar" />
    <div class="content">
      <van-field placeholder="姓名" v-model="name"  :error-message="nameError" left-icon="manager-o" size="large" required/>
      <van-field placeholder="手机号码" v-model="phoneNumber" left-icon="phone-o" :error-message="phoneNumberError" size="large" required/>
      <van-field placeholder="短信验证码" v-model="verification" type="text" left-icon="chat-o" size="large" :error-message="verificationError" required>
        <VerifyCodeBtn slot="button"  @sendVerifyCode="sendVerifyCode" :phoneNumber="phoneNumber" />
      </van-field>
    </div>
    <div class="button-wrap">
      <van-button size="large" @click="handleLogin" type="info" round :disabled="!phoneNumber || !name || !verification">登录</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Toast, NavBar  } from 'vant'
import { mapActions } from 'vuex'
import { validPhone } from '@/util/validate'
import VerifyCodeBtn from '@/components/VerifyCodeBtn'
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      phoneNumber: '',
      verification: '',
      phoneNumberError: '',
      nameError: '',
      verificationError: ''
    }
  },
  methods: {
    handleLogin () {
      if (!this.name) {
        this.nameError = '请填写姓名'
      } else if (!this.phoneNumber || !validPhone(this.phoneNumber)) {
        this.phoneNumberError = '请填写正确的手机号'
      } else if (!this.verification) {
        this.verificationError = '请填写验证码'
      } else {
        this.nameError = ''
        this.phoneNumberError = ''
        this.verificationError = ''
        Toast.success('登陆成功')
        this.$router.replace('/')
        /*const data = {
          phoneNumber: this.phoneNumber,
          verification: this.verification,
          name: this.name
        }

        this.$axios.post('/user/login', data).then(res => {
          if (res.success) {
            this.$router.push('/')
            this.login(res)
          } else {
            Toast.fail('验证码有误')
          }
        })*/
      }
    },
    sendVerifyCode () {
      this.phoneNumberError = ''
      if (!this.phoneNumber || !validPhone(this.phoneNumber)) {
        this.phoneNumberError = '请填写正确的手机号'
      }
    },
    ...mapActions([
      'login'
    ])
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [NavBar .name]: NavBar,
    VerifyCodeBtn
  }
}
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;

  }
  .button-wrap{
    height: auto;
    padding: 25px 15px;

  }
  .more-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 14px;
    a.link{
      color: #1989fa;
    }
    .switch-way{
      color: #333;
    }
  }

</style>
