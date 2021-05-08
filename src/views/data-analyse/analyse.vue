/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
<template>
  <div class="warp">
    <div class="data-option">
      <!-- <ul>
        <li>排序</li>
        <li>筛选</li>
        <li>分类汇总</li>
      </ul> -->
      <dl class="data-item" :class="{active: isSort}">
        <dt @click.self="onSort">排序</dt>
        <router-link :to="{name: 'taskLink'}" tag='dd'>任务引入</router-link>
        <router-link :to="{name: 'taskAnalyse'}" tag='dd'>任务分析</router-link>
        <router-link :to="{name: 'taskPractice'}" tag='dd'>任务实践</router-link>
        <router-link :to="{name: 'taskTesting'}" tag='dd'>任务测试</router-link>
      </dl>
      <dl class="data-item" :class="{active: isFilter}">
        <dt @click.self="onFilter">筛选</dt>
        <router-link :to="{name: 'filterTaskLink'}" tag='dd'>任务引入</router-link>
        <router-link :to="{name: 'filterTaskAnalyse'}" tag='dd'>任务分析</router-link>
        <router-link :to="{name: 'filterTaskPractice'}" tag='dd'>任务实践</router-link>
        <router-link :to="{name: 'filterTaskTesting'}" tag='dd'>任务测试</router-link>
      </dl>
      <dl class="data-item" >
        <dt @click.self="handleClick($event)">分类汇总</dt>
      </dl>
    </div>
    <div class="data-show">
      <router-view name="task"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showSort: false,
      showFilter: false,
    };
  },
  computed: {
    /**
     * 计算排序元素此时的状态，当为选中状态，返回选中状态的类名
     */
    isSort() {
      return this.showSort ? 'active' : '';
    },
    /**
     * 计算筛选元素此时的状态，当为选中状态，返回选中状态的类名
     */
    isFilter() {
      return this.showFilter ? 'active' : '';
    },
  },
  methods: {
    /**
     * 展示排序
     */
    onSort() {
      this.showSort = !this.showSort;
      this.showFilter = false;
      this.$router.push('/main/analyse/taskLink');
    },
    /**
     * 展示筛选
     */
    onFilter() {
      this.showSort = false;
      this.showFilter = !this.showFilter;
      this.$router.push('/main/analyse/filterTaskLink');
    },
  },
};
</script>

<style scoped>
.warp {
  width: 100%;
  height: 100%;
}
.data-option {
  width: 200px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .8);
}
.data-option dl{
  width: 100%;
  margin-bottom: 10px;
  height: 80px;
  text-align: center;
  overflow: hidden;
  color: #fff;
  transition: all 1s;
}
.data-option dt{
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.data-option dd{
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #7d7d7d;
  font-weight: 600;
  cursor: pointer;
}
.data-option dd.active{
  background: #fff;
  color: #000;
}
dl.active {
  height: 240px;
}
dl.active dt{
    background: #fd5c63;
}
/* .data-option dl:hover  dd{
} */
.data-show {
  width: calc(100% - 200px);
  height: 100%;
  position: absolute;
  left: 200px;
  top: 0;
}
</style>
