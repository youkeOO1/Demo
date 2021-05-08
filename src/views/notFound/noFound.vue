<template>
  <div id="notFound-warp">
    <h1>您访问到的页面不存在!!!</h1>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#notFound-warp {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #000; */
}
h1 {
  color: #fff;
  font-size: 80px;
  font-weight: 400;
  outline: none;
  user-select: none;
  text-shadow: 0px -5px 10px #f00, 0px -10px 20px #f10, 0px -15px 30px #f20;
}
</style>
