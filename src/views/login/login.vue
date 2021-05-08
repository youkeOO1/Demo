<template>
  <section id="login-warp">
    <div>
      <h1>welcome</h1>
      <form action="#" id="login">
        <input type="text" class="login-account" placeholder="account" v-model="account" />
        <input type="password" class="login-passwrord" placeholder="Password" v-model="password" />
        <div class="btn-warp">
          <input type="button" class="login_btn btn" value="Login" @click="Login" />
          <input type="button" class="login-signup_btn btn" value="Sign Up" @click="linkSignUp" />
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import cookie from '@/util/cookie/index';

export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    linkSignUp() {
      this.$router.push('/logon');
    },
    async Login() {
      if (this.account && this.password) {
        try {
          const result = await this.$api.login(`account=${this.account}&password=${this.password}`);
          console.log(result.msg);
          console.log(this.cookie);
          this.cookie.setCookie('username', this.account);
          this.$router.push('/main');
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    cookie.deleteCookie('username');
  },
};
</script>
<style scoped src="../css/login-or-logon.css"></style>
