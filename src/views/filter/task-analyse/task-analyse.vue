<template>
  <div>
    <h2>筛选步骤</h2>
    <div>
      <video :src="src" controls></video>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    src() {
      // eslint-disable-next-line no-restricted-globals
      return `http://${location.hostname}:${location.port || this.$port}/筛选步骤.mp4`;
    },
  },
};
</script>

<style scoped>
h2{
  font-size: 25px;
  font-weight: bold;
  padding: 50px 0;
  margin: 0 auto ;
}
video {
  width: 1000px;
  /* height: calc(100% - 125px); */
  height: 500px;
  border: 3px solid #000;
  background: rgba(0, 0, 0, .6);
}
</style>
