<template>
  <div class="warp">
    <div class="teacher-show" v-show="isTeacher">
      <div class="top">
        <h2>任务: 分析近三年县产量最高的农品</h2>
        <button @click=" isTesting = false">测试任务</button>
        <button @click="isTesting = !isTesting">测试成绩</button>
      </div>
      <div class="bottom">
        <testing-task v-if="isTesting" ></testing-task>
      </div>
    </div>
  </div>
</template>

<script>
import testingTask from '@/components/testing-task.vue';
// eslint-disable-next-line import/order
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isTesting: false,
    };
  },
  computed: {
    ...mapState(['isTeacher']),
  },
  components: {
    testingTask,
  },
};
</script>

<style scoped>
.warp{
  height: 100%;
}
h2{
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}
.top{
  margin: 10px auto;
  height: 100px;
  width: 100%;
  /* border: 1px solid #000; */
}
button{
  border: 0;
  margin: 20px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 50px;
  border-radius: 10px;
  color: white;
  outline: none;
  background: #6c757d;
}
button:hover{
    color: #fff;
    background-color: #5a6268;
}
.bottom{
  height: calc(100% - 100px);
}
</style>
