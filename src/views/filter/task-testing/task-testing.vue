<template>
  <div class="warp">
    <template v-if="isTeacher">
      <div class="teacher-show">
        <div class="top">
          <button @click="showTask">测试任务</button>
          <button @click="showGrade">小组成绩</button>
          <h2 :class="{ showTitle: isTask }">任务：分析近三年县产量最高的农作物</h2>
        </div>
        <div class="bottom">
          <group-results v-if="isTesting"></group-results>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="btn-warp">
        <button @click="download">下载任务</button>
        <button @click="submit">提交作业</button>
        <button>成绩</button>
        <!-- <a href="https://www.tool77.com/wenku/download/d5f3dc5a784d49189d798396929e987b">132456</a> -->
      </div>
      <template v-if="isSubmit">
        <submit></submit>
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
    showTask() {
      this.isTesting = false;
      this.isTask = !this.isTask;
    },
    showGrade() {
      this.isTesting = !this.isTesting;
      this.isTask = false;
    },
    download() {
      // const blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
      // this.$FileSaver.saveAs(blob, 'hello world.txt');
      this.$FileSaver.saveAs('https://www.tool77.com/wenku/download/93fb9e11109148538a795ee1836bbea5', '1.docx');
    },
    submit() {
      this.isSubmit = !this.isSubmit;
    },
  },
};
</script>

<style scoped>
.warp {
  height: 100%;
}
h2 {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  opacity: 0;
  transition: all 1s;
}
h2.showTitle {
  opacity: 1;
}
.top {
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
.bottom {
  height: calc(100% - 100px);
}
</style>
