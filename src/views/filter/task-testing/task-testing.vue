<template>
  <div class="warp">
    <template v-if="isTeacher">
      <div class="teacher-show">
        <div class="top">
          <button @click="showTaskEasy">基础任务</button>
          <button @click="showTask">进阶任务</button>
          <button @click="showGrade">小组成绩</button>
          <div class="task-warp">
            <h2 class="taskEasy" :class="{ showTitle: isTaskEasy }">任务：筛选出小麦的种植面积大于3000亩地区的信息。</h2>
            <div class="fTaskEasy" :class="{ showTitle: isTask }">
              <h2 :class="{ showTitle: isTask }">任务一：筛选出种植面积大于3000亩和产量大于1000吨的农作物信息。</h2>
              <h2 :class="{ showTitle: isTask }">任务二：筛选出种植面积大于3000亩或产量大于1000吨的农作物信息。</h2>
            </div>
          </div>
        </div>
        <div class="bottom">
          <group-results v-if="isTesting"></group-results>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="btn-warp">
        <button @click="downloadEasy">基础任务</button>
        <button @click="download">进阶任务</button>
        <button @click="submit">提交作业</button>
      </div>
      <template v-if="isSubmit">
        <div class="student-submit">
          <submit></submit>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line import/order
import { mapState } from 'vuex';
import groupResults from '@/components/group-results.vue';
import submit from '@/components/submit/submit.vue';

export default {
  data() {
    return {
      isTaskEasy: false,
      isTesting: false,
      isTask: false,
      isSubmit: false,
    };
  },
  computed: {
    ...mapState(['isTeacher']),
  },
  components: {
    groupResults,
    submit,
  },
  methods: {
    showTaskEasy() {
      this.isTaskEasy = !this.isTaskEasy;
      this.isTesting = false;
      this.isTask = false;
    },
    showTask() {
      this.isTesting = false;
      this.isTask = !this.isTask;
      this.isTaskEasy = false;
    },
    showGrade() {
      this.isTesting = !this.isTesting;
      this.isTask = false;
      this.isTaskEasy = false;
    },
    downloadEasy() {
      // eslint-disable-next-line no-restricted-globals
      this.$FileSaver.saveAs(`http://${location.hostname}:${location.port || this.$port}/基础案例.xlsx`, '基础案例.xlsx');
      this.$Message({
        showClose: true,
        message: '已开始下载,请稍等',
        type: 'success',
      });
    },
    download() {
      // eslint-disable-next-line no-restricted-globals
      this.$FileSaver.saveAs(`http://${location.hostname}:${location.port || this.$port}/进阶案例.xlsx`, '进阶案例.xlsx');
      this.$Message({
        showClose: true,
        message: '已开始下载，请稍等',
        type: 'success',
      });
    },
    submit() {
      this.isSubmit = !this.isSubmit;
    },
  },
  created() {
    console.log(this);
  },
};
</script>

<style scoped>
.warp {
  height: 100%;
}
.task-warp {
  position: relative;
  text-align: center;
}
.taskEasy,.fTaskEasy {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%);
}
.fTaskEasy{
  opacity: 0;
  background: #eee;
}
h2 {
  display: block;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  opacity: 0;
  transition: all .3s;
  margin: 10px 0;
}
.showTitle {
  opacity: 1;
}
.top {
  /* border: 1px solid transparent; */
  padding: 10px 0;
  margin: 0 auto;
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
.bottom {
  height: calc(100% - 100px);
}
.student-submit{
  height: calc(100% - 96px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
