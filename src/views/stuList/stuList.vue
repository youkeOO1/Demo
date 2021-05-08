<template>
  <section id="student-list">
    <search-stu></search-stu>
    <sys-tabel></sys-tabel>
    <transition>
      <show-model v-if="modeShow"></show-model>
    </transition>
    <turn-page :totalPage="totalPage" :nowPage="nowPage" @current-page="cpage"></turn-page>
  </section>
</template>

<script>
import sysTabel from '@/components/stuList-child/sysTable.vue';
import showModel from '@/components/stuList-child/showModel.vue';
import turnPage from '@/components/stuList-child/turnPage.vue';
import searchStu from '@/components/stuList-child/searchStu.vue';

import { mapState, mapActions } from 'vuex';

export default {
  components: {
    sysTabel,
    showModel,
    turnPage,
    searchStu,
  },
  computed: {
    ...mapState(['modeShow', 'totalPage', 'nowPage']),
  },
  methods: {
    ...mapActions(['getStu']),
    cpage(np) {
      this.getStu(np);
    },
  },
};
</script>

<style scoped src="./stuList.css">
</style>
<style scoped>
.v-enter,.v-leave-to{
  top: -100%;
  opacity: 0;
}
.v-enter-to,.v-leave{
  top: 0;
  opacity: 1;
}
.v-leave-active,.v-enter-active{
  transition: all .5s;
}
</style>
