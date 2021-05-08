<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['isTeacher']),
  },
  methods: {
    ...mapMutations(['setIsTeacher']),
  },
  created() {
    const user = this.$cookie.getCookie('user');
    if (user === 'studnet') {
      this.setIsTeacher(false);
    } else if (user === 'teacher') {
      this.setIsTeacher(true);
    }
    // eslint-disable-next-line no-restricted-globals
    this.$port = location.port;
  },
  beforeCreate() {
    // eslint-disable-next-line no-restricted-globals
    this.$port = location.port;
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: #eee;
}
:root,body{
  height: 100%;
}
button{
  cursor: pointer;
}
@import url('./reset.css');
</style>
