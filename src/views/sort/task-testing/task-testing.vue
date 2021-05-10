<template>
  <div class="warp">
    <div class="teacher-show" v-show="isTeacher">
      <div class="top">
        <div class="task-warp">
          <h2>任务一: 分析出近三年种植面积最高的农作物信息品</h2>
          <h2>任务二: 分析出各地区产量最高的农作物信息</h2>
        </div>
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
  margin: 20px auto;
}
.top{
  padding: 10px 0;
  margin: 0 auto;
  height: 200px;
  width: 100%;
  /* border: 1px solid #000; */
}
.task-warp{
  width: 570px;
  margin: 0 auto;
  text-align: left;
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
  z-index: 9999999;
}
button:hover{
    color: #fff;
    background-color: #5a6268;
}
.bottom{
  height: 500px;
  overflow: hidden;
}
</style>
