<template>
  <section id="warp">
    <header id="header">EXCEL单元学习平台</header>
    <main id="main">
      <ul class="data-list">
        <router-link tag="li" :to="{ name: 'collect' }">数据收集</router-link>
        <router-link tag="li" :to="{ name: 'analyse' }">数据分析</router-link>
        <router-link tag="li" :to="{ name: 'dispose' }">数据处理</router-link>
        <router-link tag="li" :to="{ name: 'select' }">数据高级处理</router-link>
        <router-link tag="li" :to="{ name: 'statistics' }">数据统计</router-link>
        <router-link tag="li" :to="{ name: 'visualization' }">数据呈现</router-link>
      </ul>
      <section class="content-warp">
        <router-view></router-view>
      </section>
    </main>
  </section>
</template>

<script>
export default {};
</script>

<style>
#warp {
  height: 100%;
}
#header {
  width: 100%;
  height: 90px;
  /* background: #134e6f; */
  /* background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%); */
  background: url("../../assets/header-bg.png");
  background-size: cover;
  color: #000;
  line-height: 90px;
  font-size: 30px;
  font-weight: 600;
}
#main {
  height: calc(100% - 90px);
  position: relative;
}
.data-list {
  height: 80px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 200px;
  display: flex;
  justify-content: space-between;
}
.data-list li {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}
.data-list li.active,
.data-list li.router-link-active {
  background: #fd5c63;
}
/*  */
/*  */
.content-warp {
  height: calc(100% - 80px);
  position: relative;
}
.data-show {
  width: 100%;
  height: 100%;
}
</style>
