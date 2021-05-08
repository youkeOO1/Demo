<template>
  <section id="student-manage-warp">
    <nav>
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <span>ZXT</span>
      </div>
      <ul class="user">
        <li class="username">张三</li>
        <router-link tag="li" to="/login" class="quest">退出</router-link>
      </ul>
    </nav>
    <main>
      <section class="student-manage-options">
        <dl>
          <dt>学生管理</dt>
          <router-link tag="dd" :to="{name: 'stuList'}">学生列表</router-link>
          <router-link tag="dd" :to="{name: 'stuAdd'}">新增学生</router-link>
        </dl>
      </section>
      <section class="student-info-show">
        <router-view></router-view>
      </section>
    </main>
  </section>
</template>
<script>
export default {
};
</script>

<style scoped src="./main.css">
/** scoped 会产生局部作用域，里面无法使用import 引入带入css样式，如果既要导入样式又要存在局部作用域 在scope的后面写src属性导入css样式 */
</style>
