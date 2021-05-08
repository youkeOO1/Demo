<template>
  <table>
    <thead>
      <tr >
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>邮箱</th>
        <th>年龄</th>
        <th>手机号</th>
        <th>住址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.sNo}}</td>
        <td>{{ item.name}}</td>
        <td>{{ item.sex == 1 ? '女' : '男' }}</td>
        <td>{{ item.email}}</td>
        <td>{{ new Date().getFullYear() - item.birth}}</td>
        <td>{{ item.phone}}</td>
        <td>{{ item.address}}</td>
        <td>
          <button class="btn btn_edit" @click="handleChange(item)">编辑</button>
          <button class="btn btn_del" @click="del(item.sNo)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['list', 'modeShow']),
  },
  methods: {
    ...mapMutations(['setModeShow', 'setActiveList']),
    ...mapActions(['getStu', 'delStu']),
    handleChange(item) {
      this.setModeShow(true);
      this.setActiveList(item);
    },
    del(sNo) {
      const res = this.delStu(sNo);
      res.then(() => {
        this.$toast('删除成功', 'success');
      }).catch(() => {
        this.$toast('删除失败', 'fail');
      });
    },
  },
  created() {
    this.getStu(1);
  },
};
</script>

<style scoped>
  table{
    width: 100%;
    text-align: center;
    line-height: 30px;
  }
  table thead{
    background-color: #eee;
    color: #646987;
  }
  table tbody {
    background-color: #fff;
  }
  .btn{
    border: none;
    font-size: 14px;
    color: #fff;
    padding: 3px 10px;
    outline: none;
    cursor: pointer;
  }
  .btn_edit{
    background-color: #5cb85c;
  }
  .btn_del{
    margin-left: 3px;
    background-color: #d9534f;
  }
</style>
