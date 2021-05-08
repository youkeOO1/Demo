<template>
  <div class="turn-page">
    <div id="prev-btn" @click="trunPage('prev')" :class="prevClass">&lt;</div>
    <!-- 页码格式： 1 2 3 4 5   页码较少-->
    <template v-if="totalPage <= 5">
      <div v-for="i in totalPage" :key="i" :class="{ active: nowPage == i }" @click="trunPage(i)">
        {{ i }}
      </div>
    </template>
    <!-- 页码较多 -->
    <template v-else>
      <!-- 页码格式 -->
      <!-- 1 2 3 4 5 ... 100  -->
      <!-- 1 ...3 4 5 6 7 ... 100  -->
      <!-- 1 ...95 96 97 98 99 100  -->
      <!-- 详细分割为 -->
      <!-- 1 2 3 4 5 np < 5 -->
      <template v-if="nowPage < 5">
        <div v-for="i in 5" :key="i" :class="{ active: nowPage == i }" @click="trunPage(i)">
          {{i}}
        </div>
      </template>
      <!-- 1 ... np >= 5 -->
      <template v-if="nowPage >= 5">
        <div :class="{ active: nowPage == 1 }" @click="trunPage(1)">1</div>
        <div  @click="trunPage(nowPage - 5 > 0 ? nowPage - 5 : 1)">...</div>
      </template>
      <!-- 3 4 5 6 7 np >= 5 && np <= tp - 4 -->
      <template v-if="nowPage >= 5 && nowPage <= totalPage - 4">
        <div
        v-for="i in 5"
        :key="i"
        :class="{ active: nowPage == nowPage - 3 + i }"
        @click="trunPage(nowPage - 3 + i)">
          {{ nowPage - 3 + i}}
        </div>
      </template>
      <!-- ... 100 np <= tp - 4 -->
      <template v-if="nowPage <= totalPage - 4">
        <div @click="trunPage(nowPage + 5 < totalPage ? nowPage + 5 : totalPage)">...</div>
        <div :class="{ active: nowPage == totalPage }" @click="trunPage(totalPage)">
          {{ totalPage }}
        </div>
      </template>
      <!-- 95 96 97 98 99 100 np > tp - 4 -->
      <template v-if="nowPage > totalPage - 4">
        <div
        v-for="i in 6"
        :key="i"
        :class="{ active: nowPage == totalPage - 6 + i }"
        @click="trunPage(totalPage - 6 + 1)"
        >
          {{ totalPage - 6 + i }}
        </div>
      </template>
    </template>
    <div id="next-btn" @click="trunPage('next')" :class="nextClass">&gt;</div>
  </div>
</template>
<script>
export default {
  props: {
    totalPage: {
      type: Number,
      default: 100,
    },
    nowPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    trunPage(type) {
      let np = null;
      if (type === 'prev') {
        if (this.nowPage > 1) {
          // this.nowPage -= 1;
          np = this.nowPage - 1;
        }
      } else if (type === 'next') {
        if (this.nowPage < this.totalPage) {
          // this.nowPage += 1;
          np = this.nowPage + 1;
        }
      } else if (type) {
        np = type;
      }
      if (np == null) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      this.$emit('current-page', np);
    },
  },
  computed: {
    prevClass() {
      if (this.nowPage === 1) {
        return 'not-allow';
      }
      return '';
    },
    nextClass() {
      if (this.nowPage === this.totalPage) {
        return 'not-allow';
      }
      return '';
    },
  },
};
</script>
<style scoped>
.turn-page {
  text-align: center;
}
.turn-page > div {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: aliceblue;
  user-select: none;
}
.turn-page .active {
  background: rgb(97, 97, 185);
}
.turn-page .not-allow {
  opacity: 0;
}
</style>
