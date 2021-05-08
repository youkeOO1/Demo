<template>
  <section id="login-warp">
    <div>
      <h1>SIGN UP</h1>
      <form action="#" id="login">
        <input type="text" class="login-username" placeholder="username" v-model="username" />
        <input type="text" class="login-account" placeholder="account" v-model="account" />
        <input type="password" class="login-passwrord" placeholder="passwrord" v-model="password" />
        <input
          type="password"
          class="login-passwrord"
          placeholder="confirm password"
          v-model="comfirmPassword"
        />
        <div class="btn-warp">
          <input type="button" class="login_btn btn" value="Login" @click="linkLogin" />
          <input type="button" class="login-signup_btn btn" value="SIGN UP" @click="setLogon"/>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      account: '',
      password: '',
      comfirmPassword: '',
    };
  },
  methods: {
    linkLogin() {
      this.$router.push('/login');
    },
    /**
     * 注册账号
     */
    async setLogon() {
      if (this.username && this.account && this.password && this.comfirmPassword) {
        if (this.password === this.comfirmPassword) {
          try {
            const result = await this.$api.logon(`account=${this.account}&username=${this.username}&password=${this.password}&rePassword=${this.comfirmPassword}`);
            this.$toast(result.msg, result.status);
            this.$router.push('/login');
          } catch (error) {
            this.$toast(error, 'fail');
          }
        } else {
          this.$toast('密码不一致', 'fail');
        }
      } else {
        this.$toast('未填写', 'fail');
      }
    },
  },
};
</script>
<style scoped src="../css/login-or-logon.css"></style>
