<template>
  <div class="toast-wrapper" :class="[animate, type]" v-if="exist">
    <div class="toast-content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exist: true,
      show: true,
    };
  },
  computed: {
    animate() {
      return this.show ? 'fade-in' : 'fade-out';
    },
  },
};
</script>

<style>
.toast-wrapper {
  width: 373px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  left: calc(50% - 130px);
  top: 0;
  margin-top: 30px;
}

.success {
  background-color: #F0F9EB;
  color: #67C23A;
}

.fail {
  background-color: #FEF0F0;
  color: #F56C6C;
}

.toast-content {
  font-weight: 600;
}

@keyframes fadeIn {
  0% {
    top: -100px;
    opacity: 0;
  }

  100% {
    top: 0;
    opacity: 1;
  }
}

@keyframes fadeOut {
  100% {
    top: -100px;
    opacity: 0;
  }

  0% {
    top: 0px;
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s forwards;
}

.fade-out {
  animation: fadeOut 0.5s forwards;
}
</style>
