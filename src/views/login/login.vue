<template>
  <section id="login-warp">
    <div>
      <h1>welcome</h1>
        <div class="btn-warp">
          <input type="button" class="login_btn btn" value="学生登录" @click="student" />
          <input type="button" class="login-signup_btn btn" value="教师登录" @click="teacher" />
        </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setIsTeacher']),
    student() {
      this.$cookie.setCookie('user', 'studnet');
      this.setIsTeacher(false);
      this.$router.push('/main');
    },
    teacher() {
      this.$cookie.setCookie('user', 'teacher');
      this.setIsTeacher(true);
      this.$router.push('/main');
    },
  },
  created() {
    this.$cookie.delCookie('user');
  },
};
</script>

<style scoped>
#login-warp {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  width: 100%;
  height: 100%;
  background: -moz-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -moz-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
    -moz-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -webkit-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
    -webkit-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -o-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -o-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
    -o-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -ms-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    -ms-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
    -ms-linear-gradient(-45deg, #670d10 0%, #092756 100%);
  background: -webkit-radial-gradient(
      0% 100%,
      ellipse cover,
      rgba(104, 128, 138, 0.4) 10%,
      rgba(138, 114, 76, 0) 40%
    ),
    linear-gradient(to bottom, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
    linear-gradient(135deg, #670d10 0%, #092756 100%);
}
h1 {
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;
  font-size: 50px;
  margin-bottom: 30px;
}
input {
  color: #fff;
  font-size: 14px;
  display: block;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  width: 300px;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}

input:hover {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4), 0 1px 1px rgba(255, 255, 255, 0.2);
}

.btn-warp {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn-warp .btn {
  width: 49%;
}
.btn {
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background-image: linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -o-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4);
}
.btn:hover {
  filter: none;
  background-image: linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -moz-linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -ms-linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -o-linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -webkit-linear-gradient(top, #4a77d4, #4a77d4);
}

</style>
