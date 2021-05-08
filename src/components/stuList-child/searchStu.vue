<template>
  <div class="search-warp">
    <input type="text" name="" id="" v-model="searchText" />
    <button class="search-btn" @click="search">search</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    ...mapActions(['searchStu', 'getStu']),
    search() {
      const obj = {
        search: ' ',
        sex: -1,
      };
      if (!this.searchText) {
        this.getStu(1);
        return;
      }
      if (this.searchText.includes('男')) {
        obj.sex = 0;
      } else if (this.searchText.includes('女')) {
        obj.sex = 1;
      }
      // eslint-disable-next-line no-control-regex
      // const reg = /[^\x00-\xff]/g;
      // this.searchText = this.searchText.replace(reg, ' ').trim();
      obj.search = this.searchText;
      const res = this.searchStu(obj);
      res.then(() => {
        this.searchText = '';
        this.$toast('成功', 'success');
      }).catch((err) => { this.$toast(err, 'fail'); });
    },
  },
};
</script>

<style scoped>
/* search */
.search-warp {
  width: 310px;
  height: 40px;
  text-align: left;
  margin: 8px;
}
.search-warp input {
  border: none;
  outline: none;
  width: 250px;
  height: 36px;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 10px 0 0 10px;
  border: 3px solid #00B4CC;
  padding: 5px;
}
.search-warp .search-btn {
  width: 60px;
  height: 36px;
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 0 10px 10px 0;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  cursor: pointer;
  text-align: center;
}

</style>
